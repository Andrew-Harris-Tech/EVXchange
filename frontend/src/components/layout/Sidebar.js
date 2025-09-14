
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { navLinks } from './Navbar';

export default function Sidebar({ open, onClose }) {
	const location = useLocation();

	return (
		<>
			{/* Overlay for mobile */}
			<div
				data-testid="sidebar-overlay"
				className={`fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 md:hidden ${open ? 'block' : 'hidden'}`}
				onClick={onClose}
				aria-label="Close sidebar overlay"
			/>
			{/* Sidebar */}
			<aside
				className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300
					${open ? 'translate-x-0' : '-translate-x-full'}
					md:relative md:translate-x-0 md:shadow-none md:bg-white md:block md:w-56 md:z-0`}
				aria-label="Sidebar navigation"
			>
				<div className="flex flex-col h-full pt-20 md:pt-8">
					<nav className="flex-1">
						<ul className="space-y-2">
							{navLinks.map(link => (
								<li key={link.to}>
									<Link
										to={link.to}
										className={`block px-6 py-3 rounded hover:bg-blue-100 transition-colors text-gray-800
											${location.pathname === link.to ? 'bg-blue-200 font-semibold text-blue-900' : ''}`}
										onClick={onClose}
										data-testid={`sidebar-link-${link.label.toLowerCase().replace(/ /g, '-')}`}
									>
										{link.label}
									</Link>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</aside>
		</>
	);
}
