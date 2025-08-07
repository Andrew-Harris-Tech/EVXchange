# ChargeBnB Routes Module
# Contains Flask route definitions and request handlers

from .auth import auth_bp
from .api import api_bp

__all__ = ["auth_bp", "api_bp"]
