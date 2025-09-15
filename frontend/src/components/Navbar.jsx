import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import navLinks from '../config/navLinks';

const Navbar = ({ user, onHamburgerClick }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleHamburger = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (onHamburgerClick) onHamburgerClick();
  };

  return (
    <nav className="bg-white shadow fixed top-0 left-0 w-full z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-xl font-bold text-blue-600">ChargeBnB</Link>
          </div>
          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            {navLinks.filter(l => l.showInNavbar).map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium ${location.pathname === link.path ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-500'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
          {/* Hamburger for mobile */}
          <div className="md:hidden flex items-center">
            <button
              onClick={handleHamburger}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Open sidebar menu"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
