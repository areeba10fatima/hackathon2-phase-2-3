@echo off
echo Starting Todo Application...

REM Set environment variables for the available ports
set BACKEND_HOST=127.0.0.1
set BACKEND_PORT=5000
set FRONTEND_PORT=8443

echo Starting Backend Server on port %BACKEND_PORT%...
cd backend

REM Start the backend server in a new window
start "Backend Server" cmd /k "cd /d %~dp0backend && python -c ^"from src.main import app; import uvicorn; uvicorn.run(app, host='%BACKEND_HOST%', port=%BACKEND_PORT%, reload=False)^""

timeout /t 5 /nobreak >nul

echo Starting Frontend Server on port %FRONTEND_PORT%...
cd ../frontend

REM Set the correct backend URL for the frontend
echo NEXT_PUBLIC_API_BASE_URL=http://%BACKEND_HOST%:%BACKEND_PORT%/api > .env.local
echo NEXTAUTH_URL=http://localhost:%FRONTEND_PORT% >> .env.local
echo NEXTAUTH_SECRET=your-nextauth-secret >> .env.local

REM Start the frontend server in a new window
start "Frontend Server" cmd /k "cd /d %~dp0frontend && npm run dev -- -p %FRONTEND_PORT%"

echo.
echo Applications are starting...
echo Backend: http://%BACKEND_HOST%:%BACKEND_PORT%
echo Frontend: http://localhost:%FRONTEND_PORT%
echo.
echo Please wait for the servers to start completely before accessing them.
pause