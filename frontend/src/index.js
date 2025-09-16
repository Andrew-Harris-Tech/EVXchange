// ...React root...
import React from 'react';
import ReactDOM from 'react-dom/client';



import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/brand.css';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './components/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter future={{ v7_relativeSplatPath: true }}>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
