
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const navLinks = [
	{ label: 'Home', to: '/' },
	{ label: 'Stations', to: '/map' },
	{ label: 'Bookings', to: '/booking' },
	{ label: 'Host Dashboard', to: '/host' },
	{ label: 'Profile', to: '/dashboard' },
];

export default function Navbar({ onHamburgerClick }) {
	const location = useLocation();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	const handleHamburger = () => {
		setMobileMenuOpen(!mobileMenuOpen);
		if (onHamburgerClick) onHamburgerClick();
	};

	return (
		<nav className="fixed top-0 left-0 w-full z-30 bg-primary text-white shadow">
			<div className="flex items-center justify-between px-4 py-3 md:px-8">
				<Link className="font-bold text-xl" to="/">evxchange</Link>
				<div className="md:hidden">
					<button
						className="focus:outline-none"
						aria-label="Open sidebar menu"
						onClick={handleHamburger}
						data-testid="navbar-hamburger"
					>
						<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
						</svg>
					</button>
				</div>
				<ul className="hidden md:flex space-x-6">
					{navLinks.map(link => (
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
				</ul>
			</div>
		</nav>
	);
}
