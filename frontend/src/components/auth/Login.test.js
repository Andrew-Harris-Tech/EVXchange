import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

describe('Login', () => {
  it('loads login page', () => {
    render(<Login />);
    // Example: expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
  it('shows error for incorrect credentials', () => {
    render(<Login />);
    // Simulate error and check for error message
  });
});
