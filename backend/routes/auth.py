import os
import secrets
from flask import Blueprint, request, redirect, url_for, session, jsonify, current_app
from flask_login import login_user, logout_user, login_required, current_user
from models.user import User
from services.oauth import OAuthService
from backend.app import db


auth_bp = Blueprint('auth', __name__)
oauth_service = OAuthService()

# Provider-less login route for Flask-Login redirects
@auth_bp.route('/login')
def login():
    """Generic login route for Flask-Login redirects (no provider required)."""
    # If you have a login page, render it here. For API, return JSON error.
    if request.accept_mimetypes.accept_json:
        return jsonify({"error": "Authentication required", "providers": ["google", "facebook", "linkedin"]}), 401
    return "<h1>Authentication required</h1><p>Please login with one of the supported OAuth providers.</p>", 401

@auth_bp.record
def record_auth(setup_state):
    """Initialize OAuth service when blueprint is registered"""
    oauth_service.init_app(setup_state.app)

@auth_bp.route('/login/<provider>')
def oauth_login(provider):
    """Initiate OAuth login for the specified provider"""
    oauth_provider = oauth_service.get_provider(provider)
    if not oauth_provider:
        return jsonify({'error': 'Unsupported OAuth provider'}), 400
    
    # Generate state for CSRF protection
    state = secrets.token_urlsafe(32)
    session['oauth_state'] = state
    session['oauth_provider'] = provider
    
    # Build redirect URI
    redirect_uri = url_for('auth.oauth_callback', provider=provider, _external=True)
    
    # Get authorization URL
    auth_url = oauth_provider.get_authorization_url(redirect_uri, state)
    
    return redirect(auth_url)

@auth_bp.route('/callback/<provider>')
def oauth_callback(provider):
    """Handle OAuth callback"""
    oauth_provider = oauth_service.get_provider(provider)
    if not oauth_provider:
        return jsonify({'error': 'Unsupported OAuth provider'}), 400
    
    # Verify state for CSRF protection
    state = request.args.get('state')
    if not state or state != session.get('oauth_state'):
        return jsonify({'error': 'Invalid state parameter'}), 400
    
    if request.args.get('error'):
        return jsonify({'error': f'OAuth error: {request.args.get("error")}'}), 400
    
    code = request.args.get('code')
    if not code:
        return jsonify({'error': 'Authorization code not provided'}), 400
    
    try:
        # Exchange code for access token
        redirect_uri = url_for('auth.oauth_callback', provider=provider, _external=True)
        token_data = oauth_provider.get_access_token(code, redirect_uri)
        access_token = token_data.get('access_token')
        
        if not access_token:
            return jsonify({'error': 'Failed to obtain access token'}), 400
        
        # Get user info
        user_info = oauth_provider.get_user_info(access_token)
        
        # Find or create user
        user = User.find_by_oauth_id(provider, user_info['id'])
        
        if user:
            # Update existing user info
            user.name = user_info.get('name', user.name)
            user.profile_picture = user_info.get('picture', user.profile_picture)
            if user_info.get('verified_email'):
                user.is_verified = True
        else:
            # Check if user exists with same email
            existing_user = User.query.filter_by(email=user_info.get('email')).first()
            if existing_user:
                # Link OAuth account to existing user
                existing_user.set_oauth_id(provider, user_info['id'])
                existing_user.name = user_info.get('name', existing_user.name)
                existing_user.profile_picture = user_info.get('picture', existing_user.profile_picture)
                if user_info.get('verified_email'):
                    existing_user.is_verified = True
                user = existing_user
            else:
                # Create new user
                user = User(
                    email=user_info.get('email'),
                    name=user_info.get('name', ''),
                    profile_picture=user_info.get('picture'),
                    is_verified=user_info.get('verified_email', False)
                )
                user.set_oauth_id(provider, user_info['id'])
                db.session.add(user)
        
        db.session.commit()
        
        # Log in user
        login_user(user)
        
        # Clean up session
        session.pop('oauth_state', None)
        session.pop('oauth_provider', None)
        
        # Redirect to frontend or return success
        frontend_url = os.getenv('FRONTEND_URL', 'http://localhost:3000')
        return redirect(f'{frontend_url}/dashboard')
        
    except Exception as e:
        current_app.logger.error(f'OAuth callback error: {str(e)}')
        return jsonify({'error': 'Authentication failed'}), 500

@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    """Log out the current user"""
    logout_user()
    return jsonify({'message': 'Logged out successfully'})

@auth_bp.route('/user')
@login_required
def get_current_user():
    """Get current user information"""
    return jsonify(current_user.to_dict())

@auth_bp.route('/providers')
def get_oauth_providers():
    """Get available OAuth providers"""
    providers = oauth_service.get_available_providers()
    provider_info = []
    
    for provider in providers:
        provider_info.append({
            'name': provider,
            'login_url': url_for('auth.oauth_login', provider=provider, _external=True)
        })
    
    return jsonify({'providers': provider_info})
