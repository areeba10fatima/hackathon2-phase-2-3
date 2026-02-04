from fastapi import APIRouter, Depends, HTTPException, status, Query
from sqlmodel import Session
from typing import List, Optional
from uuid import UUID
from ..database.database import get_session
from ..models.task import TaskCreate, TaskRead, TaskUpdate, TaskPatch
from ..models.user import User
from ..services.task_service import TaskService
from ..middleware.jwt_auth import get_current_user


router = APIRouter(prefix="/tasks", tags=["tasks"])


@router.get("/", response_model=List[TaskRead])
def get_tasks(
    completed: Optional[bool] = Query(None),
    limit: Optional[int] = Query(None, ge=1),
    offset: Optional[int] = Query(None, ge=0),
    current_user: User = Depends(get_current_user),
    db_session: Session = Depends(get_session)
):
    task_service = TaskService()
    tasks = task_service.get_tasks_by_user(
        user_id=current_user.id,
        db_session=db_session,
        completed=completed,
        limit=limit,
        offset=offset
    )
    return tasks


@router.post("/", response_model=TaskRead, status_code=status.HTTP_201_CREATED)
def create_task(
    task_data: TaskCreate,
    current_user: User = Depends(get_current_user),
    db_session: Session = Depends(get_session)
):
    task_service = TaskService()
    task = task_service.create_task(task_data, current_user.id, db_session)
    return task


@router.get("/{task_id}", response_model=TaskRead)
def get_task(
    task_id: UUID,
    current_user: User = Depends(get_current_user),
    db_session: Session = Depends(get_session)
):
    task_service = TaskService()
    task = task_service.get_task_by_id_and_user(task_id, current_user.id, db_session)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


@router.put("/{task_id}", response_model=TaskRead)
def update_task(
    task_id: UUID,
    task_data: TaskUpdate,
    current_user: User = Depends(get_current_user),
    db_session: Session = Depends(get_session)
):
    task_service = TaskService()
    task = task_service.update_task(task_id, task_data, current_user.id, db_session)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


@router.patch("/{task_id}/toggle-complete", response_model=TaskRead)
def toggle_task_complete(
    task_id: UUID,
    current_user: User = Depends(get_current_user),
    db_session: Session = Depends(get_session)
):
    task_service = TaskService()
    task = task_service.toggle_task_completion(task_id, current_user.id, db_session)

    if not task:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return task


@router.delete("/{task_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    task_id: UUID,
    current_user: User = Depends(get_current_user),
    db_session: Session = Depends(get_session)
):
    task_service = TaskService()
    success = task_service.delete_task(task_id, current_user.id, db_session)

    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Task not found"
        )

    return