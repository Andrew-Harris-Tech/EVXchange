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

  it('renders navbar links inside Router (authenticated)', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };
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
  });
});
