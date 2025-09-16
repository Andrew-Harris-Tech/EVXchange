import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookingForm from '../../components/booking/BookingForm';
import BookingSummary from '../../components/booking/BookingSummary';
import PaymentForm from '../../components/payment/PaymentForm';
import PaymentSuccess from '../PaymentSuccess';
import PaymentFailure from '../PaymentFailure';

describe('Booking and Payment Integration Flow', () => {
  it('user books, pays, and sees success', async () => {
    // Step 1: Fill booking form
    const handleBooking = jest.fn();
    render(<BookingForm onSubmit={handleBooking} />);
    fireEvent.change(screen.getByTestId('station-input'), { target: { value: 'A1' } });
    fireEvent.change(screen.getByTestId('date-input'), { target: { value: '2025-09-16' } });
    fireEvent.change(screen.getByTestId('time-input'), { target: { value: '10:00' } });
    fireEvent.click(screen.getByText(/book/i));
    expect(handleBooking).toHaveBeenCalledWith({ station: 'A1', date: '2025-09-16', time: '10:00' });

    // Step 2: Show summary
    render(<BookingSummary station="A1" date="2025-09-16" time="10:00" />);
    expect(screen.getByTestId('summary-station')).toHaveTextContent('A1');
    expect(screen.getByTestId('summary-date')).toHaveTextContent('2025-09-16');
    expect(screen.getByTestId('summary-time')).toHaveTextContent('10:00');

    // Step 3: Payment
    const onCheckout = jest.fn().mockResolvedValue('https://stripe.test/checkout');
    delete window.location;
    window.location = { assign: jest.fn() };
    render(<PaymentForm bookingId={1} amount={1000} onCheckout={onCheckout} />);
    fireEvent.click(screen.getByTestId('pay-btn'));
    await waitFor(() => expect(onCheckout).toHaveBeenCalled());
    expect(window.location.assign).toHaveBeenCalledWith('https://stripe.test/checkout');

    // Step 4: Success page
    render(<PaymentSuccess />);
    expect(screen.getByTestId('payment-success-msg')).toBeInTheDocument();
  });

  it('user fails payment and sees error', async () => {
    // PaymentForm with failing backend
    const onCheckout = jest.fn().mockRejectedValue(new Error('fail'));
    render(<PaymentForm bookingId={2} amount={1000} onCheckout={onCheckout} />);
    fireEvent.click(screen.getByTestId('pay-btn'));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Payment failed'));
    // Failure page
    render(<PaymentFailure />);
    expect(screen.getByTestId('payment-failure-msg')).toBeInTheDocument();
  });
});
