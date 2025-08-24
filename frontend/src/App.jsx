import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Navbar from './components/layout/Navbar';

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
        <Navbar />
        <div className="container mt-4">
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
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
