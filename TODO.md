# AI CO-PO-PSO Complete System Integration TODO

## Status: ✅ Plan Approved - Full project integration across all folders (frontend, backend, ai-engine, analytics-engine, data)

**Current Progress:** 2/25 steps complete

## Phase 1: Setup & Config (3 steps)
- [✅] 1.1 Update all package.json/requirements.txt + install deps (backend, frontend, ai, analytics)
- [ ] 1.2 Configure .env files (keys, ports, MongoDB, Gemini)
- [ ] 1.3 Run MongoDB + seed data with node backend/scripts/seed.js

## Phase 2: Backend Completion (5 steps)
- [✅] 2.1 Complete backend controllers (auth, course, assessment, attainment, chat) - course.generateCOs & assessment.mapQuestions now use AI proxy
- [ ] 2.2 Implement API proxy to ai-engine/analytics-engine (http calls)
- [ ] 2.3 Add file upload middleware (multer for syllabus/marks)
- [ ] 2.4 Complete all models + relationships (Course → CO → Question → Marks → Attainment)
- [ ] 2.5 Test backend endpoints (Postman/curl)

## Phase 3: AI Engine Integration (4 steps)
- [ ] 3.1 Implement real Gemini calls in ai-engine/services/*.py
- [ ] 3.2 Update prompts with data/bloom_taxonomy/program_outcomes
- [ ] 3.3 Expose FastAPI endpoints with CORS
- [ ] 3.4 Test: syllabus → COs, questions → mappings

## Phase 4: Analytics Engine Integration (4 steps)
- [ ] 4.1 Wire CO-PO-PSO mappings from data/mappings/*.json
- [ ] 4.2 Complete attainment math (direct, indirect, weighted)
- [ ] 4.3 Excel/CSV → marks → attainment pipeline
- [ ] 4.4 Test with data/marks/*.json + sample data

## Phase 5: Frontend Integration (6 steps)
- [ ] 5.1 Add CourseContext + workflow state (multi-step)
- [ ] 5.2 Replace mocks with API calls (GenerateCO, QuestionMapping, MarksUpload)
- [ ] 5.3 Connect AttainmentDashboard to real data + charts
- [ ] 5.4 Add auth flow (Login → protected routes)
- [ ] 5.5 Vignan navbar/hero + responsive fixes
- [ ] 5.6 File upload → backend → processing feedback

## Phase 6: End-to-End + Testing (3 steps)
- [ ] 6.1 Full workflow test (syllabus→dashboard→reports)
- [ ] 6.2 Add error handling + loading states
- [ ] 6.3 Generate PDF/Excel reports

**Next Step:** Start Phase 1.1 - dependency updates & installs

**Run Command After Each Phase:** `npm run dev` (frontend/backend), Python services on 8000/8001

