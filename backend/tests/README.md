## Admin Seeding & Role-Based Access

- Tests verify admin user is seeded from environment variables
- Role-based access control is tested for admin-only endpoints
# evxchange OAuth Authentication Tests

This directory contains comprehensive unit and integration tests for the evxchange OAuth authentication system supporting Google, Facebook, and LinkedIn login.

## 🧪 Test Structure

```
tests/
├── conftest.py                    # Test configuration and fixtures
├── test_models.py                 # User model tests
├── test_oauth_services.py         # OAuth service provider tests
├── test_auth_routes.py           # Authentication route tests
├── test_integration.py           # End-to-end integration tests
├── test_security_edge_cases.py   # Security and edge case tests
└── README.md                     # This file
```

## 🚀 Running Tests

### Quick Start

```bash
# Make sure you're in the backend directory
cd backend

# Run all tests
./run_tests.sh
```

### Manual Test Execution

```bash
# Install dependencies
pip install -r requirements.txt

# Run specific test files
pytest tests/test_models.py -v
pytest tests/test_oauth_services.py -v
pytest tests/test_auth_routes.py -v
pytest tests/test_integration.py -v
pytest tests/test_security_edge_cases.py -v

# Run all tests with coverage
pytest tests/ --cov=. --cov-report=term-missing --cov-report=html

# Run tests with specific markers
pytest -m "oauth" -v
pytest -m "integration" -v
```

## 📋 Test Categories

### 1. Unit Tests (`test_models.py`)
Tests the User model functionality:
- ✅ User creation and validation
- ✅ OAuth ID management (Google, Facebook, LinkedIn)
- ✅ User search and retrieval methods
- ✅ Data serialization (`to_dict()`)
- ✅ Database constraints and uniqueness

### 2. OAuth Service Tests (`test_oauth_services.py`)
Tests OAuth provider implementations:

**Google OAuth Provider:**
- ✅ Authorization URL generation
- ✅ Access token exchange
- ✅ User information retrieval
- ✅ Error handling for API failures

**Facebook OAuth Provider:**
- ✅ Authorization URL generation with correct scopes
- ✅ Access token exchange with Graph API
- ✅ User profile and picture retrieval
- ✅ Error handling

**LinkedIn OAuth Provider:**
- ✅ Authorization URL generation
- ✅ Access token exchange
- ✅ Profile and email information retrieval
- ✅ Complex LinkedIn API response handling

**OAuth Service Manager:**
- ✅ Provider initialization and configuration
- ✅ Provider discovery and retrieval
- ✅ Graceful handling of missing configurations

### 3. Authentication Route Tests (`test_auth_routes.py`)
Tests the Flask authentication endpoints:
- ✅ OAuth login initiation (`/auth/login/<provider>`)
- ✅ OAuth callback handling (`/auth/callback/<provider>`)
- ✅ CSRF protection with state parameters
- ✅ User creation and login
- ✅ Existing user account linking
- ✅ Session management
- ✅ Logout functionality
- ✅ User information endpoints
- ✅ Provider discovery endpoint

### 4. Integration Tests (`test_integration.py`)
Tests complete OAuth flows:
- ✅ End-to-end Google OAuth authentication
- ✅ Multiple provider account linking
- ✅ Session persistence across requests
- ✅ API endpoint authentication
- ✅ Error propagation and handling
- ✅ Database transaction integrity

### 5. Security & Edge Cases (`test_security_edge_cases.py`)
Tests security features and edge cases:
- ✅ CSRF protection validation
- ✅ Session security and cleanup
- ✅ Malformed OAuth responses
- ✅ Provider timeout handling
- ✅ Duplicate account prevention
- ✅ Configuration edge cases
- ✅ Data validation boundaries

## 🔧 Test Configuration

### Environment Variables
Tests use the following configuration (set in `conftest.py`):
```python
TESTING = True
SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"  # In-memory test DB
SECRET_KEY = "test-secret-key"
GOOGLE_CLIENT_ID = "test-google-client-id"
GOOGLE_CLIENT_SECRET = "test-google-client-secret"
FACEBOOK_APP_ID = "test-facebook-app-id"
FACEBOOK_APP_SECRET = "test-facebook-app-secret"
LINKEDIN_CLIENT_ID = "test-linkedin-client-id"
LINKEDIN_CLIENT_SECRET = "test-linkedin-client-secret"
```

### Test Fixtures
- `app`: Configured Flask application instance
- `client`: Test client for making HTTP requests
- `sample_user`: Pre-created user for authentication tests

### Mocking
Tests use `responses` library to mock HTTP requests to OAuth providers:
- Token exchange endpoints
- User information APIs
- Error responses and timeouts

## 📊 Coverage Requirements

The test suite aims for **85%+ code coverage** with the following minimum requirements:
- Models: 95%+ coverage
- OAuth Services: 90%+ coverage  
- Routes: 85%+ coverage
- Integration: 80%+ coverage

## 🐛 Test Markers

Tests are organized with pytest markers:
```bash
pytest -m "unit"          # Unit tests only
pytest -m "integration"   # Integration tests only
pytest -m "oauth"         # OAuth-related tests
pytest -m "slow"          # Slower running tests
```

## 🔒 Security Test Coverage

### CSRF Protection
- ✅ State parameter validation
- ✅ Session hijacking prevention
- ✅ Cross-site request forgery protection

### Input Validation
- ✅ Malformed OAuth responses
- ✅ Missing required fields
- ✅ Oversized input handling
- ✅ Special character handling

### Error Handling
- ✅ OAuth provider failures
- ✅ Network timeouts
- ✅ Database constraint violations
- ✅ Configuration errors

## 🚨 Known Test Limitations

1. **Rate Limiting**: Tests don't cover OAuth provider rate limiting scenarios
2. **Real Network**: Tests use mocked HTTP responses, not real OAuth providers
3. **Browser Behavior**: Tests don't simulate actual browser OAuth flows
4. **Concurrent Users**: Limited testing of concurrent authentication attempts

## 🛠️ Development Workflow

### Adding New Tests
1. Create test in appropriate file based on category
2. Use existing fixtures and patterns
3. Mock external API calls with `responses`
4. Ensure test isolation (no shared state)
5. Add appropriate pytest markers

### Test Data Management
- Use in-memory SQLite for test database
- Each test gets fresh database via fixtures
- Clean up resources in test teardown

### Debugging Failed Tests
```bash
# Run with detailed output
pytest tests/test_file.py::test_function -v -s

# Run with debugger
pytest tests/test_file.py::test_function --pdb

# Check coverage for specific file
pytest tests/test_file.py --cov=module_name --cov-report=term-missing
```

## 📈 Performance Considerations

- Tests use in-memory database for speed
- HTTP requests are mocked to avoid network delays
- Parallel test execution with `pytest-xdist` (optional)
- Test isolation ensures no cross-test dependencies

## 🔮 Future Test Enhancements

1. **Load Testing**: Add tests for high-concurrency OAuth flows
2. **Browser Testing**: Selenium tests for full OAuth flows
3. **Security Scanning**: Automated security vulnerability testing
4. **Performance**: Database performance tests with large user datasets
5. **Mobile**: Test OAuth flows on mobile devices
