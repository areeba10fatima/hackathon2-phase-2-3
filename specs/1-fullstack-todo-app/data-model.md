# Data Model: Full-Stack Multi-User Todo Application

**Feature**: 1-fullstack-todo-app
**Date**: 2026-01-28

## Overview

This document defines the data models for the full-stack todo application, including entities, relationships, and validation rules based on the feature specification.

## Entity: User

**Description**: Represents a registered user with authentication credentials and identification

**Fields**:
- `id`: UUID (Primary Key, Auto-generated)
- `email`: String (Required, Unique, Max length: 255, Valid email format)
- `password_hash`: String (Required, Hashed using secure algorithm)
- `first_name`: String (Optional, Max length: 100)
- `last_name`: String (Optional, Max length: 100)
- `created_at`: DateTime (Auto-generated on creation)
- `updated_at`: DateTime (Auto-generated on update)

**Validation Rules**:
- Email must be unique across all users
- Email must follow valid email format
- Password must be hashed before storing
- Email and password required for registration

**Relationships**:
- One-to-Many: User → Tasks (via user_id foreign key)

## Entity: Task

**Description**: Represents a todo item owned by a specific user, with title, description, completion status, and timestamps

**Fields**:
- `id`: UUID (Primary Key, Auto-generated)
- `title`: String (Required, Max length: 255)
- `description`: Text (Optional, Max length: 1000)
- `completed`: Boolean (Default: False)
- `user_id`: UUID (Foreign Key, References User.id, Required)
- `created_at`: DateTime (Auto-generated on creation)
- `updated_at`: DateTime (Auto-generated on update)

**Validation Rules**:
- Title is required
- User_id must reference an existing user
- Only the task owner can modify/delete the task
- Completion status can be toggled by the owner

**Relationships**:
- Many-to-One: Task → User (via user_id foreign key)

## Database Schema Design

### Users Table
```
users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

### Tasks Table
```
tasks (
  id UUID PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  completed BOOLEAN DEFAULT FALSE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
)
```

## Indexes

- Index on `users.email` for efficient login lookup
- Index on `tasks.user_id` for efficient user-specific task queries
- Index on `tasks.completed` for efficient filtering by completion status

## Security Considerations

- Passwords must be hashed using a secure algorithm (bcrypt or similar)
- User ID in JWT token must match the user_id in the database record for access control
- Foreign key constraints ensure referential integrity
- Cascade delete on user removal removes associated tasks