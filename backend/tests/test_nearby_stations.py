import pytest

def test_nearby_stations_success(client):
    """Should return a list of nearby charging stations for valid coordinates"""
    response = client.get('/api/nearby_stations?lat=37.7749&lng=-122.4194')
    assert response.status_code == 200
    data = response.get_json()
    assert isinstance(data, dict)
    assert 'stations' in data
    assert isinstance(data['stations'], list)
    # Optionally check structure of a station
    if data['stations']:
        station = data['stations'][0]
        assert 'id' in station
        assert 'name' in station
        assert 'lat' in station
        assert 'lng' in station
        assert 'address' in station

def test_nearby_stations_missing_params(client):
    """Should return 400 if lat/lng params are missing"""
    response = client.get('/api/nearby_stations')
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data

def test_nearby_stations_invalid_params(client):
    """Should return 400 for invalid lat/lng values"""
    response = client.get('/api/nearby_stations?lat=abc&lng=xyz')
    assert response.status_code == 400
    data = response.get_json()
    assert 'error' in data
