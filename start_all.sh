#!/bin/bash
# Launch both backend (Flask) and frontend (React) servers for ChargeBnB

# Start backend
cd backend
source venv/bin/activate
export FLASK_APP=run.py
export FLASK_ENV=development
flask run &
BACKEND_PID=$!
cd ..

# Start frontend
cd frontend
npm start &
FRONTEND_PID=$!
cd ..

# Wait for both to exit
wait $BACKEND_PID $FRONTEND_PID
