import pytest
from unittest.mock import patch

def test_booking_form_required_fields(client):
    """Should return 400 if required fields are missing in booking form"""
    # Missing all fields
    response = client.post('/api/bookings/', json={})
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data
    # Missing one field at a time
    base = {
        "station_id": 1,
        "user_id": 1,
        "start_time": "2025-08-10T10:00:00Z",
        "end_time": "2025-08-10T12:00:00Z"
    }
    for field in base:
        d = base.copy()
        d.pop(field)
        response = client.post('/api/bookings/', json=d)
        assert response.status_code == 400
        data = response.get_json()
        assert "error" in data

def test_booking_summary_details(client):
    """Should return correct booking details in dashboard after booking"""
    booking_data = {
        "station_id": 2,
        "user_id": 42,
        "start_time": "2025-09-16T14:00:00Z",
        "end_time": "2025-09-16T15:00:00Z"
    }
    response = client.post('/api/bookings/', json=booking_data)
    assert response.status_code == 201
    # Simulate login for dashboard (mock current_user)
    with patch("flask_login.utils._get_user") as mock_user:
        mock_user.return_value.is_authenticated = True
        mock_user.return_value.id = 42
        dash_resp = client.get('/api/dashboard')
        assert dash_resp.status_code == 200
        dash_data = dash_resp.get_json()
        bookings = dash_data["bookings"]
        assert any(b["station_id"] == 2 and b["user_id"] == 42 for b in bookings)
