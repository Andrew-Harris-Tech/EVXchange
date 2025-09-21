


import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { NAV_LINKS } from './navLinks';
import EmailLoginModal from './EmailLoginModal.jsx';
import { BACKEND_URL } from '../../api/backend';


export default function Navbar({ onHamburgerClick }) {
	const [showEmailLogin, setShowEmailLogin] = useState(false);
	const [emailLoginLoading, setEmailLoginLoading] = useState(false);
	const [emailLoginError, setEmailLoginError] = useState('');
	const { login } = useAuth();
	const location = useLocation();
	const { user, logout } = useAuth();
	const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= 768 : true);

	useEffect(() => {
		function handleResize() {
			setIsDesktop(window.innerWidth >= 768);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	// Only show these entries in the Navbar
	const navbarLinks = NAV_LINKS.filter(
		l => l.showInNavbar && (!l.requiresAuth || user)
	).filter(l => !(l.authAction === 'login' && user));




	const [showPassword, setShowPassword] = useState(false);

	async function handleEmailLogin({ email, password }) {
		setEmailLoginLoading(true);
		setEmailLoginError('');
		try {
			const body = password ? { email, password } : { email };
			const res = await fetch(`${BACKEND_URL}/auth/email-login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(body)
			});
			if (!res.ok) {
				const data = await res.json();
				setEmailLoginError(data.error || 'Login failed');
				// If backend says password required, show password field
				if (data.error && data.error.toLowerCase().includes('password required')) {
					setShowPassword(true);
				}
				setEmailLoginLoading(false);
				return;
			}
			const user = await res.json();
			login(user);
			setShowEmailLogin(false);
			setShowPassword(false);
		} catch (err) {
			setEmailLoginError('Network error');
		} finally {
			setEmailLoginLoading(false);
		}
	}

	return (
		<nav className="fixed top-0 left-0 w-full z-30 bg-primary text-white shadow">
			<div className="flex items-center justify-between px-4 py-3 md:px-8">
				<Link className="font-bold text-xl" to="/">evxchange</Link>
				{!isDesktop && (
					<button
						className="focus:outline-none"
						aria-label="Open sidebar menu"
						onClick={onHamburgerClick}
						data-testid="navbar-hamburger"
					>
						<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				)}
				{isDesktop && (
					<ul className="flex space-x-6 items-center">
						{navbarLinks.map(link => (
							<li key={link.to}>
								<Link
									to={link.to}
									className={`px-3 py-2 rounded hover:bg-blue-700 transition-colors ${location.pathname === link.to ? 'bg-blue-900 font-semibold' : ''}`}
									data-testid={`navbar-link-${link.label.toLowerCase().replace(/ /g, '-')}`}
								>
									{link.label}
								</Link>
							</li>
						))}
						{/* Auth logic: show avatar or login/logout */}
						{user ? (
							<li>
								<button
									onClick={logout}
									className="ml-2 px-3 py-2 rounded hover:bg-blue-700 transition-colors"
									data-testid="navbar-logout"
								>
									Logout
								</button>
							</li>
						) : (
							<>
								<li>
									<Link
										to="/login"
										className="ml-2 px-3 py-2 rounded hover:bg-blue-700 transition-colors"
										data-testid="navbar-login"
									>
										Login
									</Link>
								</li>
								<li>
									<button
										onClick={() => setShowEmailLogin(true)}
										className="ml-2 px-3 py-2 rounded bg-yellow-600 hover:bg-yellow-700 transition-colors"
										data-testid="navbar-email-login"
									>
										Login as Admin
									</button>
								</li>
							</>
						)}
					</ul>
				)}
				{/* Avatar for logged in user (desktop) */}
				{user && isDesktop && (
					<div className="ml-4">
						<img src={user.avatar || '/default-avatar.png'} alt="avatar" className="w-8 h-8 rounded-full" />
					</div>
				)}

								 {/* Email login modal for admin */}
				{showEmailLogin && (
					<EmailLoginModal
						show={showEmailLogin}
						onClose={() => { setShowEmailLogin(false); setEmailLoginError(''); setShowPassword(false); }}
						onSubmit={handleEmailLogin}
						loading={emailLoginLoading}
						error={emailLoginError}
						showPassword={showPassword}
					/>
				)}
			</div>
		</nav>
	);
}
