import React from 'react';
export default function Login() {
	// Helper to redirect to backend OAuth login
	const handleOAuthLogin = (provider) => {
		window.location.href = `/api/auth/login/${provider}`;
	};

	return (
		<div className="container mt-5" style={{ maxWidth: 400 }}>
			<h2 className="mb-4 text-center">Sign In</h2>
			<form>
				<div className="mb-3">
					<label htmlFor="email" className="form-label">Email address</label>
					<input type="email" className="form-control" id="email" placeholder="Enter email" />
				</div>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Password</label>
					<input type="password" className="form-control" id="password" placeholder="Password" />
				</div>
				<button type="submit" className="btn btn-primary w-100 mb-2">Login</button>
				<div className="d-flex justify-content-between">
					<button type="button" className="btn btn-outline-secondary w-100 me-1" onClick={() => handleOAuthLogin('google')}>Google</button>
					<button type="button" className="btn btn-outline-primary w-100 mx-1" onClick={() => handleOAuthLogin('facebook')}>Facebook</button>
					<button type="button" className="btn btn-outline-info w-100 ms-1" onClick={() => handleOAuthLogin('linkedin')}>LinkedIn</button>
				</div>
			</form>
		</div>
	);
}
