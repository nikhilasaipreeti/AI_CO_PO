# AI-Based CO-PO-PSO Mapping and Attainment System 🚀

## Problem Statement
Manual Outcome Based Education (OBE) attainment calculation is **time-consuming and error-prone**:
- Faculty manually map questions to Course Outcomes (COs)
- Bloom taxonomy classification is subjective
- Attainment calculations require Excel formulas
- PO/PSO mapping is repetitive

## Our Solution
**AI-powered automation** for entire OBE workflow:

```
Syllabus → AI CO Generation → Question Mapping → Marks Upload → Analytics → Reports
```

## Key Features ✨
- **AI CO Generation**: Gemini-powered course outcomes from syllabus
- **Smart Question Mapping**: Auto-maps questions to COs + Bloom levels
- **Automated Attainment**: CO/PO/PSO calculations with levels (L0-L3)
- **Student Analytics**: Top/weak performers, clustering
- **Course Coverage**: Identifies gaps in assessment
- **Export Reports**: NBA/NAAC ready Excel/PDF

## Architecture Overview
```
Frontend Dashboard → Backend API → AI Engine + Analytics Engine → Data Layer
```

![System Architecture](architecture/system_architecture.md)

## Technologies Used 🛠️
- **Frontend**: HTML/CSS/JS
- **Backend**: Node.js/Express
- **AI**: Google Gemini API
- **Analytics**: Python (Pandas/Scikit-learn)
- **Data**: JSON/Excel

## Quick Start 🚀
1. `cd backend && npm install && node app.js`
2. `cd frontend && open login.html`
3. Upload syllabus → Generate COs → Map questions → Upload marks → View reports

## Modules
- [AI Engine](AI_engine/) - NLP tasks
- [Analytics Engine](analytics-engine/) - Attainment calcs
- [Full Docs](docs/)

See [Demo Script](presentation/demo_script.md) for live walkthrough.

---
**Transforming OBE from manual drudgery to AI automation.**

