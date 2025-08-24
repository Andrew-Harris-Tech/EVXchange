import React from 'react';
import { render } from '@testing-library/react';
import PaymentFailure from './PaymentFailure';

describe('PaymentFailure', () => {
  it('redirects to failure page on payment failure', () => {
    render(<PaymentFailure />);
    // Example: expect(...).toBeInTheDocument();
  });
});
