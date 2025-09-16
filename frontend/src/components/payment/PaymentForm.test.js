import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import PaymentForm from './PaymentForm';

describe('PaymentForm', () => {
	it('shows booking and amount', () => {
		render(<PaymentForm bookingId={123} amount={2500} />);
		expect(screen.getByTestId('payment-booking-id')).toHaveTextContent('123');
		expect(screen.getByTestId('payment-amount')).toHaveTextContent('2500');
	});

	it('calls backend and redirects to Stripe', async () => {
		const onCheckout = jest.fn().mockResolvedValue('https://stripe.test/checkout');
		delete window.location;
		window.location = { assign: jest.fn() };
		render(<PaymentForm bookingId={1} amount={1000} onCheckout={onCheckout} />);
		await act(async () => {
			fireEvent.click(screen.getByTestId('pay-btn'));
			// Wait for async
			await Promise.resolve();
		});
		expect(onCheckout).toHaveBeenCalledWith({ bookingId: 1, amount: 1000 });
		expect(window.location.assign).toHaveBeenCalledWith('https://stripe.test/checkout');
	});
});
