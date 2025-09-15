import { NAV_LINKS } from './navLinks';

describe('Navigation config', () => {
  it('has consistent entries for Navbar and Sidebar', () => {
    const navbarLinks = NAV_LINKS.filter(l => l.showInNavbar).map(l => l.label);
    const sidebarLinks = NAV_LINKS.filter(l => l.showInSidebar).map(l => l.label);
    // All navbar links should be in sidebar
    navbarLinks.forEach(label => {
      expect(sidebarLinks).toContain(label);
    });
  });
});
