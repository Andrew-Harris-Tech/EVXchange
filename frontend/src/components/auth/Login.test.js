import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  it('loads login page', () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByText('Google')).toBeInTheDocument();
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
  });

  it('redirects to Google OAuth on button click', () => {
    delete window.location;
    window.location = { href: '' };
    render(<Login />);
    fireEvent.click(screen.getByText('Google'));
    expect(window.location.href).toContain('/api/auth/login/google');
  });

  it('redirects to Facebook OAuth on button click', () => {
    delete window.location;
    window.location = { href: '' };
    render(<Login />);
    fireEvent.click(screen.getByText('Facebook'));
    expect(window.location.href).toContain('/api/auth/login/facebook');
  });

  it('redirects to LinkedIn OAuth on button click', () => {
    delete window.location;
    window.location = { href: '' };
    render(<Login />);
    fireEvent.click(screen.getByText('LinkedIn'));
    expect(window.location.href).toContain('/api/auth/login/linkedin');
  });
});
