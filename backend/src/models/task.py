from sqlmodel import SQLModel, Field
from datetime import datetime
import uuid


class TaskBase(SQLModel):
    title: str
    description: str | None = None
    completed: bool = False


class TaskCreate(TaskBase):
    type: str = "general"


class Task(TaskBase, table=True):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    type: str = Field(default="general")
    user_id: uuid.UUID = Field(foreign_key="user.id")


class TaskRead(TaskBase):
    id: uuid.UUID
    created_at: datetime
    updated_at: datetime
    type: str
    user_id: uuid.UUID


class TaskUpdate(SQLModel):
    title: str | None = None
    description: str | None = None
    completed: bool | None = None
    type: str | None = None


class TaskPatch(SQLModel):
    completed: bool | None = None