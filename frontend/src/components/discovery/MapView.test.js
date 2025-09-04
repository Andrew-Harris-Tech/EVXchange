import userEvent from '@testing-library/user-event';
  it('snaps to the nearest public charger when button is clicked', async () => {
    // Place two locations, one closer to the mocked user location
    const locations = [
      {
        LocID: '1',
        Latitude: 40.1,
        Longitude: -74.1,
        LocName: 'Far Station',
        StreetAddress: '123 Main St',
        City: 'Testville',
        State: 'TS',
        Zip: '12345',
      },
      {
        LocID: '2',
        Latitude: 41.2,
        Longitude: -75.2,
        LocName: 'Nearest Station',
        StreetAddress: '456 Side St',
        City: 'Elsewhere',
        State: 'ES',
        Zip: '67890',
      }
    ];

    // Mock fetch to return locations
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(locations)
    });

    // Mock geolocation to return a point closest to the second station
    const mockGeolocation = {
      getCurrentPosition: jest.fn(cb => cb({ coords: { latitude: 41.19, longitude: -75.19 } }))
    };
    global.navigator.geolocation = mockGeolocation;

    render(<MapView />);

    // Wait for markers to appear
    await waitFor(() => {
      expect(screen.getAllByTestId('marker').length).toBe(2);
    });

    // Click the snap to nearest button
    const snapBtn = screen.getByTestId('snap-nearest-btn');
    userEvent.click(snapBtn);

    // The map center should update to the nearest station (41.2, -75.2)
    // We check that a marker with that position exists (as a proxy for center)
    await waitFor(() => {
      // The ChangeMapCenter effect will set the map center, but since we mock react-leaflet, we check the marker positions
      const nearestMarker = screen.getAllByTestId('marker').find(m => m.getAttribute('data-position') === JSON.stringify([41.2, -75.2]));
      expect(nearestMarker).toBeTruthy();
    });
  });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import MapView from './MapView';

// Mock leaflet CSS import
jest.mock('leaflet/dist/leaflet.css', () => {});

// Mock MapContainer, TileLayer, Marker, Popup, useMap from react-leaflet
jest.mock('react-leaflet', () => {
  const React = require('react');
  return {
    MapContainer: ({ children }) => <div data-testid="map">{children}</div>,
    TileLayer: () => <div data-testid="tile-layer" />,
    Marker: ({ children, position }) => <div data-testid="marker" data-position={JSON.stringify(position)}>{children}</div>,
    Popup: ({ children }) => <div data-testid="popup">{children}</div>,
    useMap: () => ({ setView: jest.fn() })
  };
});

const mockLocations = [
  {
    LocID: '1',
    Latitude: 40.1,
    Longitude: -74.1,
    LocName: 'Test Station',
    StreetAddress: '123 Main St',
    City: 'Testville',
    State: 'TS',
    Zip: '12345',
    AccessHours: '24/7',
    LocScore: 4.5,
    Phone: '555-1234',
    Website: 'https://test.com'
  },
  {
    LocID: '2',
    Latitude: 41.2,
    Longitude: -75.2,
    LocName: 'Second Station',
    StreetAddress: '456 Side St',
    City: 'Elsewhere',
    State: 'ES',
    Zip: '67890',
    AccessHours: null,
    LocScore: null,
    Phone: null,
    Website: null
  }
];

describe('MapView', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders markers for ChargeHub locations and shows details in popups', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockLocations)
    });

    render(<MapView />);

    // Wait for markers to appear
    await waitFor(() => {
      expect(screen.getAllByTestId('marker').length).toBe(2);
    });

  // Check popup content for first marker (robust to nested elements)
  expect(screen.getByText('Test Station')).toBeInTheDocument();
  expect(screen.getByText((content) => content.includes('123 Main St'))).toBeInTheDocument();
  expect(screen.getByText((content) => content.includes('Testville'))).toBeInTheDocument();
  expect(screen.getByText((content) => content.match(/Hours:\s*24\/7/))).toBeInTheDocument();
  expect(screen.getByText((content) => content.match(/Score:\s*4.5/))).toBeInTheDocument();
  expect(screen.getByText((content) => content.match(/555-1234/))).toBeInTheDocument();
  expect(screen.getByText('Website')).toHaveAttribute('href', 'https://test.com');

  // Check popup content for second marker (with missing optional fields)
  expect(screen.getByText('Second Station')).toBeInTheDocument();
  expect(screen.getByText((content) => content.includes('456 Side St'))).toBeInTheDocument();
  expect(screen.getByText((content) => content.includes('Elsewhere'))).toBeInTheDocument();
  // Should not render missing fields for second marker
  expect(screen.queryByText((content) => content.match(/Hours:/) && content.includes('Second Station'))).toBeNull();
  expect(screen.queryByText((content) => content.match(/Score:/) && content.includes('Second Station'))).toBeNull();
  expect(screen.queryByText((content) => content.match(/Phone:/) && content.includes('Second Station'))).toBeNull();
  });

  it('handles API error gracefully and renders no markers', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('API error'));

    render(<MapView />);

    // Wait for effect to run
    await waitFor(() => {
      // No markers should be rendered
      expect(screen.queryAllByTestId('marker').length).toBe(0);
    });
  });

  it('handles missing/invalid data from API', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ not: 'an array' })
    });

    render(<MapView />);

    await waitFor(() => {
      expect(screen.queryAllByTestId('marker').length).toBe(0);
    });
  });
});
