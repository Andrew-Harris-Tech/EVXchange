import os
import requests
from abc import ABC, abstractmethod
from urllib.parse import urlencode
from authlib.integrations.flask_client import OAuth
from flask import current_app, url_for


class OAuthProvider(ABC):
    """Abstract base class for OAuth providers"""

    def __init__(self, name, client_id, client_secret):
        self.name = name
        self.client_id = client_id
        self.client_secret = client_secret

    @abstractmethod
    def get_authorization_url(self, redirect_uri, state=None):
        """Get OAuth authorization URL"""
        pass

    @abstractmethod
    def get_access_token(self, code, redirect_uri):
        """Exchange authorization code for access token"""
        pass

    @abstractmethod
    def get_user_info(self, access_token):
        """Get user information using access token"""
        pass


class GoogleOAuthProvider(OAuthProvider):
    """Google OAuth 2.0 provider implementation"""

    AUTHORIZATION_URL = "https://accounts.google.com/o/oauth2/v2/auth"
    TOKEN_URL = "https://oauth2.googleapis.com/token"
    USER_INFO_URL = "https://www.googleapis.com/oauth2/v2/userinfo"

    def __init__(self, client_id, client_secret):
        super().__init__("google", client_id, client_secret)

    def get_authorization_url(self, redirect_uri, state=None):
        """Generate Google OAuth authorization URL"""
        params = {
            "client_id": self.client_id,
            "response_type": "code",
            "scope": "openid email profile",
            "redirect_uri": redirect_uri,
            "access_type": "offline",
        }
        if state:
            params["state"] = state

        return f"{self.AUTHORIZATION_URL}?{urlencode(params)}"

    def get_access_token(self, code, redirect_uri):
        """Exchange authorization code for access token"""
        data = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "code": code,
            "grant_type": "authorization_code",
            "redirect_uri": redirect_uri,
        }

        response = requests.post(self.TOKEN_URL, data=data)
        response.raise_for_status()
        return response.json()

    def get_user_info(self, access_token):
        """Get user information from Google"""
        headers = {"Authorization": f"Bearer {access_token}"}
        response = requests.get(self.USER_INFO_URL, headers=headers)
        response.raise_for_status()

        user_data = response.json()
        return {
            "id": user_data.get("id"),
            "email": user_data.get("email"),
            "name": user_data.get("name"),
            "picture": user_data.get("picture"),
            "verified_email": user_data.get("verified_email", False),
        }


class FacebookOAuthProvider(OAuthProvider):
    """Facebook OAuth 2.0 provider implementation"""

    AUTHORIZATION_URL = "https://www.facebook.com/v18.0/dialog/oauth"
    TOKEN_URL = "https://graph.facebook.com/v18.0/oauth/access_token"
    USER_INFO_URL = "https://graph.facebook.com/v18.0/me"

    def __init__(self, app_id, app_secret):
        super().__init__("facebook", app_id, app_secret)

    def get_authorization_url(self, redirect_uri, state=None):
        """Generate Facebook OAuth authorization URL"""
        params = {
            "client_id": self.client_id,
            "response_type": "code",
            "scope": "email,public_profile",
            "redirect_uri": redirect_uri,
        }
        if state:
            params["state"] = state

        return f"{self.AUTHORIZATION_URL}?{urlencode(params)}"

    def get_access_token(self, code, redirect_uri):
        """Exchange authorization code for access token"""
        params = {
            "client_id": self.client_id,
            "client_secret": self.client_secret,
            "code": code,
            "redirect_uri": redirect_uri,
        }

        response = requests.get(self.TOKEN_URL, params=params)
        response.raise_for_status()
        return response.json()

    def get_user_info(self, access_token):
        """Get user information from Facebook"""
        params = {"access_token": access_token, "fields": "id,name,email,picture"}

        response = requests.get(self.USER_INFO_URL, params=params)
        response.raise_for_status()

        user_data = response.json()
        return {
            "id": user_data.get("id"),
            "email": user_data.get("email"),
            "name": user_data.get("name"),
            "picture": user_data.get("picture", {}).get("data", {}).get("url"),
            "verified_email": True,  # Facebook emails are considered verified
        }


class LinkedInOAuthProvider(OAuthProvider):
    """LinkedIn OAuth 2.0 provider implementation"""

    AUTHORIZATION_URL = "https://www.linkedin.com/oauth/v2/authorization"
    TOKEN_URL = "https://www.linkedin.com/oauth/v2/accessToken"
    USER_INFO_URL = "https://api.linkedin.com/v2/people/~"
    EMAIL_URL = "https://api.linkedin.com/v2/emailAddresses"

    def __init__(self, client_id, client_secret):
        super().__init__("linkedin", client_id, client_secret)

    def get_authorization_url(self, redirect_uri, state=None):
        """Generate LinkedIn OAuth authorization URL"""
        params = {
            "response_type": "code",
            "client_id": self.client_id,
            "redirect_uri": redirect_uri,
            "scope": "r_liteprofile r_emailaddress",
        }
        if state:
            params["state"] = state

        return f"{self.AUTHORIZATION_URL}?{urlencode(params)}"

    def get_access_token(self, code, redirect_uri):
        """Exchange authorization code for access token"""
        data = {
            "grant_type": "authorization_code",
            "code": code,
            "redirect_uri": redirect_uri,
            "client_id": self.client_id,
            "client_secret": self.client_secret,
        }

        headers = {"Content-Type": "application/x-www-form-urlencoded"}
        response = requests.post(self.TOKEN_URL, data=data, headers=headers)
        response.raise_for_status()
        return response.json()

    def get_user_info(self, access_token):
        """Get user information from LinkedIn"""
        headers = {"Authorization": f"Bearer {access_token}"}

        # Get profile info
        profile_params = {
            "projection": "(id,firstName,lastName,profilePicture(displayImage~:playableStreams))"
        }
        profile_response = requests.get(
            self.USER_INFO_URL, headers=headers, params=profile_params
        )
        profile_response.raise_for_status()
        profile_data = profile_response.json()

        # Get email
        email_params = {"q": "members", "projection": "(elements*(handle~))"}
        email_response = requests.get(
            self.EMAIL_URL, headers=headers, params=email_params
        )
        email_response.raise_for_status()
        email_data = email_response.json()

        # Extract data
        first_name = (
            profile_data.get("firstName", {}).get("localized", {}).get("en_US", "")
        )
        last_name = (
            profile_data.get("lastName", {}).get("localized", {}).get("en_US", "")
        )
        name = f"{first_name} {last_name}".strip()

        email = None
        if email_data.get("elements"):
            email = email_data["elements"][0].get("handle~", {}).get("emailAddress")

        picture = None
        if (
            profile_data.get("profilePicture", {})
            .get("displayImage~", {})
            .get("elements")
        ):
            picture = profile_data["profilePicture"]["displayImage~"]["elements"][0][
                "identifiers"
            ][0]["identifier"]

        return {
            "id": profile_data.get("id"),
            "email": email,
            "name": name,
            "picture": picture,
            "verified_email": True,  # LinkedIn emails are considered verified
        }


class OAuthService:
    """Service for managing OAuth providers"""

    def __init__(self, app=None):
        self.providers = {}
        if app:
            self.init_app(app)

    def init_app(self, app):
        """Initialize OAuth service with Flask app"""
        # Initialize Google OAuth
        google_client_id = app.config.get("GOOGLE_CLIENT_ID")
        google_client_secret = app.config.get("GOOGLE_CLIENT_SECRET")
        if google_client_id and google_client_secret:
            self.providers["google"] = GoogleOAuthProvider(
                google_client_id, google_client_secret
            )

        # Initialize Facebook OAuth
        facebook_app_id = app.config.get("FACEBOOK_APP_ID")
        facebook_app_secret = app.config.get("FACEBOOK_APP_SECRET")
        if facebook_app_id and facebook_app_secret:
            self.providers["facebook"] = FacebookOAuthProvider(
                facebook_app_id, facebook_app_secret
            )

        # Initialize LinkedIn OAuth
        linkedin_client_id = app.config.get("LINKEDIN_CLIENT_ID")
        linkedin_client_secret = app.config.get("LINKEDIN_CLIENT_SECRET")
        if linkedin_client_id and linkedin_client_secret:
            self.providers["linkedin"] = LinkedInOAuthProvider(
                linkedin_client_id, linkedin_client_secret
            )

    def get_provider(self, name):
        """Get OAuth provider by name"""
        return self.providers.get(name)

    def get_available_providers(self):
        """Get list of available OAuth providers"""
        return list(self.providers.keys())
