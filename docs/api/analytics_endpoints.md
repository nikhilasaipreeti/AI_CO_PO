# Analytics Endpoints 📊

## POST /analyze
**Full OBE Analytics**

**Input**: `{marks_data: {students: [...], qco_map: [...]}}`

**Output**: `{co_attainments: [...], po_attainments: [...], student_stats: {avg: 75, ...}}`

## POST /co_attainment
**Direct CO Calculation**

**Input**: Marks + Q-CO mapping

**Output**: CO percentages + levels + threshold status

Powered by analytics-engine Python services (FastAPI).

See [main_analytics_router.py](../analytics-engine/main_analytics_router.py)

