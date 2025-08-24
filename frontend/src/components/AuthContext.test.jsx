import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { AuthProvider, RequireAuth, useAuth } from './AuthContext';

function DummyProtected() {
  return <div>Protected Content</div>;
}

describe('RequireAuth', () => {
  it('shows message if not authenticated', () => {
    render(
      <AuthProvider>
        <RequireAuth>
          <DummyProtected />
        </RequireAuth>
      </AuthProvider>
    );
    expect(screen.getByText(/must be logged in/i)).toBeInTheDocument();
  });

  it('renders children if authenticated', async () => {
    function Wrapper() {
      const { login } = useAuth();
      React.useEffect(() => {
        login({ name: 'Test User' });
        // eslint-disable-next-line
      }, []);
      return (
        <RequireAuth>
          <DummyProtected />
        </RequireAuth>
      );
    }
    render(
      <AuthProvider>
        <Wrapper />
      </AuthProvider>
    );
    await waitFor(() =>
      expect(screen.getByText(/protected content/i)).toBeInTheDocument()
    );
  });
});
