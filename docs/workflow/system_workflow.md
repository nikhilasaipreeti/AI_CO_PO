# System Workflow ⚙️

## Technical Pipeline

```
1. Syllabus → POST /generate-co → AI Engine → COs generated
2. Questions → POST /map-questions → AI → Q-CO + Bloom mappings
3. Marks → POST /upload-marks → Data validated
4. Backend calls Analytics → CO/PO/PSO calculated
5. Results → Frontend dashboard + charts
6. Export → NBA/NAAC Excel report
```

## Error Handling
- Invalid syllabus → Default CO template
- Mapping confidence <70% → Manual override
- Missing marks → Zero attainment flagged

**End-to-end: <5 minutes** vs manual days.

