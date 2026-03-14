# Module Interactions 🔗

## How Components Communicate

```
Frontend --HTTP--> Backend (app.js)
Backend --Gemini API--> AI Engine (gemini.service.js)
Backend --spawn()--> Analytics Engine (Python)
Analytics <--Data--> Backend <--Excel/JSON--> Data Layer
```

## Key Interactions
1. **Backend → AI**: POST syllabus/questions to Gemini
2. **Backend → Analytics**: Child process call to main_analytics_router.py
3. **Frontend → Backend**: AJAX calls to /generate-co, /attainment
4. **Data Flow**: JSON contracts between modules

## API Contracts
- AI returns: `{cos: [...], mappings: {Q1: 'CO1'}}`
- Analytics returns: `{co_attainments: [...], po: ..., student_stats: {}}`

Isolation ensures independent development.

