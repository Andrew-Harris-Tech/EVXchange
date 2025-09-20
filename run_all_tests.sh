#!/bin/bash

# Run all backend and frontend tests for evxchange

set -e

# Run backend tests
if [ -f backend/run_tests.sh ]; then
  echo "\n🧪 Running backend tests..."
  (cd backend && ./run_tests.sh)
else
  echo "Backend test script not found."
fi


# Run frontend build and tests
if [ -f frontend/package.json ]; then
  echo "\n🔨 Building frontend..."
  (cd frontend && npm install && npm run build)
  echo "\n🧪 Running frontend tests..."
  (cd frontend && npm test -- --watchAll=false)
else
  echo "Frontend not set up or package.json missing."
fi

# Run mobile deep link parsing tests (pure JS)
if [ -f scripts/parse-deeplink.test.js ]; then
  echo "\n🧪 Running mobile deep link parsing tests..."
  (cd scripts && npx jest parse-deeplink.test.js)
else
  echo "Mobile deep link parsing test not found."
fi
