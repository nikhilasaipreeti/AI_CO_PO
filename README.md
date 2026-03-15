# AI CO-PO-PSO System

This repo runs a full stack app with:
- `frontend` (Vite + React)
- `backend` (Node/Express + MongoDB)
- `ai-engine` (FastAPI for AI routing)
- `analytics-engine` (FastAPI for attainment analytics)

## Local Dev (No Docker)
1. Create env files:
   - `backend/.env` using `backend/.env.example`
   - `ai-engine/.env` using `ai-engine/.env.example`
2. Start services (in separate terminals):
```bash
npm install --prefix backend
npm run dev --prefix backend

npm install --prefix frontend
npm run dev --prefix frontend

pip install -r ai-engine/requirements.txt
uvicorn main_ai_router:app --host 0.0.0.0 --port 8000 --reload

pip install -r analytics-engine/requirements.txt
uvicorn main_analytics_router:app --host 0.0.0.0 --port 8001 --reload
```

Frontend uses `/api` and Vite proxies to `http://localhost:5000`.

## Docker Compose
```bash
docker compose up --build
```
Frontend is available at `http://localhost:3000`.

## Render Deployment (MongoDB Atlas + Gemini)
This repo includes `render.yaml` for a multi-service deploy.

1. Create a MongoDB Atlas cluster and copy the connection string.
2. In Render, create services from `render.yaml`.
3. Set the following env vars in Render:
   - Backend: `MONGODB_URI`, `GEMINI_API_KEY`, `AI_ENGINE_URL`, `ANALYTICS_ENGINE_URL`, `CLIENT_URL`
   - AI engine: `GEMINI_API_KEY`
   - Frontend: `VITE_API_BASE_URL`

Example values (replace with your Render URLs):
```
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/<db>?retryWrites=true&w=majority
GEMINI_API_KEY=your_gemini_key
AI_ENGINE_URL=https://co-po-ai-engine.onrender.com
ANALYTICS_ENGINE_URL=https://co-po-analytics-engine.onrender.com
CLIENT_URL=https://co-po-frontend.onrender.com
VITE_API_BASE_URL=https://co-po-backend.onrender.com/api
```

## API Quick Checks
```
GET  /health
GET  /api/test
POST /api/generate-co
POST /api/map-questions
POST /api/upload-marks
POST /api/calculate-attainment
GET  /api/attainment-report
```
