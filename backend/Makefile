# ChargeBnB Backend Makefile
# Convenient commands for development and testing

.PHONY: help install test test-unit test-integration test-coverage test-security lint format clean

help:
	@echo "ChargeBnB OAuth Authentication Development Commands"
	@echo "=================================================="
	@echo ""
	@echo "Setup Commands:"
	@echo "  install         Install dependencies and setup environment"
	@echo "  setup-venv      Create and activate virtual environment"
	@echo ""
	@echo "Testing Commands:"
	@echo "  test            Run all tests"
	@echo "  test-unit       Run unit tests only"
	@echo "  test-integration Run integration tests only"
	@echo "  test-coverage   Run tests with coverage report"
	@echo "  test-security   Run security and edge case tests"
	@echo ""
	@echo "Code Quality Commands:"
	@echo "  lint            Run code linting"
	@echo "  format          Format code with black and isort"
	@echo "  type-check      Run mypy type checking"
	@echo ""
	@echo "Development Commands:"
	@echo "  run             Start development server"
	@echo "  clean           Clean up temporary files"

# Setup commands
install:
	pip install -r requirements.txt

setup-venv:
	python3 -m venv venv
	@echo "Virtual environment created. Activate with: source venv/bin/activate"

# Testing commands
test:
	./run_tests.sh

test-unit:
	pytest tests/test_models.py tests/test_oauth_services.py -v

test-integration:
	pytest tests/test_integration.py -v

test-auth:
	pytest tests/test_auth_routes.py -v

test-security:
	pytest tests/test_security_edge_cases.py -v

test-coverage:
	pytest tests/ --cov=. --cov-report=html --cov-report=term-missing

test-fast:
	pytest tests/ -x --tb=short

# Code quality commands
lint:
	flake8 . --max-line-length=127 --extend-ignore=E203,W503
	bandit -r . -ll

format:
	black .
	isort .

type-check:
	mypy . --ignore-missing-imports

# Development commands
run:
	export FLASK_APP=run.py && export FLASK_ENV=development && flask run

run-debug:
	export FLASK_APP=run.py && export FLASK_ENV=development && flask run --debug

# Database commands
db-init:
	export FLASK_APP=run.py && flask db init

db-migrate:
	export FLASK_APP=run.py && flask db migrate

db-upgrade:
	export FLASK_APP=run.py && flask db upgrade

# Cleanup commands
clean:
	find . -type f -name "*.pyc" -delete
	find . -type d -name "__pycache__" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +
	rm -rf .pytest_cache
	rm -rf htmlcov
	rm -rf .coverage
	rm -rf coverage.xml

# Docker commands (for future use)
docker-build:
	docker build -t chargebnb-backend .

docker-run:
	docker run -p 5000:5000 chargebnb-backend

# CI/CD simulation
ci-test: lint test-coverage test-security
	@echo "✅ All CI checks passed!"
