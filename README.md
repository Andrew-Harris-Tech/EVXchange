# ⚡ ChargeBnB

ChargeBnB is a peer-to-peer electric vehicle (EV) charging station platform — think AirBnB, but for home and public parking lot chargers. EV owners can search, view, and book nearby charging spots hosted by individuals or businesses. Hosts can monetize their unused chargers. The platform features secure authentication, real-time location mapping, seamless booking, payments, and reviews.

---

## 🚀 Features

- 🔐 **Authentication** via LinkedIn, Google, or Facebook
- 🗺️ **Google Maps integration** to explore nearby chargers
- 🧾 **Booking system** with availability and pricing
- 💳 **Stripe payments** for secure transactions
- ⭐ **Ratings & reviews** for transparency and trust
- 🧑‍💻 **Flask backend** with RESTful API
- ⚛️ **React frontend** for fast, modern UI

---

## 📸 Demo

Coming soon...

---

## 🏗️ Tech Stack

| Layer       | Tech                              |
|-------------|------------------------------------|
| Frontend    | React, Tailwind CSS, Google Maps JS API |
| Backend     | Flask, Flask-Login, Flask-RESTful |
| Auth        | OAuth 2.0 via Google, Facebook, LinkedIn |
| Maps        | Google Maps Platform               |
| Payments    | Stripe API                         |
| Database    | PostgreSQL (via SQLAlchemy ORM)    |
| Deployment  | Heroku / Vercel / Docker           |

---

## 🔐 Authentication

We support OAuth 2.0 authentication through:

- Google
- Facebook
- LinkedIn

You’ll need to set up API credentials with each provider and configure redirect URIs.

---

## 💳 Payments

Stripe is used for secure payments between renters and hosts.

- Host sets hourly/daily rate
- Renter pays via Stripe Checkout
- Funds transferred to host’s connected Stripe account

---

## 🌍 Location & Booking

- Users are geolocated via the browser
- Available chargers are shown on an interactive Google Map
- Clicking a marker opens details & booking options
- Hosts can set time availability and pricing

---

## 🗣️ Reviews

After a booking, renters can:

- Leave a 1–5 star rating
- Write a short review
- See public reviews on each charger’s profile

---

## 🧪 Local Development

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/chargebnb.git
cd chargebnb
```

### 2. Backend Setup (Flask)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # Add API keys and DB config
flask run
```

### 3. Frontend Setup (React)

```bash
cd frontend
npm install
npm start
```

---

## 🔑 Environment Variables

### Backend (`.env`)

```env
FLASK_APP=app.py
FLASK_ENV=development
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FACEBOOK_CLIENT_ID=your_facebook_client_id
FACEBOOK_CLIENT_SECRET=your_facebook_client_secret
LINKEDIN_CLIENT_ID=your_linkedin_client_id
LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
DATABASE_URL=postgresql://user:pass@localhost/dbname
```

### Frontend (`.env`)

```env
REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
REACT_APP_BACKEND_URL=http://localhost:5000
```

---

## 🛠️ Folder Structure

```
chargebnb/
├── backend/        # Flask API + DB models
├── frontend/       # React SPA
└── README.md
```

---

## 📬 API Overview

- `POST /api/login/google` – OAuth login via Google
- `GET /api/stations/nearby?lat=...&lng=...` – Nearby chargers
- `POST /api/bookings/` – Create a booking
- `POST /api/payments/checkout` – Stripe Checkout session
- `POST /api/reviews/` – Leave a review

(Full API docs coming soon)

---

## 🚧 Roadmap

- ✅ Basic booking + payment flow
- ⏳ In-app messaging
- ⏳ Smart charger integration (OCPP)
- ⏳ Waitlist & auto-rebooking
- ⏳ Mobile app (React Native)

---

## 🤝 Contributing

PRs welcome! Please open an issue first to discuss major changes.

---

## 📄 License

MIT License

---

## 🙋‍♀️ Authors

Built with love by the ChargeBnB team.
