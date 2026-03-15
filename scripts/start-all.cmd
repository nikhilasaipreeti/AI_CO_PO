@echo off
set ROOT=%~dp0..
set PY=C:\Users\Sreekara Penugonda\AppData\Local\Programs\Python\Python310\python.exe

echo Starting backend, frontend, ai-engine, analytics-engine...

start "backend" cmd /k "cd /d %ROOT% && npm start --prefix backend"
start "frontend" cmd /k "cd /d %ROOT% && npm run dev --prefix frontend"
start "ai-engine" cmd /k "cd /d %ROOT%\ai-engine && \"%PY%\" -m uvicorn main_ai_router:app --host 0.0.0.0 --port 8000 --reload"
start "analytics-engine" cmd /k "cd /d %ROOT%\analytics-engine && \"%PY%\" -m uvicorn main_analytics_router:app --host 0.0.0.0 --port 8001 --reload"

echo Done.
echo Frontend:  http://localhost:8080
echo Backend:   http://localhost:5000
echo AI:        http://localhost:8000/health
echo Analytics: http://localhost:8001/health
