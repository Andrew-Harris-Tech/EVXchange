import React from 'react';
import { render, screen } from '@testing-library/react';
import Navbar from './Navbar';

import { MemoryRouter } from 'react-router-dom';

describe('Navbar', () => {
  it('throws if rendered outside Router', () => {
    // Suppress error output for this test
    const originalError = console.error;
    console.error = () => {};
    expect(() => render(<Navbar />)).toThrow();
    console.error = originalError;
  });

  it('renders navbar links inside Router', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/stations/i)).toBeInTheDocument();
    expect(screen.getByText(/bookings/i)).toBeInTheDocument();
    expect(screen.getByText(/host dashboard/i)).toBeInTheDocument();
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  });
});
