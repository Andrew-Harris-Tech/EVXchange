
import React from 'react';
import { OpenInAppButton } from '../components/shared/OpenInAppButton';

export default function Booking() {
  return (
    <div style={{ padding: 32 }}>
      <h2>Book a Charger</h2>
      {/* Booking form and availability UI goes here */}
      <p>Booking form placeholder</p>
      {/* Replace '123' with actual booking ID as needed */}
      <OpenInAppButton deepLink="booking/123">Open in App</OpenInAppButton>
    </div>
  );
}
