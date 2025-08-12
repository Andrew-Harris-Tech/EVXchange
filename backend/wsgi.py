import os
db_url = os.environ.get("DATABASE_URL")


import sys

# Ensure the current directory is in sys.path for local dev
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Heroku DATABASE_URL patch
db_url = os.environ.get("DATABASE_URL")
if db_url and db_url.startswith("postgres://"):
    os.environ["DATABASE_URL"] = db_url.replace("postgres://", "postgresql://", 1)

try:
    from app import create_app
except ImportError:
    from backend.app import create_app

app = create_app()
