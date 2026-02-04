@echo off
echo Starting Full Stack Todo Application...

REM Start backend in a new window
start "Todo Backend" cmd /k "cd /d %~dp0backend && echo Starting Backend... && python -m uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload"

REM Wait a moment for backend to start
timeout /t 5 /nobreak >nul

REM Start frontend in a new window
start "Todo Frontend" cmd /k "cd /d %~dp0frontend && echo Starting Frontend... && npm run dev"

REM Wait a moment for frontend to start
timeout /t 5 /nobreak >nul

REM Start chatbot in a new window
start "Todo Chatbot" cmd /k "cd /d %~dp0phase-3-nlp-chatbot && echo Starting Chatbot... && npm run dev"

echo.
echo All services initiated successfully!
echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo Chatbot: http://localhost:3001
echo.
echo NOTE: Individual command windows will open for each service.
echo Close this window and use Ctrl+C in each service window to stop.
echo.
pause