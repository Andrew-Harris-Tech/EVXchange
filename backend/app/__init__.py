import os
from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from flask_cors import CORS
from flask_migrate import Migrate
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize extensions

db = SQLAlchemy()
login_manager = LoginManager()
migrate = Migrate()

def create_app(config_name='development'):
    """Application factory pattern"""
    # Serve React build as static in production
    react_build_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../frontend/build'))
    app = Flask(__name__, static_folder=react_build_dir, static_url_path='/')
    
    # Configuration
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY', 'dev-secret-key')
    # Force SQLite for tests
    if 'test' in config_name.lower():
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL', 'sqlite:///chargebnb.db')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    # OAuth Configuration
    app.config['GOOGLE_CLIENT_ID'] = os.getenv('GOOGLE_CLIENT_ID')
    app.config['GOOGLE_CLIENT_SECRET'] = os.getenv('GOOGLE_CLIENT_SECRET')
    app.config['FACEBOOK_APP_ID'] = os.getenv('FACEBOOK_APP_ID')
    app.config['FACEBOOK_APP_SECRET'] = os.getenv('FACEBOOK_APP_SECRET')
    app.config['LINKEDIN_CLIENT_ID'] = os.getenv('LINKEDIN_CLIENT_ID')
    app.config['LINKEDIN_CLIENT_SECRET'] = os.getenv('LINKEDIN_CLIENT_SECRET')
    
    # Initialize extensions with app

    db.init_app(app)
    login_manager.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Configure Flask-Login
    login_manager.login_view = 'auth.login'
    login_manager.login_message = 'Please log in to access this page.'
    

    @login_manager.user_loader
    def load_user(user_id):
        from models.user import User
        return User.query.get(int(user_id))

    # Custom unauthorized handler: 401 for API/JSON, else redirect
    @login_manager.unauthorized_handler
    def unauthorized():
        from flask import request, jsonify, redirect, url_for
        if request.accept_mimetypes.accept_json or request.path.startswith('/api/'):
            return jsonify({"error": "Authentication required", "providers": ["google", "facebook", "linkedin"]}), 401
        return redirect(url_for(login_manager.login_view))
    
    # Register blueprints
    from backend.routes.auth import auth_bp
    from backend.routes.api import api_bp
    
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(api_bp, url_prefix='/api')


    # Serve React index.html for all non-API routes
    from flask import send_from_directory

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_react(path):
        if path.startswith('api') or path.startswith('auth'):
            return "Not Found", 404
        if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
            return send_from_directory(app.static_folder, path)
        else:
            return send_from_directory(app.static_folder, 'index.html')

    return app
