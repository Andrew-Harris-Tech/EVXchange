// Shared navigation data for Navbar and Sidebar
// Each entry: { label, to, icon, showInNavbar, showInSidebar, requiresAuth, adminOnly, etc. }

export const NAV_LINKS = [
  { label: 'Home', to: '/', showInNavbar: true, showInSidebar: true },
  { label: 'Stations', to: '/map', showInNavbar: true, showInSidebar: true },
  { label: 'Bookings', to: '/booking', showInNavbar: true, showInSidebar: true },
  { label: 'Profile', to: '/dashboard', showInNavbar: true, showInSidebar: true, requiresAuth: true },
  { label: 'Host Dashboard', to: '/host', showInNavbar: false, showInSidebar: true, requiresAuth: true },
  { label: 'Add Station', to: '/host/add', showInNavbar: false, showInSidebar: true, requiresAuth: true },
  { label: 'Settings', to: '/settings', showInNavbar: false, showInSidebar: true, requiresAuth: true },
  { label: 'Help', to: '/help', showInNavbar: false, showInSidebar: true },
  { label: 'Login', to: '/login', showInNavbar: true, showInSidebar: true, requiresAuth: false, authAction: 'login' },
  { label: 'Logout', to: '/logout', showInNavbar: false, showInSidebar: true, requiresAuth: true, authAction: 'logout' }
];
