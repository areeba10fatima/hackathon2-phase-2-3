# API Contracts: Full-Stack Multi-User Todo Application

**Feature**: 1-fullstack-todo-app
**Date**: 2026-01-28

## Overview

This document defines the API contracts for the full-stack todo application based on the functional requirements in the specification.

## Authentication Endpoints

### POST /api/auth/register
Register a new user account

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "first_name": "John",
  "last_name": "Jane"
}
```

**Response**:
- 201 Created: User registered successfully
```json
{
  "id": "uuid-string",
  "email": "user@example.com",
  "first_name": "John",
  "last_name": "Jane",
  "created_at": "2026-01-28T12:00:00Z"
}
```
- 400 Bad Request: Invalid input data
- 409 Conflict: Email already exists

### POST /api/auth/login
Authenticate user and return JWT token

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response**:
- 200 OK: Login successful
```json
{
  "access_token": "jwt-token-string",
  "token_type": "bearer",
  "user": {
    "id": "uuid-string",
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Jane"
  }
}
```
- 401 Unauthorized: Invalid credentials

### POST /api/auth/logout
Logout user (optional endpoint for token invalidation)

**Headers**:
```
Authorization: Bearer {access_token}
```

**Response**:
- 200 OK: Logout successful

## Task Management Endpoints

### GET /api/tasks
Retrieve user's tasks with optional filtering

**Headers**:
```
Authorization: Bearer {access_token}
```

**Query Parameters**:
- `completed`: boolean (optional) - Filter by completion status
- `limit`: integer (optional) - Limit number of results
- `offset`: integer (optional) - Offset for pagination

**Response**:
- 200 OK: Tasks retrieved successfully
```json
{
  "tasks": [
    {
      "id": "uuid-string",
      "title": "Complete project",
      "description": "Finish the todo app implementation",
      "completed": false,
      "created_at": "2026-01-28T12:00:00Z",
      "updated_at": "2026-01-28T12:00:00Z"
    }
  ],
  "total_count": 1
}
```
- 401 Unauthorized: Missing or invalid token

### POST /api/tasks
Create a new task

**Headers**:
```
Authorization: Bearer {access_token}
```

**Request**:
```json
{
  "title": "Complete project",
  "description": "Finish the todo app implementation"
}
```

**Response**:
- 201 Created: Task created successfully
```json
{
  "id": "uuid-string",
  "title": "Complete project",
  "description": "Finish the todo app implementation",
  "completed": false,
  "user_id": "user-uuid-string",
  "created_at": "2026-01-28T12:00:00Z",
  "updated_at": "2026-01-28T12:00:00Z"
}
```
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Missing or invalid token

### GET /api/tasks/{task_id}
Retrieve a specific task

**Headers**:
```
Authorization: Bearer {access_token}
```

**Parameters**:
- `task_id`: UUID - The ID of the task to retrieve

**Response**:
- 200 OK: Task retrieved successfully
```json
{
  "id": "uuid-string",
  "title": "Complete project",
  "description": "Finish the todo app implementation",
  "completed": false,
  "user_id": "user-uuid-string",
  "created_at": "2026-01-28T12:00:00Z",
  "updated_at": "2026-01-28T12:00:00Z"
}
```
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: User doesn't own the task
- 404 Not Found: Task doesn't exist

### PUT /api/tasks/{task_id}
Update a specific task

**Headers**:
```
Authorization: Bearer {access_token}
```

**Parameters**:
- `task_id`: UUID - The ID of the task to update

**Request**:
```json
{
  "title": "Updated project title",
  "description": "Updated description",
  "completed": true
}
```

**Response**:
- 200 OK: Task updated successfully
```json
{
  "id": "uuid-string",
  "title": "Updated project title",
  "description": "Updated description",
  "completed": true,
  "user_id": "user-uuid-string",
  "created_at": "2026-01-28T12:00:00Z",
  "updated_at": "2026-01-28T13:00:00Z"
}
```
- 400 Bad Request: Invalid input data
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: User doesn't own the task
- 404 Not Found: Task doesn't exist

### PATCH /api/tasks/{task_id}/toggle-complete
Toggle the completion status of a task

**Headers**:
```
Authorization: Bearer {access_token}
```

**Parameters**:
- `task_id`: UUID - The ID of the task to update

**Response**:
- 200 OK: Task completion status toggled successfully
```json
{
  "id": "uuid-string",
  "title": "Complete project",
  "description": "Finish the todo app implementation",
  "completed": true,
  "user_id": "user-uuid-string",
  "created_at": "2026-01-28T12:00:00Z",
  "updated_at": "2026-01-28T13:00:00Z"
}
```
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: User doesn't own the task
- 404 Not Found: Task doesn't exist

### DELETE /api/tasks/{task_id}
Delete a specific task

**Headers**:
```
Authorization: Bearer {access_token}
```

**Parameters**:
- `task_id`: UUID - The ID of the task to delete

**Response**:
- 204 No Content: Task deleted successfully
- 401 Unauthorized: Missing or invalid token
- 403 Forbidden: User doesn't own the task
- 404 Not Found: Task doesn't exist

## Error Response Format

All error responses follow this format:
```json
{
  "detail": "Human-readable error message"
}
```

## Security Requirements

- All endpoints except authentication endpoints require JWT token in Authorization header
- User ID in JWT token must match the resource owner for access
- Return 401 for invalid/missing tokens
- Return 403 for valid token but unauthorized access to resource
- Return 404 for resources that don't exist rather than 403 to avoid leaking information