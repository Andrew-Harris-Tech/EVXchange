import pytest
from unittest.mock import patch

def test_booking_creation_and_history(client):
    """Integration: Submitting booking form creates booking and shows in history"""
    booking_data = {
        "station_id": 3,
        "user_id": 99,
        "start_time": "2025-09-16T16:00:00Z",
        "end_time": "2025-09-16T17:00:00Z"
    }
    # Submit booking
    response = client.post('/api/bookings/', json=booking_data)
    assert response.status_code == 201
    # Simulate login for dashboard (mock current_user)
    with patch("flask_login.utils._get_user") as mock_user:
        mock_user.return_value.is_authenticated = True
        mock_user.return_value.id = 99
        dash_resp = client.get('/api/dashboard')
        assert dash_resp.status_code == 200
        dash_data = dash_resp.get_json()
        bookings = dash_data["bookings"]
        # Should show the new booking
        assert any(b["station_id"] == 3 and b["user_id"] == 99 for b in bookings)
        # Should show in upcoming reservations (future date)
        upcoming = [b for b in bookings if b["start_time"] > "2025-09-16T00:00:00Z"]
        assert len(upcoming) > 0

# Optionally, add more tests for past reservations if needed
