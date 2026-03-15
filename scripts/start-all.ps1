$ErrorActionPreference = 'Stop'

$root = Split-Path -Parent $PSScriptRoot
$python = "C:\Users\Sreekara Penugonda\AppData\Local\Programs\Python\Python310\python.exe"

Write-Host "Starting backend, frontend, ai-engine, analytics-engine..."

Start-Process cmd -ArgumentList '/k','npm start --prefix backend' -WorkingDirectory $root
Start-Process cmd -ArgumentList '/k','npm run dev --prefix frontend' -WorkingDirectory $root
Start-Process cmd -ArgumentList '/k',"`"$python`" -m uvicorn main_ai_router:app --host 0.0.0.0 --port 8000 --reload" -WorkingDirectory (Join-Path $root 'ai-engine')
Start-Process cmd -ArgumentList '/k',"`"$python`" -m uvicorn main_analytics_router:app --host 0.0.0.0 --port 8001 --reload" -WorkingDirectory (Join-Path $root 'analytics-engine')

Write-Host "Done."
Write-Host "Frontend: http://localhost:8080"
Write-Host "Backend:  http://localhost:5000"
Write-Host "AI:       http://localhost:8000/health"
Write-Host "Analytics:http://localhost:8001/health"
