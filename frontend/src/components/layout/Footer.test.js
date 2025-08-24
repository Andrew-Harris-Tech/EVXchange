import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('is visible on all pages', () => {
    render(<Footer />);
    // Example: expect(screen.getByText(/footer/i)).toBeInTheDocument();
  });
});
