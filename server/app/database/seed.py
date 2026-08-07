"""
Run once after migrations to create the first admin login:

    python -m app.database.seed

Reads ADMIN_EMAIL / ADMIN_PASSWORD from .env. Safe to re-run — it skips
creating a duplicate if that email already exists.
"""
from app.database.session import SessionLocal
from app.models.admin_user import AdminUser
from app.core.security import hash_password
from app.core.config import get_settings


def seed_admin():
    settings = get_settings()
    db = SessionLocal()
    try:
        existing = db.query(AdminUser).filter(AdminUser.email == settings.admin_email).first()
        if existing:
            print(f"Admin '{settings.admin_email}' already exists — skipping.")
            return

        admin = AdminUser(
            email=settings.admin_email,
            hashed_password=hash_password(settings.admin_password),
        )
        db.add(admin)
        db.commit()
        print(f"Created admin account: {settings.admin_email}")
        print("Log in at /admin/login, then change this password via Settings once that module is built.")
    finally:
        db.close()


if __name__ == "__main__":
    seed_admin()
