# Data Flow 🔄

## End-to-End Pipeline

```
1. Syllabus Upload
   ↓
2. AI generates COs (gemini.service.js)
   ↓
3. Upload question paper
   ↓
4. AI maps Q→CO + Bloom (gemini.service.js)
   ↓
5. Upload student marks
   ↓
6. Analytics calculates attainment (analytics-engine/services/)
   ↓
7. Dashboard shows results + charts
   ↓
8. Export NBA/NAAC report (Excel)
```

## Detailed Steps
1. **Input**: Syllabus text → AI → CO list
2. **Mapping**: Questions → COs/Bloom via NLP
3. **Calculation**: Marks + mappings → % + levels
4. **Output**: PO/PSO, student stats, coverage gaps

Flow ensures **zero manual mapping**.

