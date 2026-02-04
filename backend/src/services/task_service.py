from sqlmodel import Session, select
from typing import List, Optional
from uuid import UUID
from ..models.task import Task, TaskCreate, TaskUpdate, TaskPatch
from ..models.user import User


class TaskService:
    def create_task(self, task_data: TaskCreate, user_id: UUID, db_session: Session) -> Task:
        task = Task(**task_data.dict(), user_id=user_id)
        db_session.add(task)
        db_session.commit()
        db_session.refresh(task)
        return task

    def get_tasks_by_user(
        self,
        user_id: UUID,
        db_session: Session,
        completed: Optional[bool] = None,
        limit: Optional[int] = None,
        offset: Optional[int] = None
    ) -> List[Task]:
        query = select(Task).where(Task.user_id == user_id)

        if completed is not None:
            query = query.where(Task.completed == completed)

        if limit is not None:
            query = query.limit(limit)

        if offset is not None:
            query = query.offset(offset)

        tasks = db_session.exec(query).all()
        return tasks

    def get_task_by_id_and_user(self, task_id: UUID, user_id: UUID, db_session: Session) -> Optional[Task]:
        task = db_session.exec(
            select(Task).where(Task.id == task_id, Task.user_id == user_id)
        ).first()
        return task

    def update_task(self, task_id: UUID, task_data: TaskUpdate, user_id: UUID, db_session: Session) -> Optional[Task]:
        task = self.get_task_by_id_and_user(task_id, user_id, db_session)
        if not task:
            return None

        update_data = task_data.dict(exclude_unset=True)
        for field, value in update_data.items():
            setattr(task, field, value)

        db_session.add(task)
        db_session.commit()
        db_session.refresh(task)
        return task

    def toggle_task_completion(self, task_id: UUID, user_id: UUID, db_session: Session) -> Optional[Task]:
        task = self.get_task_by_id_and_user(task_id, user_id, db_session)
        if not task:
            return None

        task.completed = not task.completed
        db_session.add(task)
        db_session.commit()
        db_session.refresh(task)
        return task

    def delete_task(self, task_id: UUID, user_id: UUID, db_session: Session) -> bool:
        task = self.get_task_by_id_and_user(task_id, user_id, db_session)
        if not task:
            return False

        db_session.delete(task)
        db_session.commit()
        return True