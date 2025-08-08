
import pytest

def login(client, user):
    with client.session_transaction() as sess:
        sess['_user_id'] = str(user.id)
        sess['_fresh'] = True

@pytest.fixture(autouse=True)
def auto_login(client, sample_user):
    login(client, sample_user)

def test_get_user_dashboard(client):
    """User can fetch their dashboard with bookings, payments, and reviews"""
    response = client.get('/api/dashboard')
    assert response.status_code == 200
    data = response.get_json()
    assert "bookings" in data
    assert isinstance(data["bookings"], list)
    assert "payments" in data
    assert isinstance(data["payments"], list)
    assert "reviews" in data
    assert isinstance(data["reviews"], list)

def test_dashboard_bookings_structure(client):
    """Dashboard bookings have expected fields"""
    response = client.get('/api/dashboard')
    bookings = response.get_json()["bookings"]
    for booking in bookings:
        assert "booking_id" in booking
        assert "station_id" in booking
        assert "start_time" in booking
        assert "end_time" in booking
        assert "status" in booking

def test_dashboard_payments_structure(client):
    """Dashboard payments have expected fields"""
    response = client.get('/api/dashboard')
    payments = response.get_json()["payments"]
    for payment in payments:
        assert "payment_id" in payment
        assert "booking_id" in payment
        assert "amount" in payment
        assert "currency" in payment
        assert "status" in payment

def test_dashboard_reviews_structure(client):
    """Dashboard reviews have expected fields"""
    response = client.get('/api/dashboard')
    reviews = response.get_json()["reviews"]
    for review in reviews:
        assert "review_id" in review
        assert "booking_id" in review
        assert "station_id" in review
        assert "rating" in review
        assert "review" in review
