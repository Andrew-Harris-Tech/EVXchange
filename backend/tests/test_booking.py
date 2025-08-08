import pytest

def test_create_booking(client):
    """Should create a booking for a station with valid data"""
    booking_data = {
        "station_id": 1,
        "user_id": 1,
        "start_time": "2025-08-10T10:00:00Z",
        "end_time": "2025-08-10T12:00:00Z"
    }
    response = client.post('/api/bookings/', json=booking_data)
    assert response.status_code == 201
    data = response.get_json()
    assert "booking_id" in data
    assert data["status"] == "confirmed"

def test_booking_conflict(client):
    """Should return 409 if booking time overlaps with existing booking"""
    # First booking
    booking_data = {
        "station_id": 1,
        "user_id": 1,
        "start_time": "2025-08-10T10:00:00Z",
        "end_time": "2025-08-10T12:00:00Z"
    }
    client.post('/api/bookings/', json=booking_data)
    # Overlapping booking
    conflict_data = {
        "station_id": 1,
        "user_id": 2,
        "start_time": "2025-08-10T11:00:00Z",
        "end_time": "2025-08-10T13:00:00Z"
    }
    response = client.post('/api/bookings/', json=conflict_data)
    assert response.status_code == 409
    data = response.get_json()
    assert "error" in data
    assert "overlap" in data["error"].lower()

def test_booking_availability(client):
    """Should return available time slots for a station"""
    response = client.get('/api/stations/1/availability?date=2025-08-10')
    assert response.status_code == 200
    data = response.get_json()
    assert "available_slots" in data
    assert isinstance(data["available_slots"], list)

def test_invalid_booking_data(client):
    """Should return 400 for invalid booking data"""
    response = client.post('/api/bookings/', json={})
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
