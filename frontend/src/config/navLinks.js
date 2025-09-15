// Shared navigation links for Navbar and Sidebar
// Each entry: { label, path, icon (optional), showInNavbar, showInSidebar, requiresAuth (optional) }

const navLinks = [
  { label: 'Home', path: '/', showInNavbar: true, showInSidebar: true },
  { label: 'Stations', path: '/stations', showInNavbar: true, showInSidebar: true },
  { label: 'Bookings', path: '/bookings', showInNavbar: true, showInSidebar: true, requiresAuth: true },
  { label: 'Profile', path: '/profile', showInNavbar: true, showInSidebar: true, requiresAuth: true },
  // Sidebar-only links
  { label: 'Host Dashboard', path: '/host', showInNavbar: false, showInSidebar: true, requiresAuth: true },
  { label: 'Add Station', path: '/host/add-station', showInNavbar: false, showInSidebar: true, requiresAuth: true },
  { label: 'Settings', path: '/settings', showInNavbar: false, showInSidebar: true, requiresAuth: true },
  { label: 'Help', path: '/help', showInNavbar: false, showInSidebar: true },
  { label: 'Logout', path: '/logout', showInNavbar: false, showInSidebar: true, requiresAuth: true },
];

export default navLinks;
