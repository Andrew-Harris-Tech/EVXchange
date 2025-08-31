import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => (
  <div className="landing-container">
    <h1>Canada’s Electric Vehicle
Charging Exchange</h1>
    <p>EVXchange is Canada’s first owner-to-owner EV
charging marketplace.
<ul>
<li>For Drivers: Instantly find, book, and pay for
nearby chargers based on location, availability,
and price — with transparent listings and trusted
host reviews.</li>
<li>For Hosts: Monetize your drieway by turning an
idle home or business charger into a source of
extra income. List on EVX and set your own pricing
and availability, or trade charge for charge.</li>
<li>For Canada: Expand charging access faster by
combining visibility into government-supported
public chargers with a country-wide network of EV
owners and their private chargers.</li>
</ul></p>
    <div className="landing-actions">
      <Link to="/login" className="landing-btn">Login</Link>
      <Link to="/signup" className="landing-btn">Sign Up</Link>
      <Link to="/map" className="landing-btn">Explore Map</Link>
    </div>
  </div>
);

export default Landing;
