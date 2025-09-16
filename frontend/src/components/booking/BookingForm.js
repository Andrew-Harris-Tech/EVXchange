import React, { useState } from 'react';

export default function BookingForm({ onSubmit }) {
	const [station, setStation] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [error, setError] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		if (!station || !date || !time) {
			setError('All fields are required');
			return;
		}
		setError('');
		if (onSubmit) onSubmit({ station, date, time });
	}

	return (
		<form onSubmit={handleSubmit} aria-label="booking-form">
			<label>
				Station
				<input
					data-testid="station-input"
					value={station}
					onChange={e => setStation(e.target.value)}
					required
				/>
			</label>
			<label>
				Date
				<input
					data-testid="date-input"
					type="date"
					value={date}
					onChange={e => setDate(e.target.value)}
					required
				/>
			</label>
			<label>
				Time
				<input
					data-testid="time-input"
					type="time"
					value={time}
					onChange={e => setTime(e.target.value)}
					required
				/>
			</label>
			{error && <div role="alert">{error}</div>}
			<button type="submit">Book</button>
		</form>
	);
}
