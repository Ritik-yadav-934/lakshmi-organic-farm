"""create products and admin_users tables

Revision ID: 0001_initial
Revises:
Create Date: 2026-08-07

"""
from alembic import op
import sqlalchemy as sa

revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "products",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column("name", sa.String(length=120), nullable=False, index=True),
        sa.Column("category", sa.String(length=60), nullable=False, index=True),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("price", sa.Float(), nullable=False),
        sa.Column("unit", sa.String(length=20), nullable=False),
        sa.Column("image_url", sa.String(length=500), nullable=True),
        sa.Column("quantity", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("available", sa.Boolean(), nullable=False, server_default=sa.true()),
        sa.Column("fresh_today", sa.Boolean(), nullable=False, server_default=sa.false()),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )

    op.create_table(
        "admin_users",
        sa.Column("id", sa.Integer(), primary_key=True, index=True),
        sa.Column("email", sa.String(length=160), nullable=False, unique=True, index=True),
        sa.Column("hashed_password", sa.String(length=255), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now()),
    )


def downgrade():
    op.drop_table("admin_users")
    op.drop_table("products")
