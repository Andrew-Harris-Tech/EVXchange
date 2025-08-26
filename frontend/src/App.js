import Home from './pages/Home.jsx';
import Map from './pages/Map.jsx';
import Booking from './pages/Booking.jsx';
import HostStations from './pages/HostStations.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
// ...App entry point...

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
// Pages



import { useAuth } from './components/AuthContext';
import Landing from './pages/Landing.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';


function App() {
  const { user } = useAuth();
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="container-fluid flex-grow-1 my-4">
        <div className="row">
          <div className="col-md-2 mb-3">
            <Sidebar />
          </div>
          <div className="col-md-8 mb-3">
            <Routes>
              {/* Landing page for unauthenticated users, Home for logged in */}
              <Route path="/" element={user ? <Home /> : <Landing />} />
              <Route path="/profile" element={user ? <Profile /> : <Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/map" element={<Map />} />
              <Route path="/booking" element={<Booking />} />
              <Route path="/host" element={<HostStations />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
