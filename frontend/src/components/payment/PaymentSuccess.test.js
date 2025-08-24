import React from 'react';
import { render } from '@testing-library/react';
import PaymentSuccess from './PaymentSuccess';

describe('PaymentSuccess', () => {
  it('redirects to success page on payment success', () => {
    render(<PaymentSuccess />);
    // Example: expect(...).toBeInTheDocument();
  });
});
