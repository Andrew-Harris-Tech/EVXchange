

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { NAV_LINKS } from './navLinks';

export default function Sidebar({ open, onClose }) {
	const location = useLocation();
	const { user, logout } = useAuth();
	// Only show sidebar entries that are allowed for the user
	const sidebarLinks = NAV_LINKS.filter(l => l.showInSidebar && (!l.requiresAuth || user)).filter(l => !(l.authAction === 'login' && user));
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
					{/* User profile details */}
					{user && (
						<div className="flex flex-col items-center mb-6">
							<img src={user.avatar || '/default-avatar.png'} alt="avatar" className="w-16 h-16 rounded-full mb-2" />
							<span className="font-semibold text-lg">{user.name || 'User'}</span>
							<span className="text-xs text-gray-500">{user.email}</span>
						</div>
					)}
					<nav className="flex-1">
						<ul className="space-y-2">
							{sidebarLinks.map(link => (
								<li key={link.to}>
									{link.authAction === 'logout' ? (
										<button
											onClick={() => { logout(); onClose && onClose(); }}
											className={`w-full text-left px-6 py-3 rounded hover:bg-blue-100 transition-colors text-gray-800 ${location.pathname === link.to ? 'bg-blue-200 font-semibold text-blue-900' : ''}`}
											data-testid={`sidebar-link-logout`}
										>
											{link.label}
										</button>
									) : (
										<Link
											to={link.to}
											className={`block px-6 py-3 rounded hover:bg-blue-100 transition-colors text-gray-800 ${location.pathname === link.to ? 'bg-blue-200 font-semibold text-blue-900' : ''}`}
											onClick={onClose}
											data-testid={`sidebar-link-${link.label.toLowerCase().replace(/ /g, '-')}`}
										>
											{link.label}
										</Link>
									)}
								</li>
							))}
						</ul>
					</nav>
				</div>
			</aside>
		</>
	);
}
