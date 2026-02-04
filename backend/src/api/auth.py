from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session
from datetime import timedelta
from ..database.database import get_session
from ..models.user import UserCreate, UserRead
from ..services.auth_service import AuthService
from ..middleware.jwt_auth import create_access_token


router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def register(user_data: UserCreate, db_session: Session = Depends(get_session)):
    auth_service = AuthService()
    try:
        user = auth_service.create_user(user_data, db_session)
        return user
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=str(e)
        )


from pydantic import BaseModel

class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(login_request: LoginRequest, db_session: Session = Depends(get_session)):
    email = login_request.email
    password = login_request.password
    auth_service = AuthService()
    user = auth_service.authenticate_user(email, password, db_session)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(
        data={"sub": str(user.id)}, expires_delta=access_token_expires
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user.id,
            "email": user.email,
            "first_name": user.first_name,
            "last_name": user.last_name
        }
    }


@router.post("/logout")
def logout():
    # In a real implementation, you might want to invalidate the token
    # For now, we'll just return a success message
    return {"message": "Logged out successfully"}