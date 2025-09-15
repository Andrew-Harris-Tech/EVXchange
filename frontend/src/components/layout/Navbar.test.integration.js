import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../AuthContext';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders logo and navigation entries in desktop view', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };
    render(
      <MemoryRouter initialEntries={['/']}> 
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/evxchange/i)).toBeInTheDocument();
    expect(screen.getByTestId('navbar-link-home')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-link-stations')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-link-bookings')).toBeInTheDocument();
    expect(screen.getByTestId('navbar-link-profile')).toBeInTheDocument();
  });

  it('shows hamburger menu on mobile', () => {
    // Set window width to mobile
    window.innerWidth = 375;
    window.dispatchEvent(new Event('resize'));
    const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };
    render(
      <MemoryRouter>
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/open sidebar menu/i)).toBeInTheDocument();
  });
});
