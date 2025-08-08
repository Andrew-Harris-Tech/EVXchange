from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user

api_bp = Blueprint('api', __name__)

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
