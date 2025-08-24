import React from 'react';
export default function Alert({ message, type = 'info' }) {
	return <div className={`alert alert-${type}`} role="alert">{message}</div>;
}
