@echo off
echo Starting services on different ports to avoid conflicts...

REM Start mock backend on port 8080 instead of 8000
start "Todo Mock Backend" cmd /k "cd /d %~dp0 && echo Starting Mock Backend on http://localhost:8080... && node mock-backend-port8080.js"

REM Wait a moment for backend to start
timeout /t 5 /nobreak >nul

REM Start frontend on port 4000 instead of 3000
start "Todo Frontend" cmd /k "cd /d %~dp0frontend && echo Starting Frontend on http://localhost:4000... && npx next dev --port 4000"

REM Wait a moment for frontend to start
timeout /t 5 /nobreak >nul

REM Start chatbot on port 5000 instead of 3001
start "Todo Chatbot" cmd /k "cd /d %~dp0phase-3-nlp-chatbot && echo Starting Chatbot on http://localhost:5000... && npm run dev"

echo.
echo Services initiated on different ports:
echo.
echo Mock Backend: http://localhost:8080
echo Frontend: http://localhost:4000
echo Chatbot: http://localhost:5000
echo.
echo Open your browser to http://localhost:4000 for the frontend
echo.
pause