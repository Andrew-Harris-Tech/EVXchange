

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { NAV_LINKS } from './navLinks';


export default function Navbar({ onHamburgerClick }) {
	const location = useLocation();
	const { user, logout } = useAuth();

	// Only show these entries in the Navbar
	const navbarLinks = NAV_LINKS.filter(
		l => l.showInNavbar && (!l.requiresAuth || user)
	).filter(l => !(l.authAction === 'login' && user));

	return (
		<nav className="fixed top-0 left-0 w-full z-30 bg-primary text-white shadow">
			<div className="flex items-center justify-between px-4 py-3 md:px-8">
				<Link className="font-bold text-xl" to="/">evxchange</Link>
				<div className="md:hidden">
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
				</div>
				<ul className="hidden md:flex space-x-6 items-center">
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
						<li>
							<Link
								to="/login"
								className="ml-2 px-3 py-2 rounded hover:bg-blue-700 transition-colors"
								data-testid="navbar-login"
							>
								Login
							</Link>
						</li>
					)}
				</ul>
				{/* Avatar for logged in user (mobile) */}
				{user && (
					<div className="hidden md:block ml-4">
						<img src={user.avatar || '/default-avatar.png'} alt="avatar" className="w-8 h-8 rounded-full" />
					</div>
				)}
			</div>
		</nav>
	);
}
