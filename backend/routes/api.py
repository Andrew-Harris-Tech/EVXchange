from flask import Blueprint, jsonify
from flask_login import login_required, current_user

api_bp = Blueprint("api", __name__)


@api_bp.route("/health")
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "message": "ChargeBnB API is running"})


@api_bp.route("/profile")
@login_required
def get_profile():
    """Get current user profile"""
    return jsonify(current_user.to_dict())
