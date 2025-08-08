# Stripe Payment Integration

## Overview
This document explains how Stripe payments are integrated into ChargeBnB, including backend setup, environment variables, and test/development tips.

## Environment Variables
- `STRIPE_SECRET_KEY`: Your Stripe secret API key
- `STRIPE_WEBHOOK_SECRET`: Webhook signing secret

## Backend Endpoints
- `POST /api/payments/checkout` — Create a Stripe Checkout session
- `POST /api/payments/webhook` — Stripe webhook handler

## Setup Steps
1. Set your Stripe keys in your environment or `.env` file.
2. Ensure the backend has network access to Stripe.
3. For local development, use the Stripe CLI to forward webhooks.

## Testing
- Use Stripe test keys and cards for development.
- See `backend/tests/test_payments.py` for example tests.

## Notes
- All payment logic is handled server-side for security.
- See Stripe docs for PCI compliance and production setup.
