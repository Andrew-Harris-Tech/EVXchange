import React from 'react';
import { render, screen } from '@testing-library/react';
import Signup from './Signup';

describe('Signup', () => {
  it('renders signup form', () => {
    render(<Signup />);
    // Example: expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  });
});
