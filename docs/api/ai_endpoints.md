# AI Endpoints 🤖

## POST /generate-co
**Generate Course Outcomes**

**Input**: `{syllabus: "text", pos: [...], psos: [...]}`

**Output**: `{cos: ["CO1: Student can...", "CO2: ..."]}`

## POST /map-questions
**Map Questions to CO + Bloom**

**Input**: `{questions: ["Q1: What is...", "Q2: Implement..."], cos: [...]}`

**Output**: `{mappings: {"Q1": {"co": "CO1", "bloom": "Understand"}}, confidence: 0.92}`

Powered by Gemini AI in AI_engine/gemini.service.js.

