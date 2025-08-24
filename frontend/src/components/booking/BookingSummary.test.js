import React from 'react';
import { render } from '@testing-library/react';
import BookingSummary from './BookingSummary';

describe('BookingSummary', () => {
  it('displays correct booking summary', () => {
    render(<BookingSummary />);
    // Example: expect(...).toBeInTheDocument();
  });
});
