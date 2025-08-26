#!/bin/bash

# evxchange Backend Test Script
# This script runs all unit and integration tests for OAuth authentication

echo "🧪 evxchange OAuth Authentication Test Suite"
echo "=============================================="

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color


# Check for Python 3.12
PYTHON_VERSION=$(python3.12 --version 2>/dev/null)
if [[ $? -ne 0 ]]; then
    echo -e "${RED}Error: Python 3.12 is required but not found. Please install Python 3.12 and try again.${NC}"
    echo "On macOS: brew install python@3.12"
    echo "Or use pyenv: pyenv install 3.12.3 && pyenv local 3.12.3"
    exit 1
fi

# Check if virtual environment is activated
if [[ "$VIRTUAL_ENV" == "" ]]; then
    echo -e "${YELLOW}Warning: No virtual environment detected. Activating venv...${NC}"
    if [ -d "venv" ]; then
        source venv/bin/activate
    else
        echo -e "${YELLOW}Creating Python 3.12 virtual environment...${NC}"
        python3.12 -m venv venv
        source venv/bin/activate
        pip install -r requirements.txt
    fi
fi

# Install dependencies if needed
echo "📦 Installing/updating dependencies..."
pip install -r requirements.txt

export PYTHONPATH="$(cd .. && pwd)"
# Inject dummy OAuth credentials for testing (matching app config names and test expectations)
export GOOGLE_CLIENT_ID="test-google-client-id"
export GOOGLE_CLIENT_SECRET="dummy-google-client-secret"
export FACEBOOK_APP_ID="test-facebook-app-id"
export FACEBOOK_APP_SECRET="dummy-facebook-app-secret"
export LINKEDIN_CLIENT_ID="test-linkedin-client-id"
export LINKEDIN_CLIENT_SECRET="dummy-linkedin-client-secret"

# Create test database if needed
echo "🗄️  Setting up test database..."
export FLASK_APP=run.py
export FLASK_ENV=testing

# Run different test categories
echo ""
echo "🔧 Running Unit Tests..."
echo "------------------------"
pytest tests/test_models.py tests/test_oauth_services.py -v --tb=short --maxfail=3

echo ""
echo "🌐 Running OAuth Route Tests..."
echo "------------------------------"
pytest tests/test_auth_routes.py -v --tb=short --maxfail=3

echo ""
echo "🔗 Running Integration Tests..."
echo "------------------------------"
pytest tests/test_integration.py -v --tb=short --maxfail=3

echo ""
echo "📊 Running All Tests with Coverage..."
echo "-----------------------------------"
pytest tests/ --cov=. --cov-report=term-missing --cov-report=html:htmlcov --cov-fail-under=80 --maxfail=3

# Check test results
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ All tests passed successfully!${NC}"
    echo ""
    echo "📋 Test Coverage Report:"
    echo "  - HTML report: htmlcov/index.html"
    echo "  - Terminal report: See above"
    echo ""
    echo "🔐 OAuth Authentication Features Tested:"
    echo "  ✅ Google OAuth 2.0 integration"
    echo "  ✅ Facebook OAuth 2.0 integration" 
    echo "  ✅ LinkedIn OAuth 2.0 integration"
    echo "  ✅ User model and database operations"
    echo "  ✅ OAuth service providers"
    echo "  ✅ Authentication routes and callbacks"
    echo "  ✅ Session management and security"
    echo "  ✅ Error handling and edge cases"
    echo "  ✅ User linking and account management"
else
    echo ""
    echo -e "${RED}❌ Some tests failed. Please check the output above.${NC}"
    exit 1
fi
