import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Sidebar from './Sidebar';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../AuthContext';

describe('Sidebar', () => {
  it('renders sidebar links inside Router (authenticated)', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };
    render(
      <MemoryRouter>
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Sidebar open={true} onClose={() => {}} />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/stations/i)).toBeInTheDocument();
    expect(screen.getByText(/bookings/i)).toBeInTheDocument();
    expect(screen.getByText(/host dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  });

  it('calls onClose when overlay is clicked', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };
    const onClose = jest.fn();
    render(
      <MemoryRouter>
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Sidebar open={true} onClose={onClose} />
        </AuthProvider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('sidebar-overlay'));
    expect(onClose).toHaveBeenCalled();
  });
});
