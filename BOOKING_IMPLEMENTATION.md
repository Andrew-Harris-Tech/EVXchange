# Booking & Availability Implementation

## Overview
This document describes the booking and availability logic for ChargeBnB, including API endpoints, data flow, and test coverage.

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
