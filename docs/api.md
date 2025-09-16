# EVXchange API Documentation

## Getting Started

EVXchange provides a RESTful API for authentication, user management, charging station operations, bookings, payments, and reviews. All endpoints return JSON. Most endpoints require authentication via OAuth (Google, Facebook, LinkedIn). After authenticating, use the session cookie or JWT (if implemented) for subsequent requests.

### Authentication Flow
1. **Get available providers:** `GET /auth/providers`
2. **Redirect user to:** `/auth/login/<provider>`
3. **OAuth callback:** `/auth/callback/<provider>`
4. **Session established** (cookie-based auth)

**Example: Get current user info after login**
```bash
curl -b cookies.txt https://api.evxchange.com/auth/user
```

---

## Authentication Endpoints

### `GET /auth/providers`
- **Description:** List available OAuth providers and their login URLs.
- **Auth:** None
- **Response:**
```json
{
  "providers": [
    { "name": "google", "login_url": "https://.../auth/login/google" },
    { "name": "facebook", "login_url": "https://.../auth/login/facebook" }
  ]
}
```

### `GET /auth/login/<provider>`
- **Description:** Redirects to the OAuth provider's login page.
- **Auth:** None
- **Response:** Redirect
- **Errors:**
  - 400: Unsupported OAuth provider

### `GET /auth/callback/<provider>`
- **Description:** Handles OAuth callback, logs in/creates user, redirects to frontend dashboard.
- **Auth:** None
- **Response:** Redirect
- **Errors:**
  - 400: Invalid state, missing code, OAuth error
  - 500: Authentication failed

### `POST /auth/logout`
- **Description:** Log out the current user.
- **Auth:** Session required
- **Response:**
```json
{ "message": "Logged out successfully" }
```

### `GET /auth/user`
- **Description:** Get current user info.
- **Auth:** Session required
- **Response:**
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "Jane Doe",
  "profile_picture": "https://...",
  "is_verified": true
}
```

---

## User Management

### `GET /api/profile`
- **Description:** Get current user profile.
- **Auth:** Session required
- **Response:** Same as `/auth/user`

### `GET /api/dashboard`
- **Description:** Get user dashboard (bookings, payments, reviews).
- **Auth:** Session required
- **Response:**
```json
{
  "bookings": [ ... ],
  "payments": [ ... ],
  "reviews": [ ... ]
}
```

---

## Charging Stations

### `POST /api/host/stations`
- **Description:** Create a new charging station (host only).
- **Auth:** Session required
- **Request Body:**
```json
{
  "name": "Station Name",
  "lat": 37.77,
  "lng": -122.41,
  "address": "123 Main St"
}
```
- **Response:**
```json
{
  "station_id": 1,
  "host_id": 1,
  "name": "Station Name",
  "lat": 37.77,
  "lng": -122.41,
  "address": "123 Main St"
}
```
- **Errors:**
  - 400: Missing station data

### `GET /api/host/stations`
- **Description:** List all stations for the current host.
- **Auth:** Session required
- **Response:**
```json
{ "stations": [ ... ] }
```

### `PUT /api/host/stations/<station_id>`
- **Description:** Update a station (host only).
- **Auth:** Session required
- **Request Body:** (any of)
```json
{ "name": "New Name", "lat": 37.78 }
```
- **Response:** Updated station object
- **Errors:**
  - 404: Station not found

### `DELETE /api/host/stations/<station_id>`
- **Description:** Delete a station (host only).
- **Auth:** Session required
- **Response:** 204 No Content
- **Errors:**
  - 404: Station not found

### `GET /api/nearby_stations?lat=...&lng=...`
- **Description:** List nearby charging stations.
- **Auth:** None
- **Query Params:**
  - `lat` (float, required)
  - `lng` (float, required)
- **Response:**
```json
{
  "stations": [
    { "id": 1, "name": "...", "lat": 37.77, "lng": -122.41, "address": "..." }
  ]
}
```
- **Errors:**
  - 400: Invalid or missing lat/lng

### `GET /api/stations/<station_id>/availability?date=YYYY-MM-DD`
- **Description:** Get available booking slots for a station on a given date.
- **Auth:** None
- **Query Params:**
  - `date` (ISO date string, required)
- **Response:**
```json
{
  "available_slots": [
    { "start": "2025-09-14T08:00:00+00:00", "end": "2025-09-14T09:00:00+00:00" }
  ]
}
```
- **Errors:**
  - 400: Missing or invalid date

---

## Bookings

### `POST /api/bookings/`
- **Description:** Create a new booking.
- **Auth:** None (should be session, but see code)
- **Request Body:**
```json
{
  "station_id": 1,
  "user_id": 1,
  "start_time": "2025-09-14T10:00:00Z",
  "end_time": "2025-09-14T11:00:00Z"
}
```
- **Response:**
```json
{ "booking_id": 1, "status": "confirmed" }
```
- **Errors:**
  - 400: Missing booking data, invalid date
  - 409: Booking time overlaps

---

## Payments (Stripe)

### `POST /api/payments/checkout`
- **Description:** Create a Stripe checkout session for a booking.
- **Auth:** None
- **Request Body:**
```json
{
  "booking_id": 1,
  "amount": 1000,
  "currency": "usd",
  "success_url": "https://...",
  "cancel_url": "https://..."
}
```
- **Response:**
```json
{ "checkout_url": "https://checkout.stripe.com/..." }
```
- **Errors:**
  - 400: Missing or invalid data, Stripe error

### `POST /api/payments/webhook`
- **Description:** Stripe webhook handler (for Stripe use only).
- **Auth:** None
- **Request:** Stripe event payload
- **Response:**
```json
{ "status": "success" }
```
- **Errors:**
  - 400: Invalid payload or signature

---

## Reviews

### `POST /api/bookings/<booking_id>/review`
- **Description:** Add a review for a booking.
- **Auth:** Session required
- **Request Body:**
```json
{ "rating": 5, "review": "Great experience!" }
```
- **Response:**
```json
{
  "review_id": 1,
  "booking_id": 1,
  "station_id": 1,
  "user_id": 1,
  "rating": 5,
  "review": "Great experience!"
}
```
- **Errors:**
  - 400: Missing rating or review
  - 409: Review already exists

### `GET /api/stations/<station_id>/reviews`
- **Description:** List reviews for a station.
- **Auth:** None
- **Response:**
```json
{ "reviews": [ ... ] }
```

### `PUT /api/reviews/<review_id>`
- **Description:** Update a review.
- **Auth:** Session required
- **Request Body:**
```json
{ "rating": 4, "review": "Updated review." }
```
- **Response:** Updated review object
- **Errors:**
  - 404: Review not found

### `DELETE /api/reviews/<review_id>`
- **Description:** Delete a review.
- **Auth:** Session required
- **Response:** 204 No Content
- **Errors:**
  - 404: Review not found

### `GET /api/reviews/<review_id>`
- **Description:** Get a single review.
- **Auth:** None
- **Response:** Review object or 404

---

## Geolocation

### `GET /api/geolocation`
- **Description:** Get current user's geolocation (mock).
- **Auth:** Session required
- **Response:**
```json
{ "lat": 37.7749, "lng": -122.4194 }
```

---

## Health Check

### `GET /api/health`
- **Description:** API health check.
- **Auth:** None
- **Response:**
```json
{ "status": "healthy", "message": "evxchange API is running" }
```

---

## Example: Making Authenticated Requests

1. **Login via OAuth in browser, save cookies:**
2. **Use cookies for API calls:**
```bash
curl -b cookies.txt https://api.evxchange.com/api/profile
```

3. **Example: Create a booking**
```bash
curl -X POST -H "Content-Type: application/json" -b cookies.txt \
  -d '{"station_id":1,"user_id":1,"start_time":"2025-09-14T10:00:00Z","end_time":"2025-09-14T11:00:00Z"}' \
  https://api.evxchange.com/api/bookings/
```

---

## Error Codes
- 400: Bad request (missing/invalid data)
- 401: Unauthorized (login required)
- 404: Not found
- 409: Conflict (e.g., booking overlap, duplicate review)
- 500: Internal server error

---

## Notes
- All times are ISO 8601 format (UTC).
- Most endpoints require authentication via session cookie.
- For production, use HTTPS and secure cookies.
