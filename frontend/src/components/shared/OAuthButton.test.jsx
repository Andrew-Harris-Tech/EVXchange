import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OAuthButton from './OAuthButton.jsx';

describe('OAuthButton', () => {
  it('renders Google button and triggers redirect', () => {
    delete window.location;
    window.location = { href: '' };
    render(<OAuthButton provider="google" />);
    const btn = screen.getByRole('button', { name: /login with google/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(window.location.href).toContain('/auth/login/google');
  });

  it('renders Facebook button and triggers redirect', () => {
    delete window.location;
    window.location = { href: '' };
    render(<OAuthButton provider="facebook" />);
    const btn = screen.getByRole('button', { name: /login with facebook/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(window.location.href).toContain('/auth/login/facebook');
  });

  it('renders LinkedIn button and triggers redirect', () => {
    delete window.location;
    window.location = { href: '' };
    render(<OAuthButton provider="linkedin" />);
    const btn = screen.getByRole('button', { name: /login with linkedin/i });
    expect(btn).toBeInTheDocument();
    fireEvent.click(btn);
    expect(window.location.href).toContain('/auth/login/linkedin');
  });

  it('renders nothing for unknown provider', () => {
    const { container } = render(<OAuthButton provider="unknown" />);
    expect(container.firstChild).toBeNull();
  });
});
