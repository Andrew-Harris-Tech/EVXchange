import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function OAuthCallback() {
	const navigate = useNavigate();
	const { provider } = useParams();
	const { login } = useAuth();
	const location = useLocation();

	useEffect(() => {
		// Parse JWT from query string (e.g., /auth/callback/google?token=...)
		const params = new URLSearchParams(location.search);
		const token = params.get('token');
		if (token) {
			localStorage.setItem('jwt', token);
			// Optionally decode JWT for user info (or fetch /auth/user)
			fetch('/auth/user', {
				headers: { Authorization: `Bearer ${token}` },
			})
				.then((res) => res.json())
				.then((user) => {
					login(user);
					navigate('/dashboard');
				})
				.catch(() => {
					navigate('/login');
				});
		} else {
			navigate('/login');
		}
	}, [location, login, navigate]);

	return <div>Logging you in...</div>;
}
