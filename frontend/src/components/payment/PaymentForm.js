import React, { useState } from 'react';

export default function PaymentForm({ bookingId, amount, onCheckout }) {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');

	async function handlePay() {
		setLoading(true);
		setError('');
		try {
			// Simulate API call
			if (onCheckout) {
				const url = await onCheckout({ bookingId, amount });
				window.location.assign(url);
			}
		} catch (e) {
			setError('Payment failed');
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<div data-testid="payment-booking-id">Booking: {bookingId}</div>
			<div data-testid="payment-amount">Amount: {amount}</div>
			{error && <div role="alert">{error}</div>}
			<button onClick={handlePay} disabled={loading} data-testid="pay-btn">Pay</button>
		</div>
	);
}
