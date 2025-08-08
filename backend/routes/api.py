import os
import stripe


from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

api_bp = Blueprint('api', __name__)

from datetime import datetime, timezone
bookings_db = []  # In-memory mock for bookings

# --- Booking Endpoints ---
@api_bp.route('/bookings/', methods=['POST'])
def create_booking():
    data = request.get_json() or {}
    required = ["station_id", "user_id", "start_time", "end_time"]
    if not all(k in data for k in required):
        return jsonify({"error": "Missing booking data"}), 400
    try:
        start = datetime.fromisoformat(data["start_time"].replace("Z", "+00:00"))
        end = datetime.fromisoformat(data["end_time"].replace("Z", "+00:00"))
    except Exception:
        return jsonify({"error": "Invalid date format"}), 400
    # Check for overlap
    for b in bookings_db:
        if b["station_id"] == data["station_id"] and not (end <= b["start_time"] or start >= b["end_time"]):
            return jsonify({"error": "Booking time overlaps with existing booking"}), 409
    booking_id = len(bookings_db) + 1
    booking = {
        "booking_id": booking_id,
        "station_id": data["station_id"],
        "user_id": data["user_id"],
        "start_time": start,
        "end_time": end,
        "status": "confirmed"
    }
    bookings_db.append(booking)
    return jsonify({"booking_id": booking_id, "status": "confirmed"}), 201

@api_bp.route('/stations/<int:station_id>/availability')
def station_availability(station_id):
    date_str = request.args.get("date")
    if not date_str:
        return jsonify({"error": "Missing date parameter"}), 400
    try:
        date = datetime.fromisoformat(date_str)
    except Exception:
        return jsonify({"error": "Invalid date format"}), 400
    # Mock: 8am-8pm, 1hr slots, remove slots with bookings
    slots = [
        (date.replace(hour=h, minute=0, second=0, microsecond=0, tzinfo=timezone.utc),
         date.replace(hour=h+1, minute=0, second=0, microsecond=0, tzinfo=timezone.utc))
        for h in range(8, 20)
    ]
    available = []
    for start, end in slots:
        overlap = False
        for b in bookings_db:
            if b["station_id"] == station_id and not (end <= b["start_time"] or start >= b["end_time"]):
                overlap = True
                break
        if not overlap:
            available.append({"start": start.isoformat(), "end": end.isoformat()})
    return jsonify({"available_slots": available})

@api_bp.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'message': 'ChargeBnB API is running'})

@api_bp.route('/profile')
@login_required
def get_profile():
    """Get current user profile"""
    return jsonify(current_user.to_dict())


# --- New endpoint: Nearby Charging Stations ---
@api_bp.route('/nearby_stations')
def nearby_stations():
    """Return a list of nearby charging stations for given lat/lng (mock data)"""
    lat = request.args.get('lat')
    lng = request.args.get('lng')
    try:
        if lat is None or lng is None:
            raise ValueError("Missing lat/lng parameters")
        lat = float(lat)
        lng = float(lng)
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid or missing lat/lng parameters"}), 400

    # Mock data for demonstration
    stations = [
        {
            "id": 1,
            "name": "ChargeBnB Station Downtown",
            "lat": lat + 0.001,
            "lng": lng + 0.001,
            "address": "123 Main St, Cityville"
        },
        {
            "id": 2,
            "name": "ChargeBnB Station Uptown",
            "lat": lat - 0.001,
            "lng": lng - 0.001,
            "address": "456 Oak Ave, Cityville"
        }
    ]
    return jsonify({"stations": stations})

# --- Stripe Payment Endpoints ---
@api_bp.route('/payments/checkout', methods=['POST'])
def create_checkout_session():
    data = request.get_json() or {}
    required = ["booking_id", "amount", "currency", "success_url", "cancel_url"]
    if not all(k in data for k in required):
        return jsonify({"error": "Missing or invalid data"}), 400
    # In real use, set your Stripe secret key from env
    stripe.api_key = os.getenv("STRIPE_SECRET_KEY", "sk_test_dummy")
    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": data["currency"],
                    "product_data": {"name": f"Booking {data['booking_id']}"},
                    "unit_amount": data["amount"]
                },
                "quantity": 1
            }],
            mode="payment",
            success_url=data["success_url"],
            cancel_url=data["cancel_url"]
        )
        return jsonify({"checkout_url": session.url})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@api_bp.route('/payments/webhook', methods=['POST'])
def stripe_webhook():
    payload = request.data
    sig_header = request.headers.get('Stripe-Signature', '')
    endpoint_secret = os.getenv("STRIPE_WEBHOOK_SECRET", "whsec_dummy")
    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    # Handle event type
    if event["type"] == "checkout.session.completed":
        # Here you would update booking/payment status
        return jsonify({"status": "success"})
    return jsonify({"status": "ignored"})