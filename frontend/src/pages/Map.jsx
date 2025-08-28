import React from 'react';
import MapView from '../components/discovery/MapView';

export default function Map() {
  return (
    <div style={{ padding: 32 }}>
      <h2>Find Nearby Chargers</h2>
  <div style={{ height: 400, background: 'var(--color-aero-blue)', margin: '16px 0' }}>
        <MapView />
      </div>
    </div>
  );
}
