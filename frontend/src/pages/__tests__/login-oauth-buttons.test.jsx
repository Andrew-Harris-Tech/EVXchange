import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../../pages/Login.jsx';

describe('Login page', () => {
  it('renders all OAuth buttons', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /login with google/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login with facebook/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login with linkedin/i })).toBeInTheDocument();
  });
});
