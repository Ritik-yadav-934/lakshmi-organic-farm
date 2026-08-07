from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.core.security import verify_password, create_access_token
from app.middleware.auth_middleware import get_current_admin
from app.models.admin_user import AdminUser
from app.schemas.auth_schema import LoginRequest, TokenResponse, AdminOut

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    admin = db.query(AdminUser).filter(AdminUser.email == payload.email).first()

    if not admin or not verify_password(payload.password, admin.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    token = create_access_token(subject=admin.email)
    return TokenResponse(access_token=token)


@router.get("/me", response_model=AdminOut)
def get_me(admin: AdminUser = Depends(get_current_admin)):
    return AdminOut(email=admin.email)
