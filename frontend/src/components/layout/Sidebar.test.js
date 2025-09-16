import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Sidebar from './Sidebar';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../AuthContext';

describe('Sidebar', () => {
  const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };

  it('renders sidebar links inside Router (authenticated)', () => {
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

  it('navigates and closes sidebar when a link is clicked', () => {
    const onClose = jest.fn();
    render(
      <MemoryRouter initialEntries={['/']}> 
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Sidebar open={true} onClose={onClose} />
        </AuthProvider>
      </MemoryRouter>
    );
    const stationsLink = screen.getByTestId('sidebar-link-stations');
    fireEvent.click(stationsLink);
    expect(onClose).toHaveBeenCalled();
  });

  it('navigates and closes sidebar when a host action is clicked', () => {
    const onClose = jest.fn();
    render(
      <MemoryRouter initialEntries={['/']}> 
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Sidebar open={true} onClose={onClose} />
        </AuthProvider>
      </MemoryRouter>
    );
    // Open host actions
    const hostButton = screen.getByText(/host actions/i);
    fireEvent.click(hostButton);
    const hostDashboardLink = screen.getByTestId('sidebar-link-host-dashboard');
    fireEvent.click(hostDashboardLink);
    expect(onClose).toHaveBeenCalled();
  });
  it('navigates and closes sidebar when a link is clicked', () => {
    const onClose = jest.fn();
    render(
      <MemoryRouter initialEntries={['/']}> 
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Sidebar open={true} onClose={onClose} />
        </AuthProvider>
      </MemoryRouter>
    );
    const stationsLink = screen.getByTestId('sidebar-link-stations');
    fireEvent.click(stationsLink);
    expect(onClose).toHaveBeenCalled();
  });

  it('navigates and closes sidebar when a host action is clicked', () => {
    const onClose = jest.fn();
    render(
      <MemoryRouter initialEntries={['/']}> 
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Sidebar open={true} onClose={onClose} />
        </AuthProvider>
      </MemoryRouter>
    );
    // Open host actions
    const hostButton = screen.getByText(/host actions/i);
    fireEvent.click(hostButton);
    const hostDashboardLink = screen.getByTestId('sidebar-link-host-dashboard');
    fireEvent.click(hostDashboardLink);
    expect(onClose).toHaveBeenCalled();
  });
});
