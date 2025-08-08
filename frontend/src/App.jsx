import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NearbyStationsMap from './pages/NearbyStationsMap';
import { AuthProvider, RequireAuth } from './components/AuthContext';

const Home = () => (
  <div style={{ padding: '2rem' }}>
    <h1>Welcome to ChargeBnB</h1>
    <p>
      <Link to="/nearby-stations">View Nearby Charging Stations</Link>
    </p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <nav style={{ padding: '1rem', background: '#f5f5f5' }}>
          <Link to="/">Home</Link> |{' '}
          <Link to="/nearby-stations">Nearby Stations</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nearby-stations" element={
            <RequireAuth>
              <NearbyStationsMap />
            </RequireAuth>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
