import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar', () => {
  it('renders navbar links', () => {
    render(<Navbar />);
    // Example: expect(screen.getByText(/home/i)).toBeInTheDocument();
  });
});
