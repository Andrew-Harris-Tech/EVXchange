import requests
import os

SUPABASE_URL = os.getenv("SUPABASE_URL", "https://ibstcbzlziyitbgdznzk.supabase.co")
API_BASE = f"{SUPABASE_URL}/rest/v1"

# Example: Health check endpoint (should be public)
def test_supabase_health_check():
    resp = requests.get(f"{SUPABASE_URL}/health")
    assert resp.status_code == 200
    data = resp.json()
    assert "status" in data
    assert data["status"] == "healthy"

# Example: Auth required endpoint (should return 401 or 403 if not authed)
def test_supabase_auth_required():
    resp = requests.get(f"{API_BASE}/protected-resource")
    assert resp.status_code in (401, 403)

# Example: Public endpoint (should return 200)
def test_supabase_public_endpoint():
    resp = requests.get(f"{API_BASE}/public-resource")
    assert resp.status_code == 200

# Example: CORS headers present
def test_supabase_cors_headers():
    resp = requests.options(f"{API_BASE}/public-resource")
    assert "access-control-allow-origin" in resp.headers
