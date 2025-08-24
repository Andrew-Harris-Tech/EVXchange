# Ratings & Reviews Implementation

**[Back to Project Wiki](PROJECT_WIKI.md)** | [Booking](BOOKING_IMPLEMENTATION.md) | [OAuth](OAUTH_IMPLEMENTATION.md) | [Stripe](STRIPE_IMPLEMENTATION.md)

## Overview
This document covers the ratings and review system for completed bookings in ChargeBnB.

## Backend Endpoints
- `POST /api/bookings/<booking_id>/review` — Add a review for a completed booking
- `GET /api/stations/<station_id>/reviews` — List all reviews for a station
- `PUT /api/reviews/<review_id>` — Update a review
- `DELETE /api/reviews/<review_id>` — Delete a review

## Review Logic
- Only users with completed bookings can review.
- One review per booking per user.
- Reviews include a rating (1-5) and text.

## Testing
- See `backend/tests/test_reviews.py` for test cases.
- Tests cover add, update, delete, and fetch scenarios.

## Notes
- Reviews are in-memory for development; use persistent storage for production.
