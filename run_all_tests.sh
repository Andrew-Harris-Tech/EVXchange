#!/bin/bash

# Run all backend and frontend tests for ChargeBnB

set -e

# Run backend tests
if [ -f backend/run_tests.sh ]; then
  echo "\n🧪 Running backend tests..."
  (cd backend && ./run_tests.sh)
else
  echo "Backend test script not found."
fi

# Run frontend tests
if [ -f frontend/package.json ]; then
  echo "\n🧪 Running frontend tests..."
  (cd frontend && npm test -- --watchAll=false)
else
  echo "Frontend not set up or package.json missing."
fi
