import os
import stripe
from flask import Blueprint, jsonify, request, g
from flask_login import login_required, current_user
import logging
api_bp = Blueprint('api', __name__)

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)
# --- User Dashboard Endpoint (Mock) ---
@api_bp.route('/dashboard')
@login_required
def user_dashboard():
    user_id = current_user.id
    # Mock bookings for this user
    user_bookings = [
        b for b in bookings_db if b["user_id"] == user_id
    ]
    # Mock payments for this user (simulate one per booking)
    user_payments = [
        {
            "payment_id": b["booking_id"],
            "booking_id": b["booking_id"],
            "amount": 1000,
            "currency": "usd",
            "status": "paid"
        }
        for b in user_bookings
    ]
    # Mock reviews for this user
    user_reviews = [
        r for r in reviews_db if r["user_id"] == user_id
    ]
    return jsonify({
        "bookings": user_bookings,
        "payments": user_payments,
        "reviews": user_reviews
    })

# In-memory mock for stations (per host)
stations_db = []
station_id_counter = [1]

# --- Host Station Management Endpoints ---
@api_bp.route('/host/stations', methods=['POST'])
@login_required
def create_station():
    data = request.get_json() or {}
    required = ["name", "lat", "lng", "address"]
    if not all(k in data for k in required):
        return jsonify({"error": "Missing station data"}), 400
    sid = station_id_counter[0]
    station_id_counter[0] += 1
    station = {
        "station_id": sid,
        "host_id": current_user.id if hasattr(current_user, 'id') else 1,
        "name": data["name"],
        "lat": data["lat"],
        "lng": data["lng"],
        "address": data["address"]
    }
    stations_db.append(station)
    return jsonify(station), 201

@api_bp.route('/host/stations', methods=['GET'])
@login_required
def list_host_stations():
    host_id = current_user.id if hasattr(current_user, 'id') else 1
    host_stations = [s for s in stations_db if s["host_id"] == host_id]
    return jsonify({"stations": host_stations})

@api_bp.route('/host/stations/<int:station_id>', methods=['PUT'])
@login_required
def update_station(station_id):
    host_id = current_user.id if hasattr(current_user, 'id') else 1
    station = next((s for s in stations_db if s["station_id"] == station_id and s["host_id"] == host_id), None)
    if not station:
        return jsonify({"error": "Station not found"}), 404
    data = request.get_json() or {}
    for k in ["name", "lat", "lng", "address"]:
        if k in data:
            station[k] = data[k]
    return jsonify(station)

@api_bp.route('/host/stations/<int:station_id>', methods=['DELETE'])
@login_required
def delete_station(station_id):
    host_id = current_user.id if hasattr(current_user, 'id') else 1
    idx = next((i for i, s in enumerate(stations_db) if s["station_id"] == station_id and s["host_id"] == host_id), None)
    if idx is None:
        return jsonify({"error": "Station not found"}), 404
    stations_db.pop(idx)
    return '', 204

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
    return jsonify({'status': 'healthy', 'message': 'evxchange API is running'})

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
            "name": "evxchange Station Downtown",
            "lat": lat + 0.001,
            "lng": lng + 0.001,
            "address": "123 Main St, Cityville"
        },
        {
            "id": 2,
            "name": "evxchange Station Uptown",
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
        logger.exception("Error while processing Stripe webhook event.")
        return jsonify({"error": "Invalid payload or signature"}), 400
    # Handle event type
    if event["type"] == "checkout.session.completed":
        # Here you would update booking/payment status
        return jsonify({"status": "success"})
    return jsonify({"status": "ignored"})

# --- Ratings and Reviews (In-memory mock) ---
reviews_db = []
review_id_counter = [1]

@api_bp.route('/bookings/<int:booking_id>/review', methods=['POST'])
@login_required
def add_review(booking_id):
    data = request.get_json() or {}
    if "rating" not in data or "review" not in data:
        return jsonify({"error": "Missing rating or review"}), 400
    # For test: allow any booking_id, but only one review per booking/user
    existing = next((r for r in reviews_db if r["booking_id"] == booking_id and r["user_id"] == current_user.id), None)
    if existing:
        return jsonify({"error": "Review already exists"}), 409
    rid = review_id_counter[0]
    review_id_counter[0] += 1
    review = {
        "review_id": rid,
        "booking_id": booking_id,
        "station_id": 1,  # For mock, always station 1
        "user_id": current_user.id,
        "rating": data["rating"],
        "review": data["review"]
    }
    reviews_db.append(review)
    return jsonify(review), 201

@api_bp.route('/stations/<int:station_id>/reviews', methods=['GET'])
def get_reviews_for_station(station_id):
    station_reviews = [r for r in reviews_db if r["station_id"] == station_id]
    return jsonify({"reviews": station_reviews})

@api_bp.route('/reviews/<int:review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    review = next((r for r in reviews_db if r["review_id"] == review_id and r["user_id"] == current_user.id), None)
    if not review:
        return jsonify({"error": "Review not found"}), 404
    data = request.get_json() or {}
    if "rating" in data:
        review["rating"] = data["rating"]
    if "review" in data:
        review["review"] = data["review"]
    return jsonify(review)

@api_bp.route('/reviews/<int:review_id>', methods=['DELETE'])
@login_required
def delete_review(review_id):
    idx = next((i for i, r in enumerate(reviews_db) if r["review_id"] == review_id and r["user_id"] == current_user.id), None)
    if idx is None:
        return jsonify({"error": "Review not found"}), 404
    reviews_db.pop(idx)
    return '', 204

@api_bp.route('/reviews/<int:review_id>', methods=['GET'])
def get_review(review_id):
    review = next((r for r in reviews_db if r["review_id"] == review_id), None)
    if not review:
        return jsonify({"error": "Review not found"}), 404
    return jsonify(review)

# --- Geolocation Endpoint (Mock) ---
@api_bp.route('/geolocation')
@login_required
def get_user_geolocation():
    # In a real app, use IP or device info; here, return a fixed mock location
    return jsonify({"lat": 37.7749, "lng": -122.4194})