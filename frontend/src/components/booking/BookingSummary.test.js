import React from 'react';
import { render, screen } from '@testing-library/react';
import BookingSummary from './BookingSummary';

describe('BookingSummary', () => {
  it('displays correct booking summary', () => {
    render(<BookingSummary station="A1" date="2025-09-16" time="10:00" />);
    expect(screen.getByTestId('summary-station')).toHaveTextContent('A1');
    expect(screen.getByTestId('summary-date')).toHaveTextContent('2025-09-16');
    expect(screen.getByTestId('summary-time')).toHaveTextContent('10:00');
  });
});
