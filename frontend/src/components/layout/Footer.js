import React from 'react';
export default function Footer() {
	return (
		<footer className="bg-light text-center text-lg-start mt-auto py-3 border-top">
			<div className="container">
				<span className="text-muted">&copy; {new Date().getFullYear()} ChargeBnB. All rights reserved.</span>
			</div>
		</footer>
	);
}
