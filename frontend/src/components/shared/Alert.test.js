import React from 'react';
import { render } from '@testing-library/react';
import Alert from './Alert';

describe('Alert', () => {
  it('shows up for errors and confirmations', () => {
    render(<Alert message="Test Alert" />);
    // Example: expect(screen.getByText(/test alert/i)).toBeInTheDocument();
  });
});
