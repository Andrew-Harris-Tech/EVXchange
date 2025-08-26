import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => (
  <div className="landing-container">
    <h1>Welcome to EVXchange</h1>
    <p>Your one-stop platform for EV charging and hosting.</p>
    <div className="landing-actions">
      <Link to="/login" className="landing-btn">Login</Link>
      <Link to="/signup" className="landing-btn">Sign Up</Link>
      <Link to="/map" className="landing-btn">Explore Map</Link>
    </div>
  </div>
);

export default Landing;
