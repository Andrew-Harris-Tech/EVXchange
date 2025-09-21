"""
Revision ID: add_password_hash_to_user
Revises: 
Create Date: 2025-09-21
"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    op.add_column('users', sa.Column('password_hash', sa.String(length=128), nullable=True))

def downgrade():
    op.drop_column('users', 'password_hash')
