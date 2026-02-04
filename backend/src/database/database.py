from sqlmodel import create_engine, Session
from decouple import config


# Database URL from environment variable
DATABASE_URL = config(
    "DATABASE_URL",
    default="postgresql://user:password@localhost:5432/todo_db"
)


# Create engine
engine = create_engine(DATABASE_URL, echo=True)


def get_session():
    with Session(engine) as session:
        yield session