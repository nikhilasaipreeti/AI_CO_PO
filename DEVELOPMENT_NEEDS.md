# AI CO-PO-PSO System - Remaining Development Tasks

## Current Status: 70% Complete - AI Backend + UI Ready

## 1. IMMEDIATE SETUP (30 min)
```
1. backend/.env:
GEMINI_API_KEY=your_ai.google.dev_key
MONGODB_URI=mongodb://localhost:27017/CO_PO
PORT=5000
CLIENT_URL=http://localhost:3000

2. cd backend && npm i && npm run dev
3. cd frontend && npm i && npm run dev
4. cd ai-engine && pip i -r requirements.txt && uvicorn main_ai_router:app --reload --port 8000
```

## 2. CRITICAL FIXES (2 hrs)
- [ ] Python engines: Add FastAPI apps (app.py missing in ai-engine/analytics-engine)
  ```python
  from fastapi import FastAPI
  app = FastAPI()
  @app.post("/analyze")
  async def analyze(request: dict):
      return route_request(**request)
  ```
- [ ] Controllers: Replace array mocks → MongoDB (Course.find(), etc.)
- [ ] Multer Excel parser → marks storage

## 3. AI PIPELINE (4 hrs)
```
syllabus → ai-proxy.generateCOs (Gemini ✅) → store COs
questions → ai-proxy.mapQuestions → store mappings  
marks CSV → parse → calculateAttainment → dashboard
```

## 4. FRONTEND INTEGRATION (4 hrs)
```
GenerateCO.tsx: POST /api/courses/1/generate-cos {syllabus}
QuestionMapping.tsx: POST /api/assessment/exam/1/map-questions {questions, cos}
MarksUpload.tsx: POST /api/marks/upload file
AttainmentDashboard.tsx: GET /api/attainment/course/1
```

## 5. PRODUCTION FEATURES (4 hrs)
```
[ ] Auth: JWT login → protected routes
[ ] Mongo relationships: Course hasMany CO → Question → Marks → Attainment
[ ] PDF/Excel reports (pdfkit, xlsx)
[ ] Multi-course dashboard
[ ] Error/loading states
```

## Test Commands
```bash
# Backend test
curl -X POST http://localhost:5000/api/courses/1/generate-cos \\
  -H "Content-Type: application/json" \\
  -d '{"syllabus":"Data Structures course syllabus text..."}'

# Frontend
npm run dev --prefix frontend
```

## Priority: Backend Mongo + Frontend API hooks = Live demo in 4 hrs!

**Next:** Confirm GEMINI_KEY set → test backend → frontend integration?
