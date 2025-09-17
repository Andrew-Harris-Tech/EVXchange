import Home from './pages/Home.jsx';
import Map from './pages/Map.jsx';
import Booking from './pages/Booking.jsx';
import HostStations from './pages/HostStations.jsx';
import Dashboard from './pages/Dashboard.jsx';
import NotFound from './pages/NotFound.jsx';
// ...App entry point...

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
// Pages



import { useAuth } from './components/AuthContext';
import Landing from './pages/Landing.jsx';
import Profile from './pages/Profile.jsx';
import Login from './pages/Login.jsx';
import OAuthCallback from './components/auth/OAuthCallback.js';
import SignUp from './pages/SignUp.jsx';


function App() {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  // Optionally, use useEffect with location if needed

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar onHamburgerClick={() => setSidebarOpen(true)} />
      {/* Sidebar overlay for mobile, inline for desktop */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar: hidden on mobile unless open, always visible on md+ */}
        <div className="md:block">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        </div>
        {/* Main content */}
        <main className="flex-1 px-2 md:px-8 py-4">
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
            <Route path="/auth/callback/:provider" element={<OAuthCallback />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
