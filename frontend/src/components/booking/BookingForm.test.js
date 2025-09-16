import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm', () => {
  it('validates required fields', () => {
    render(<BookingForm />);
    fireEvent.click(screen.getByText(/book/i));
    expect(screen.getByRole('alert')).toHaveTextContent('All fields are required');
  });

  it('calls onSubmit with correct data', () => {
    const onSubmit = jest.fn();
    render(<BookingForm onSubmit={onSubmit} />);
    fireEvent.change(screen.getByTestId('station-input'), { target: { value: 'A1' } });
    fireEvent.change(screen.getByTestId('date-input'), { target: { value: '2025-09-16' } });
    fireEvent.change(screen.getByTestId('time-input'), { target: { value: '10:00' } });
    fireEvent.click(screen.getByText(/book/i));
    expect(onSubmit).toHaveBeenCalledWith({ station: 'A1', date: '2025-09-16', time: '10:00' });
  });
});
