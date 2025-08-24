import React from 'react';
import { render } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm', () => {
  it('selects date and time range', () => {
    render(<BookingForm />);
    // fireEvent.change(...)
  });
});
