
import pytest

def login(client, user):
    with client.session_transaction() as sess:
        sess['_user_id'] = str(user.id)
        sess['_fresh'] = True

@pytest.fixture(autouse=True)
def auto_login(client, sample_user):
    login(client, sample_user)

def test_add_rating_and_review(client):
    """User can add a rating and review for a completed booking"""
    payload = {
        "rating": 5,
        "review": "Great experience!"
    }
    response = client.post('/api/bookings/1/review', json=payload)
    assert response.status_code == 201
    data = response.get_json()
    assert data["booking_id"] == 1
    assert data["rating"] == 5
    assert data["review"] == "Great experience!"
    assert "review_id" in data

def test_get_reviews_for_station(client):
    """Anyone can get all reviews for a station"""
    response = client.get('/api/stations/1/reviews')
    assert response.status_code == 200
    data = response.get_json()
    assert "reviews" in data
    assert isinstance(data["reviews"], list)

def test_update_review(client):
    """User can update their review for a booking"""
    payload = {"rating": 4, "review": "Good!"}
    post_resp = client.post('/api/bookings/2/review', json=payload)
    review_id = post_resp.get_json()["review_id"]
    update_payload = {"rating": 3, "review": "Okay."}
    response = client.put(f'/api/reviews/{review_id}', json=update_payload)
    assert response.status_code == 200
    data = response.get_json()
    assert data["rating"] == 3
    assert data["review"] == "Okay."

def test_delete_review(client):
    """User can delete their review for a booking"""
    payload = {"rating": 2, "review": "Not great."}
    post_resp = client.post('/api/bookings/3/review', json=payload)
    review_id = post_resp.get_json()["review_id"]
    response = client.delete(f'/api/reviews/{review_id}')
    assert response.status_code == 204
    get_resp = client.get('/api/reviews/{}'.format(review_id))
    assert get_resp.status_code == 404
