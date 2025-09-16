import React from 'react';

export default function BookingSummary({ station, date, time }) {
	return (
		<div>
			<h2>Booking Summary</h2>
			<div data-testid="summary-station">Station: {station}</div>
			<div data-testid="summary-date">Date: {date}</div>
			<div data-testid="summary-time">Time: {time}</div>
		</div>
	);
}
