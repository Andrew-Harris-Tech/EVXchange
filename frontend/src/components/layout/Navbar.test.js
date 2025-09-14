import React from 'react';
import { render, screen } from '@testing-library/react';

import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../AuthContext';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('throws if rendered outside Router', () => {
    // Suppress error output for this test
    const originalError = console.error;
    console.error = () => {};
    expect(() => render(<Navbar />)).toThrow();
    console.error = originalError;
  });

  it('renders navbar links inside Router (authenticated, desktop)', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };
    // Set window width to desktop
    window.innerWidth = 1024;
    render(
      <MemoryRouter>
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/stations/i)).toBeInTheDocument();
    expect(screen.getByText(/bookings/i)).toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
    // Hamburger should not be in the DOM
    expect(screen.queryByTestId('navbar-hamburger')).not.toBeInTheDocument();
  });

  it('shows hamburger and logo only on mobile', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };
    // Set window width to mobile
    window.innerWidth = 375;
    render(
      <MemoryRouter>
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/evxchange/i)).toBeInTheDocument();
    expect(screen.getByTestId('navbar-hamburger')).toBeInTheDocument();
    // Links should not be in the DOM
    expect(screen.queryByText(/stations/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/bookings/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/profile/i)).not.toBeInTheDocument();
  });
  it('renders navbar links inside Router (authenticated, desktop)', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };
    // Set window width to desktop
    window.innerWidth = 1024;
    render(
      <MemoryRouter>
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/stations/i)).toBeInTheDocument();
    expect(screen.getByText(/bookings/i)).toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  // Hamburger should not be in the DOM
  expect(screen.queryByTestId('navbar-hamburger')).not.toBeInTheDocument();
  });

  it('shows hamburger and logo only on mobile', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };
    // Set window width to mobile
    window.innerWidth = 375;
    render(
      <MemoryRouter>
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/evxchange/i)).toBeInTheDocument();
    expect(screen.getByTestId('navbar-hamburger')).toBeInTheDocument();
  // Links should not be in the DOM
  expect(screen.queryByText(/stations/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/bookings/i)).not.toBeInTheDocument();
  expect(screen.queryByText(/profile/i)).not.toBeInTheDocument();
  });
});
