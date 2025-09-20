"""add avatar, tier, and role columns to users table; rename profile_picture to avatar

Revision ID: add_profile_fields
Revises: 9d3dbe5fc0c0
Create Date: 2025-09-20
"""
from alembic import op
import sqlalchemy as sa

def upgrade():
    # Rename profile_picture to avatar
    with op.batch_alter_table('users') as batch_op:
        batch_op.alter_column('profile_picture', new_column_name='avatar')
        batch_op.add_column(sa.Column('tier', sa.String(length=20), nullable=False, server_default='free'))
        batch_op.add_column(sa.Column('role', sa.String(length=20), nullable=False, server_default='user'))

def downgrade():
    with op.batch_alter_table('users') as batch_op:
        batch_op.alter_column('avatar', new_column_name='profile_picture')
        batch_op.drop_column('tier')
        batch_op.drop_column('role')
