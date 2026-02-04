# Quickstart Guide: Full-Stack Multi-User Todo Application

**Feature**: 1-fullstack-todo-app
**Date**: 2026-01-28

## Overview

This guide provides step-by-step instructions to set up, develop, and deploy the full-stack todo application with authentication and task management.

## Prerequisites

- Node.js 18+ installed
- Python 3.11+ installed
- PostgreSQL client tools
- Git
- A Neon Serverless PostgreSQL account

## Development Setup

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd <repository-name>
git checkout 1-fullstack-todo-app
```

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

### 4. Environment Configuration
Create `.env` files in both backend and frontend directories:

**Backend (.env):**
```
DATABASE_URL=postgresql://username:password@ep-xxx.us-east-1.aws.neon.tech/dbname
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30
```

**Frontend (.env.local):**
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret
```

### 5. Database Setup
```bash
cd backend
alembic upgrade head
```

### 6. Run Development Servers

**Backend:**
```bash
cd backend
uvicorn src.main:app --reload --port 8000
```

**Frontend:**
```bash
cd frontend
npm run dev
```

Application will be available at http://localhost:3000

## Key Features

### Authentication Flow
1. User registers at `/signup` or logs in at `/login`
2. JWT token is stored securely in browser
3. All API requests include Authorization header with JWT

### Task Management
1. Authenticated users can create tasks at `/dashboard`
2. Tasks are filtered by user ownership automatically
3. Users can mark tasks as complete/incomplete
4. Users can edit or delete their own tasks

### Security Features
- JWT token validation on all protected endpoints
- User data isolation (can't access other users' tasks)
- Password hashing with bcrypt
- Input validation on all endpoints

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register new user
- POST `/api/auth/login` - Authenticate user
- POST `/api/auth/logout` - Logout user

### Task Management
- GET `/api/tasks` - Get user's tasks
- POST `/api/tasks` - Create new task
- GET `/api/tasks/{id}` - Get specific task
- PUT `/api/tasks/{id}` - Update task
- PATCH `/api/tasks/{id}/toggle-complete` - Toggle completion
- DELETE `/api/tasks/{id}` - Delete task

## Testing

### Backend Tests
```bash
cd backend
pytest
```

### Frontend Tests
```bash
cd frontend
npm test
```

## Deployment

### Environment Variables
Set the same environment variables in your deployment environment as in the development setup.

### Build Commands
**Frontend:**
```bash
cd frontend
npm run build
```

**Backend:**
Deploy to a service that supports Python applications (like Heroku, Railway, or AWS).

## Troubleshooting

### Common Issues
1. **Database Connection Errors**: Verify DATABASE_URL is correct and Neon project is active
2. **JWT Validation Failures**: Check that JWT_SECRET matches between frontend and backend
3. **CORS Errors**: Ensure frontend and backend URLs are properly configured

### Reset Database
```bash
cd backend
alembic downgrade base
alembic upgrade head
```

## Next Steps

1. Implement additional features like task categories or due dates
2. Add comprehensive logging and monitoring
3. Set up automated testing pipeline
4. Implement advanced search and filtering capabilities