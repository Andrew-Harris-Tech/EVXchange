
import pytest

def login(client, user):
    with client.session_transaction() as sess:
        sess['_user_id'] = str(user.id)
        sess['_fresh'] = True

@pytest.fixture(autouse=True)
def auto_login(client, sample_user):
    login(client, sample_user)

def test_get_user_geolocation(client):
    """User can fetch their geolocation (mocked)"""
    response = client.get('/api/geolocation')
    assert response.status_code == 200
    data = response.get_json()
    assert "lat" in data
    assert "lng" in data
    assert isinstance(data["lat"], float)
    assert isinstance(data["lng"], float)

def test_geolocation_requires_auth(client):
    """Geolocation endpoint requires authentication"""
    # Log out user by clearing session
    with client.session_transaction() as sess:
        sess.clear()
    response = client.get('/api/geolocation')
    assert response.status_code == 401
