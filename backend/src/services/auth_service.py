from sqlmodel import Session, select
from passlib.context import CryptContext
from ..models.user import User, UserCreate, UserRead
from typing import Optional
import uuid


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


class AuthService:
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        return pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(self, password: str) -> str:
        # Ensure password is not longer than 72 bytes for bcrypt
        password_bytes = password.encode('utf-8')
        if len(password_bytes) > 72:
            # Truncate to 72 bytes and decode back to string
            password = password_bytes[:72].decode('utf-8', errors='ignore')
        return pwd_context.hash(password)

    def create_user(self, user_data: UserCreate, db_session: Session) -> UserRead:
        # Check if user already exists
        existing_user = db_session.exec(
            select(User).where(User.email == user_data.email)
        ).first()

        if existing_user:
            raise ValueError("Email already registered")

        # Create new user
        user = User(
            email=user_data.email,
            password_hash=self.get_password_hash(user_data.password),
            first_name=user_data.first_name,
            last_name=user_data.last_name
        )

        db_session.add(user)
        db_session.commit()
        db_session.refresh(user)

        return UserRead.from_orm(user) if hasattr(UserRead, 'from_orm') else UserRead(
            id=user.id,
            email=user.email,
            first_name=user.first_name,
            last_name=user.last_name,
            created_at=user.created_at,
            updated_at=user.updated_at
        )

    def authenticate_user(self, email: str, password: str, db_session: Session) -> Optional[User]:
        user = db_session.exec(
            select(User).where(User.email == email)
        ).first()

        if not user or not self.verify_password(password, user.password_hash):
            return None

        return user