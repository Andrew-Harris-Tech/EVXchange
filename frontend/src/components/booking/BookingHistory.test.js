import React from 'react';
import { render } from '@testing-library/react';
import BookingHistory from './BookingHistory';

describe('BookingHistory', () => {
  it('shows past and upcoming reservations', () => {
    render(<BookingHistory />);
    // Example: expect(...).toBeInTheDocument();
  });
});
