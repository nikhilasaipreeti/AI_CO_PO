# Running the Project ▶️

## Start Services
Terminal 1 (Backend):
```
cd backend
npm start
# http://localhost:3000
```

Terminal 2 (Analytics):
```
cd analytics-engine
venv\Scripts\activate
python main_analytics_router.py
# http://localhost:8001/docs
```

## Live Demo
1. Open frontend/login.html
2. Login → Dashboard
3. Upload sample syllabus from data/
4. Follow [Demo Script](../presentation/demo_script.md)

## Test Endpoints
```
curl -X POST http://localhost:3000/generate-co -d '{"syllabus": "..."}'
```

Ready in **2 minutes**.

