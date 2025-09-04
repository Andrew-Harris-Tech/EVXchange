

import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


function ChangeMapCenter({ center }) {
	const map = useMap();
	useEffect(() => {
		map.setView(center);
	}, [center, map]);
	return null;
}

export default function MapView() {
	const [center, setCenter] = useState({ lat: 37.7749, lng: -122.4194 }); // Default: San Francisco
	const [search, setSearch] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [showResults, setShowResults] = useState(false);
	const [locations, setLocations] = useState([]);
	const [hasCentered, setHasCentered] = useState(false); // Track if we've centered on user
	const searchTimeout = useRef();


		// Handler for recenter button
		const recenterOnUser = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					pos => setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
				);
			}
		};

		// Haversine distance helper
		function haversine(lat1, lon1, lat2, lon2) {
			function toRad(x) { return x * Math.PI / 180; }
			const R = 6371; // km
			const dLat = toRad(lat2 - lat1);
			const dLon = toRad(lon2 - lon1);
			const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
				Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
				Math.sin(dLon/2) * Math.sin(dLon/2);
			const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
			return R * c;
		}

		// Snap to nearest public charger
		const snapToNearestCharger = () => {
			if (!locations.length) return;
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					pos => {
						const userLat = pos.coords.latitude;
						const userLng = pos.coords.longitude;
						let minDist = Infinity;
						let nearest = null;
						for (const loc of locations) {
							if (loc.Latitude && loc.Longitude) {
								const dist = haversine(userLat, userLng, loc.Latitude, loc.Longitude);
								if (dist < minDist) {
									minDist = dist;
									nearest = loc;
								}
							}
						}
						if (nearest) {
							setCenter({ lat: nearest.Latitude, lng: nearest.Longitude });
						}
					}
				);
			}
		};

	// Fetch ChargeHub locations
	useEffect(() => {
	fetch('/api/external/chargehub/locations')
			.then(res => res.json())
			.then(data => setLocations(Array.isArray(data) ? data : []))
			.catch(() => setLocations([]));
	}, []);

		// Get user location on mount and center only once
		useEffect(() => {
			if (!hasCentered && navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					pos => {
						setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
						setHasCentered(true);
					},
					() => setHasCentered(true), // On error, don't keep trying
					{ enableHighAccuracy: true }
				);
			}
		}, [hasCentered]);

	// Search for locations using Nominatim
	useEffect(() => {
		if (search.length < 3) {
			setSearchResults([]);
			return;
		}
		if (searchTimeout.current) clearTimeout(searchTimeout.current);
		searchTimeout.current = setTimeout(() => {
			fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(search)}`)
				.then(res => res.json())
				.then(data => setSearchResults(data))
				.catch(() => setSearchResults([]));
		}, 400);
		return () => clearTimeout(searchTimeout.current);
	}, [search]);

	const handleResultClick = (result) => {
		setCenter({ lat: parseFloat(result.lat), lng: parseFloat(result.lon) });
		setShowResults(false);
		setSearch("");
		setSearchResults([]);
	};

		return (
			<div style={{ height: '100%', width: '100%', position: 'relative' }}>
				<div style={{ position: 'absolute', zIndex: 1000, top: 10, left: 10, right: 10, display: 'flex', gap: 8 }}>
						<input
							type="text"
							value={search}
							onChange={e => { setSearch(e.target.value); setShowResults(true); }}
							placeholder="Search for a location..."
							style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
						/>
								<button
									onClick={recenterOnUser}
									style={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #007bff', background: '#007bff', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
									title="Recenter map on your location"
								>
									📍 My Location
								</button>
								<button
									onClick={snapToNearestCharger}
									style={{ padding: '8px 12px', borderRadius: 4, border: '1px solid #28a745', background: '#28a745', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
									title="Snap to nearest public charger"
									data-testid="snap-nearest-btn"
								>
									⚡ Nearest Charger
								</button>
				{showResults && searchResults.length > 0 && (
					<ul style={{ background: '#fff', listStyle: 'none', margin: 0, padding: 0, border: '1px solid #ccc', borderTop: 'none', maxHeight: 200, overflowY: 'auto' }}>
						{searchResults.map(result => (
							<li
								key={result.place_id}
								onClick={() => handleResultClick(result)}
								style={{ padding: 8, cursor: 'pointer', borderBottom: '1px solid #eee' }}
							>
								{result.display_name}
							</li>
						))}
					</ul>
				)}
			</div>
			<MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
				<TileLayer
					attribution='&copy; OpenStreetMap contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<ChangeMapCenter center={center} />
				{locations.map(loc =>
					(loc.Latitude && loc.Longitude) ? (
						<Marker key={loc.LocID} position={[loc.Latitude, loc.Longitude]}>
							<Popup>
								<strong>{loc.LocName}</strong><br/>
								{loc.StreetAddress}<br/>
								{loc.City}, {loc.State} {loc.Zip}<br/>
								{loc.AccessHours && <span>Hours: {loc.AccessHours}<br/></span>}
								{loc.LocScore !== null && <span>Score: {loc.LocScore}/5<br/></span>}
								{loc.Phone && <span>Phone: {loc.Phone}<br/></span>}
								{loc.Website && <a href={loc.Website} target="_blank" rel="noopener noreferrer">Website</a>}
							</Popup>
						</Marker>
					) : null
				)}
			</MapContainer>
		</div>
	);
}
