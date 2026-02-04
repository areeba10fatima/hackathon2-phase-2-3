# Frontend, Chatbot, and Mock Backend - Startup Guide

## Running the Application

This setup runs:
1. Mock Backend (Node.js/Express) - Port 8000
2. Frontend (Next.js/React) - Port 3000
3. Chatbot (Node.js/Express) - Port 3001

## Quick Start (Windows):

Double-click `start_frontend_chatbot_only.bat` to launch all services in separate windows.

## Accessing the Application:

- Mock Backend: http://localhost:8000
- Frontend UI: http://localhost:3000
- Chatbot API: http://localhost:3001

## Why This Setup:

The frontend and chatbot need to connect to a backend API. The mock backend provides:
- API endpoints for todo operations
- Authentication endpoints
- Proper connectivity for the frontend and chatbot to work

## Troubleshooting:

1. All dependencies are already installed
2. Ensure ports 8000, 3000, and 3001 are available
3. The frontend is configured to connect to the backend API

All components are ready to run. Enjoy your frontend and chatbot!