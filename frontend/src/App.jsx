import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Map from './pages/Map';
import Booking from './pages/Booking';
import Payments from './pages/Payments';
import Reviews from './pages/Reviews';
import Dashboard from './pages/Dashboard';
import HostStations from './pages/HostStations';
import Geolocation from './pages/Geolocation';
import NotFound from './pages/NotFound';
import { AuthProvider, RequireAuth } from './components/AuthContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <nav style={{ padding: '1rem', background: '#f5f5f5' }}>
          <Link to="/">Home</Link> |{' '}
          <Link to="/map">Map</Link> |{' '}
          <Link to="/booking">Booking</Link> |{' '}
          <Link to="/payments">Payments</Link> |{' '}
          <Link to="/reviews">Reviews</Link> |{' '}
          <Link to="/dashboard">Dashboard</Link> |{' '}
          <Link to="/host">Host</Link> |{' '}
          <Link to="/geolocation">Geolocation</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/map" element={<Map />} />
          <Route path="/booking" element={<RequireAuth><Booking /></RequireAuth>} />
          <Route path="/payments" element={<RequireAuth><Payments /></RequireAuth>} />
          <Route path="/reviews" element={<RequireAuth><Reviews /></RequireAuth>} />
          <Route path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>} />
          <Route path="/host" element={<RequireAuth><HostStations /></RequireAuth>} />
          <Route path="/geolocation" element={<Geolocation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
