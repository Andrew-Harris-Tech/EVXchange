import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import { AuthProvider } from '../../components/AuthContext';

// Helper to render App with Auth context and router
function renderWithProviders(ui, { route = '/', user = null } = {}) {
  window.history.pushState({}, 'Test page', route);
  const login = jest.fn();
  const logout = jest.fn();
  const value = { user, login, logout };
  return render(
    <AuthProvider value={value}>
      <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
    </AuthProvider>
  );
}

describe('Landing and Profile Routing', () => {
  test('shows landing page for unauthenticated users at root', () => {
    renderWithProviders(<App />, { route: '/' });
    expect(screen.getByText(/welcome to evxchange/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test('shows profile page for authenticated users at /profile', () => {
    renderWithProviders(<App />, {
      route: '/profile',
      user: { name: 'Test User', email: 'test@example.com' },
    });
  // 'Profile' appears in both navbar and page heading, so check for at least one match
  expect(screen.getAllByText(/profile/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/test user/i)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  test('redirects unauthenticated users to landing page at /profile', () => {
    renderWithProviders(<App />, { route: '/profile' });
    expect(screen.getByText(/welcome to evxchange/i)).toBeInTheDocument();
  });
});
