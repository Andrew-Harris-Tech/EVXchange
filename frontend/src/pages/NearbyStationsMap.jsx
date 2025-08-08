import React, { useEffect, useState } from 'react';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

function loadGoogleMapsScript(callback) {
  if (window.google && window.google.maps) {
    callback();
    return;
  }
  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
  script.async = true;
  script.onload = callback;
  document.body.appendChild(script);
}

const NearbyStationsMap = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        (err) => {
          setError('Unable to get your location.');
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      // Fetch nearby stations from backend
      fetch(`${BACKEND_URL}/api/nearby_stations?lat=${userLocation.lat}&lng=${userLocation.lng}`)
        .then((res) => res.json())
        .then((data) => {
          setStations(data.stations || []);
        })
        .catch(() => setError('Failed to fetch stations.'));
    }
  }, [userLocation]);

  useEffect(() => {
    if (userLocation) {
      loadGoogleMapsScript(() => {
        const mapInstance = new window.google.maps.Map(document.getElementById('map'), {
          center: userLocation,
          zoom: 14,
        });
        setMap(mapInstance);
      });
    }
  }, [userLocation]);

  useEffect(() => {
    if (map && stations.length > 0) {
      // Add markers for stations
      stations.forEach((station) => {
        new window.google.maps.Marker({
          position: { lat: station.lat, lng: station.lng },
          map,
          title: station.name,
        });
      });
    }
  }, [map, stations]);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <h2>Nearby Charging Stations</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div id="map" style={{ width: '100%', height: '400px', marginBottom: '1rem' }} />
      <ul>
        {stations.map((station) => (
          <li key={station.id}>
            <strong>{station.name}</strong> — {station.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NearbyStationsMap;
