
import pytest

def login(client, user):
    # Directly set up the session for Flask-Login
    with client.session_transaction() as sess:
        sess['_user_id'] = str(user.id)
        sess['_fresh'] = True

@pytest.fixture(autouse=True)
def auto_login(client, sample_user):
    login(client, sample_user)

def test_create_station(client):
    """Host can create a new charging station"""
    payload = {
        "name": "Test Station",
        "lat": 37.7749,
        "lng": -122.4194,
        "address": "123 Test St, Test City"
    }
    response = client.post('/api/host/stations', json=payload)
    assert response.status_code == 201
    data = response.get_json()
    assert "station_id" in data
    assert data["name"] == payload["name"]
    assert data["lat"] == payload["lat"]
    assert data["lng"] == payload["lng"]
    assert data["address"] == payload["address"]

def test_list_host_stations(client):
    """Host can list their charging stations"""
    response = client.get('/api/host/stations')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, dict)
    assert "stations" in data
    assert isinstance(data["stations"], list)

def test_update_station(client):
    """Host can update a charging station"""
    # First, create a station
    payload = {
        "name": "Update Station",
        "lat": 37.0,
        "lng": -122.0,
        "address": "456 Update St, Update City"
    }
    create_resp = client.post('/api/host/stations', json=payload)
    station_id = create_resp.get_json()["station_id"]
    # Update
    update_payload = {"name": "Updated Name"}
    response = client.put(f'/api/host/stations/{station_id}', json=update_payload)
    assert response.status_code == 200
    data = response.get_json()
    assert data["name"] == "Updated Name"

def test_delete_station(client):
    """Host can delete a charging station"""
    # First, create a station
    payload = {
        "name": "Delete Station",
        "lat": 38.0,
        "lng": -123.0,
        "address": "789 Delete St, Delete City"
    }
    create_resp = client.post('/api/host/stations', json=payload)
    station_id = create_resp.get_json()["station_id"]
    # Delete
    response = client.delete(f'/api/host/stations/{station_id}')
    assert response.status_code == 204
    # Confirm deletion
    get_resp = client.get('/api/host/stations')
    stations = get_resp.get_json()["stations"]
    assert all(s["station_id"] != station_id for s in stations)
