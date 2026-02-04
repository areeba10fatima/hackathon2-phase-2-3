@echo off
echo Starting Mock Backend, Frontend and Chatbot...

REM Start mock backend in a new window
start "Todo Mock Backend" cmd /k "cd /d %~dp0 && echo Starting Mock Backend on http://localhost:8000... && node mock-backend.js"

REM Wait a moment for backend to start
timeout /t 5 /nobreak >nul

REM Start frontend in a new window
start "Todo Frontend" cmd /k "cd /d %~dp0frontend && echo Starting Frontend on http://localhost:3000... && npm run dev"

REM Wait a moment for frontend to start
timeout /t 5 /nobreak >nul

REM Start chatbot in a new window
start "Todo Chatbot" cmd /k "cd /d %~dp0phase-3-nlp-chatbot && echo Starting Chatbot on http://localhost:3001... && npm run dev"

echo.
echo Three services initiated successfully!
echo.
echo Mock Backend: http://localhost:8000
echo Frontend: http://localhost:3000
echo Chatbot: http://localhost:3001
echo.
echo NOTE: Three command windows will open for each service.
echo Close this window and use Ctrl+C in each service window to stop.
echo.
pause