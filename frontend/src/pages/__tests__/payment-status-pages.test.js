import React from 'react';
import { render, screen } from '@testing-library/react';
import PaymentSuccess from '../PaymentSuccess';
import PaymentFailure from '../PaymentFailure';

describe('PaymentSuccess', () => {
  it('shows confirmation message', () => {
    render(<PaymentSuccess />);
    expect(screen.getByTestId('payment-success-msg')).toHaveTextContent('Payment successful');
  });
});

describe('PaymentFailure', () => {
  it('shows error message', () => {
    render(<PaymentFailure />);
    expect(screen.getByTestId('payment-failure-msg')).toHaveTextContent('Payment failed');
  });
});
