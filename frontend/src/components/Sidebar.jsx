import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import navLinks from '../config/navLinks';

const Sidebar = ({ open, onClose, user }) => {
  const location = useLocation();

  // Only show links user is allowed to see
  const filteredLinks = navLinks.filter(link => {
    if (link.requiresAuth && !user) return false;
    return link.showInSidebar;
  });

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 ${open ? 'block' : 'hidden'}`}
        onClick={onClose}
        aria-label="Close sidebar overlay"
      />
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col h-full">
          {/* User info */}
          {user && (
            <div className="flex items-center space-x-3 p-4 border-b">
              <img src={user.avatar} alt="avatar" className="w-10 h-10 rounded-full" />
              <span className="font-semibold text-gray-800">{user.name}</span>
            </div>
          )}
          {/* Nav links */}
          <nav className="flex-1 py-4 px-2 space-y-1">
            {filteredLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-2 rounded-md text-base font-medium transition-colors ${location.pathname === link.path ? 'bg-blue-100 text-blue-700 font-bold' : 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'}`}
                onClick={onClose}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
