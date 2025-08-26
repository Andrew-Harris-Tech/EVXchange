import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../../App';

// Helper to render App at a specific route
function renderWithRoute(route = '/') {
  window.history.pushState({}, 'Test page', route);
  return render(
    <MemoryRouter initialEntries={[route]}>
      <App />
    </MemoryRouter>
  );
}

describe('Landing page navigation', () => {
  test('Landing page shows all three buttons', () => {
    renderWithRoute('/');
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
    expect(screen.getByText(/explore map/i)).toBeInTheDocument();
  });

  test('Login button navigates to /login', async () => {
    renderWithRoute('/');
    await userEvent.click(screen.getByText(/login/i));
    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
  });

  test('Sign Up button navigates to /signup', async () => {
    renderWithRoute('/');
    await userEvent.click(screen.getByText(/sign up/i));
    expect(screen.getByRole('heading', { name: /sign up/i })).toBeInTheDocument();
  });

  test('Explore Map button navigates to /map and shows map', async () => {
    renderWithRoute('/');
    await userEvent.click(screen.getByText(/explore map/i));
    expect(screen.getByRole('heading', { name: /find nearby chargers/i })).toBeInTheDocument();
    expect(screen.getByText(/map view/i)).toBeInTheDocument();
  });
});
