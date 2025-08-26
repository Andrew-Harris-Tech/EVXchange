# Booking & Availability Implementation

**[Back to Project Wiki](PROJECT_WIKI.md)** | [Reviews](REVIEWS_IMPLEMENTATION.md) | [OAuth](OAUTH_IMPLEMENTATION.md) | [Stripe](STRIPE_IMPLEMENTATION.md)

## Overview
This document describes the booking and availability logic for evxchange, including API endpoints, data flow, and test coverage.

## Backend Endpoints
- `POST /api/bookings/` — Create a new booking
- `GET /api/stations/<station_id>/availability` — Get available time slots for a station

## Booking Logic
- Prevents overlapping bookings for the same station.
- All times are handled in UTC (ISO 8601 format).
- Bookings are confirmed if no conflicts are found.

## Testing
- See `backend/tests/test_booking.py` for unit tests.
- Edge cases: overlapping times, invalid dates, missing fields.

## Notes
- Booking data is currently in-memory for development; migrate to DB for production.
- Timezone handling is critical for cross-region users.
