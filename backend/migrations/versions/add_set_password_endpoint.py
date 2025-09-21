"""
Revision ID: add_set_password_endpoint
Revises: add_password_hash_to_user
Create Date: 2025-09-21
"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    # No schema change, just endpoint addition
    pass

def downgrade():
    pass
