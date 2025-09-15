

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { NAV_LINKS } from './navLinks';


function Sidebar({ open, onClose }) {
  const location = useLocation();
  const { user, logout } = useAuth();
  // Group host actions for collapsible submenu
  const hostLinks = NAV_LINKS.filter(l => [
    '/host',
    '/host/add',
  ].includes(l.to) && (!l.requiresAuth || user));
  const sidebarLinks = NAV_LINKS.filter(l => l.showInSidebar && (!l.requiresAuth || user) && ![
    '/host',
    '/host/add',
  ].includes(l.to)).filter(l => !(l.authAction === 'login' && user));
  const [hostOpen, setHostOpen] = useState(false);
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
							{/* Collapsible Host Actions */}
							{hostLinks.length > 0 && (
								<li>
									<button
										className="w-full flex items-center justify-between px-6 py-3 rounded hover:bg-blue-100 transition-colors text-gray-800 font-semibold"
										onClick={() => setHostOpen(v => !v)}
										aria-expanded={hostOpen}
										aria-controls="host-submenu"
									>
										Host Actions
										<span className={`ml-2 transition-transform ${hostOpen ? 'rotate-90' : ''}`}>▶</span>
									</button>
									<ul
										id="host-submenu"
										className={`pl-4 mt-1 space-y-1 overflow-hidden transition-all duration-300 ${hostOpen ? 'max-h-40' : 'max-h-0'} ${hostOpen ? 'opacity-100' : 'opacity-0'}`}
										style={{ transitionProperty: 'max-height, opacity' }}
									>
										{hostLinks.map(link => (
											<li key={link.to}>
												<Link
													to={link.to}
													className={`block px-4 py-2 rounded hover:bg-blue-50 transition-colors text-gray-800 ${location.pathname === link.to ? 'bg-blue-200 font-semibold text-blue-900' : ''}`}
													onClick={onClose}
													data-testid={`sidebar-link-${link.label.toLowerCase().replace(/ /g, '-')}`}
												>
													{link.label}
												</Link>
											</li>
										))}
									</ul>
								</li>
							)}
						</ul>
					</nav>
				</div>
			</aside>
		</>
		);
	}

	export default Sidebar;
