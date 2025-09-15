import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../AuthContext';
import Sidebar from './Sidebar';

describe('Sidebar', () => {
  it('is hidden by default', () => {
    render(
      <MemoryRouter>
        <AuthProvider value={{ user: null, login: jest.fn(), logout: jest.fn() }}>
          <Sidebar open={false} onClose={jest.fn()} />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.queryByLabelText(/sidebar navigation/i)).not.toBeVisible();
  });

  it('becomes visible when open', () => {
    render(
      <MemoryRouter>
        <AuthProvider value={{ user: null, login: jest.fn(), logout: jest.fn() }}>
          <Sidebar open={true} onClose={jest.fn()} />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByLabelText(/sidebar navigation/i)).toBeVisible();
  });

  it('renders all sidebar entries for authenticated user', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };
    render(
      <MemoryRouter initialEntries={['/host']}>
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Sidebar open={true} onClose={jest.fn()} />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/host dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/add station/i)).toBeInTheDocument();
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
    expect(screen.getByText(/help/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  it('highlights the active route', () => {
    const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };
    render(
      <MemoryRouter initialEntries={['/host']}>
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Sidebar open={true} onClose={jest.fn()} />
        </AuthProvider>
      </MemoryRouter>
    );
    const hostLink = screen.getByText(/host dashboard/i);
    expect(hostLink.className).toMatch(/bg-blue-200/);
  });

  it('closes when overlay is clicked', () => {
    const onClose = jest.fn();
    const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };
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

  it('closes when a link is clicked', () => {
    const onClose = jest.fn();
    const mockUser = { name: 'Test User', email: 'test@example.com', avatar: '' };
    render(
      <MemoryRouter initialEntries={['/host']}>
        <AuthProvider value={{ user: mockUser, login: jest.fn(), logout: jest.fn() }}>
          <Sidebar open={true} onClose={onClose} />
        </AuthProvider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText(/host dashboard/i));
    expect(onClose).toHaveBeenCalled();
  });
});
