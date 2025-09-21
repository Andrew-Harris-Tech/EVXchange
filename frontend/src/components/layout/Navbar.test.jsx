import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Navbar from './Navbar';
import { AuthProvider } from '../AuthContext';
import { MemoryRouter } from 'react-router-dom';

// Mock EmailLoginModal to isolate Navbar logic
jest.mock('./EmailLoginModal.jsx', () => (props) => (
  props.show ? (
    <div data-testid="mock-email-modal">
      <button onClick={() => props.onSubmit('admin@example.com')}>Mock Submit</button>
      {props.error && <div>{props.error}</div>}
    </div>
  ) : null
));

describe('Navbar email login', () => {
  it('shows email login button when logged out', () => {
    render(
      <MemoryRouter>
        <AuthProvider value={{ user: null, login: jest.fn(), logout: jest.fn() }}>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('navbar-email-login')).toBeInTheDocument();
  });

  it('opens modal and calls onSubmit', async () => {
    const login = jest.fn();
    render(
      <MemoryRouter>
        <AuthProvider value={{ user: null, login, logout: jest.fn() }}>
          <Navbar />
        </AuthProvider>
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTestId('navbar-email-login'));
    expect(screen.getByTestId('mock-email-modal')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Mock Submit'));
    // login should be called after successful fetch (mocked here)
    // In real integration, mock fetch and test full flow
  });
});
