import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import NearbyStationsMap from './NearbyStationsMap';

// Mock geolocation
const mockGeolocation = {
  getCurrentPosition: jest.fn()
};
global.navigator.geolocation = mockGeolocation;

// Mock Google Maps API
beforeAll(() => {
  window.google = {
    maps: {
      Map: jest.fn().mockImplementation(() => ({
        setCenter: jest.fn(),
        setZoom: jest.fn()
      })),
      Marker: jest.fn()
    }
  };
});

afterAll(() => {
  delete window.google;
});

describe('NearbyStationsMap', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading and then error if geolocation fails', async () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success, error) => {
      error({ message: 'User denied geolocation' });
    });
    render(<NearbyStationsMap />);
    await waitFor(() => {
      expect(screen.getByText(/unable to get your location/i)).toBeInTheDocument();
    });
  });

  it('fetches and displays stations on success', async () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) => {
      success({ coords: { latitude: 1, longitude: 2 } });
    });
    global.fetch = jest.fn().mockResolvedValue({
      json: () => Promise.resolve({
        stations: [
          { id: 1, name: 'Test Station', lat: 1, lng: 2, address: '123 Main St' }
        ]
      })
    });
    render(<NearbyStationsMap />);
    await waitFor(() => {
      expect(screen.getByText(/test station/i)).toBeInTheDocument();
      expect(screen.getByText(/123 main st/i)).toBeInTheDocument();
    });
  });

  it('shows error if fetch fails', async () => {
    mockGeolocation.getCurrentPosition.mockImplementationOnce((success) => {
      success({ coords: { latitude: 1, longitude: 2 } });
    });
    global.fetch = jest.fn().mockRejectedValue(new Error('fail'));
    render(<NearbyStationsMap />);
    await waitFor(() => {
      expect(screen.getByText(/failed to fetch stations/i)).toBeInTheDocument();
    });
  });
});
