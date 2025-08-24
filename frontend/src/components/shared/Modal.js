import React from 'react';
export default function Modal({ children, show = false, onClose }) {
	if (!show) return null;
	return (
		<div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
			<div className="modal-dialog">
				<div className="modal-content">
					<div className="modal-header">
						<h5 className="modal-title">Modal</h5>
						<button type="button" className="btn-close" aria-label="Close" onClick={onClose}></button>
					</div>
					<div className="modal-body">{children}</div>
				</div>
			</div>
		</div>
	);
}
