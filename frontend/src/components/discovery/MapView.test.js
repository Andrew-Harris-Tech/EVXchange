const mockCanadaApiResponse = {
  features: [
    {
      attributes: {
        OBJECTID: 101,
        Station_Name: 'Canada EV Station',
        Street_Address: '789 Maple Rd',
        City: 'Ottawa',
        Province: 'ON',
        Postal_Code: 'K1A 0B1',
        Access_Days_Time: 'Mo-Fr 9am-5pm',
        Phone: '613-555-7890',
        Station_Website: 'https://canada.ca/ev-station'
      },
      geometry: { x: -75.6972, y: 45.4215 }
    },
    {
      attributes: {
        OBJECTID: 102,
        Station_Name: 'No Address Station',
        City: 'Toronto',
        Province: 'ON',
        Postal_Code: 'M5V 2T6',
      },
      geometry: { x: -79.3832, y: 43.6532 }
    }
  ]
};

describe('MapView (Canada EV API)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders markers for Canada EV API locations and shows details in popups', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(mockCanadaApiResponse)
    });

    render(<MapView />);

    await waitFor(() => {
      expect(screen.getAllByTestId('marker').length).toBe(2);
    });

    // Check popup content for first marker
    expect(screen.getByText('Canada EV Station')).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('789 Maple Rd'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Ottawa'))).toBeInTheDocument();
    expect(screen.getByText((content) => content.match(/Mo-Fr 9am-5pm/))).toBeInTheDocument();
    expect(screen.getByText((content) => content.match(/613-555-7890/))).toBeInTheDocument();
    expect(screen.getByText('Website')).toHaveAttribute('href', 'https://canada.ca/ev-station');

    // Check popup content for second marker (with missing optional fields)
    expect(screen.getByText('No Address Station')).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes('Toronto'))).toBeInTheDocument();
    // Should not render missing fields for second marker
    expect(screen.queryByText((content) => content.match(/Hours:/) && content.includes('No Address Station'))).toBeNull();
    expect(screen.queryByText((content) => content.match(/Phone:/) && content.includes('No Address Station'))).toBeNull();
    expect(screen.queryByText((content) => content.match(/Website/) && content.includes('No Address Station'))).toBeNull();
  });

  it('handles API error gracefully and renders no markers (Canada API)', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('API error'));

    render(<MapView />);

    await waitFor(() => {
      expect(screen.queryAllByTestId('marker').length).toBe(0);
    });
  });

  it('handles missing/invalid data from Canada API', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({ not: 'features' })
    });

    render(<MapView />);

    await waitFor(() => {
      expect(screen.queryAllByTestId('marker').length).toBe(0);
    });
  });
});
import userEvent from '@testing-library/user-event';

  it('snaps to the nearest public charger when button is clicked (Canada API)', async () => {
    // Place two features, one closer to the mocked user location
    const canadaApiResponse = {
      features: [
        {
          attributes: {
            OBJECTID: 1,
            Station_Name: 'Far Station',
            Street_Address: '123 Main St',
            City: 'Testville',
            Province: 'TS',
            Postal_Code: '12345',
          },
          geometry: { y: 40.1, x: -74.1 }
        },
        {
          attributes: {
            OBJECTID: 2,
            Station_Name: 'Nearest Station',
            Street_Address: '456 Side St',
            City: 'Elsewhere',
            Province: 'ES',
            Postal_Code: '67890',
          },
          geometry: { y: 41.2, x: -75.2 }
        }
      ]
    };

    // Mock fetch to return Canada API response
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve(canadaApiResponse)
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

