import React from 'react';
import { render } from '@testing-library/react';
import PaymentForm from './PaymentForm';

describe('PaymentForm', () => {
  it('loads with correct booking details', () => {
    render(<PaymentForm />);
    // Example: expect(...).toBeInTheDocument();
  });
});
