import pytest

def test_create_checkout_session_success(client, mocker):
    """Should create a Stripe checkout session and return session URL"""
    # Mock Stripe API response
    mock_session = mocker.Mock()
    mock_session.url = "https://checkout.stripe.com/test-session"
    mock_create = mocker.patch("stripe.checkout.Session.create", return_value=mock_session)

    data = {
        "booking_id": 1,
        "amount": 2500,  # cents
        "currency": "usd",
        "success_url": "https://localhost/success",
        "cancel_url": "https://localhost/cancel"
    }
    response = client.post("/api/payments/checkout", json=data)
    assert response.status_code == 200
    resp_data = response.get_json()
    assert "checkout_url" in resp_data
    assert resp_data["checkout_url"].startswith("https://checkout.stripe.com/")
    mock_create.assert_called_once()

def test_create_checkout_session_invalid_data(client):
    """Should return 400 for missing or invalid data"""
    response = client.post("/api/payments/checkout", json={})
    assert response.status_code == 400
    data = response.get_json()
    assert "error" in data

def test_stripe_webhook_success(client, mocker):
    """Should handle Stripe webhook for successful payment"""
    # Mock Stripe event verification
    mock_event = {"type": "checkout.session.completed", "data": {"object": {"id": "cs_test_123"}}}
    mocker.patch("stripe.Webhook.construct_event", return_value=mock_event)
    payload = "{}"
    sig_header = "t=123,v1=abc"
    response = client.post("/api/payments/webhook", data=payload, headers={"Stripe-Signature": sig_header})
    assert response.status_code == 200
    assert response.get_json()["status"] == "success"

def test_stripe_webhook_invalid_signature(client, mocker):
    """Should return 400 for invalid webhook signature"""
    mocker.patch("stripe.Webhook.construct_event", side_effect=Exception("Invalid signature"))
    payload = "{}"
    sig_header = "t=123,v1=bad"
    response = client.post("/api/payments/webhook", data=payload, headers={"Stripe-Signature": sig_header})
    assert response.status_code == 400
    assert "error" in response.get_json()
