# Full Stack Todo Application - Startup Guide

## Running the Application

The application consists of three components:
1. Backend (Python/FastAPI) - Port 8000
2. Frontend (Next.js/React) - Port 3000
3. Chatbot (Node.js/Express) - Port 3001

## Quick Start (Windows):

Double-click `start_app.bat` to launch all services in separate windows.

## Manual Start:

If you prefer to start services manually:

### Terminal 1 - Backend:
```cmd
cd C:\Users\ANAS\Desktop\todo2\backend
uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload
```

### Terminal 2 - Frontend:
```cmd
cd C:\Users\ANAS\Desktop\todo2\frontend
npm run dev
```

### Terminal 3 - Chatbot:
```cmd
cd C:\Users\ANAS\Desktop\todo2\phase-3-nlp-chatbot
npm run dev
```

## Accessing the Application:

- Frontend UI: http://localhost:3000
- Backend API: http://localhost:8000
- Backend API Docs: http://localhost:8000/docs
- Chatbot API: http://localhost:3001

## Troubleshooting:

1. Make sure all dependencies are installed (already done):
   - Backend: `pip install -r requirements.txt`
   - Frontend: `npm install`
   - Chatbot: `npm install`

2. Ensure ports 8000, 3000, and 3001 are available

3. Check that your .env file contains:
   ```
   DATABASE_URL=sqlite:///./todo.db
   JWT_SECRET_KEY=supersecretkeyfordevelopment
   JWT_ALGORITHM=HS256
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

All components are ready to run. Enjoy your full-stack todo application!