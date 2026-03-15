from fastapi import FastAPI, UploadFile, File, HTTPException
from pydantic import BaseModel
import uvicorn
import os
from models.data_models import MarksData
from models.attainment_models import AnalyticsResult
from services.co_attainment import calculate_co_attainment
from services.po_attainment import calculate_po_attainment
from services.pso_attainment import calculate_pso_attainment
from services.student_analysis import analyze_student_performance
from services.bloom_analysis import analyze_bloom_performance
from services.coverage_analysis import analyze_course_coverage
from utils.excel_parser import load_data_from_excel

app = FastAPI(title="Analytics Engine")

class AnalyticsRequest(BaseModel):
    data: MarksData  # Or file path

@app.post("/analyze", response_model=AnalyticsResult)
async def full_analytics(request: AnalyticsRequest):
    """Full OBE analytics pipeline."""
    co_res = calculate_co_attainment({'marks_data': request.data})
    po_res = calculate_po_attainment(co_res, request.data.copo_map)
    pso_res = calculate_pso_attainment(co_res, [])  # PSO map TBD
    student_stats = analyze_student_performance(request.data)
    bloom_stats = analyze_bloom_performance(request.data)
    gaps = analyze_course_coverage(request.data.qco_map)
    
    # TODO: viz plots
    return AnalyticsResult(
        co_attainments=co_res,
        po_attainments=po_res,
        pso_attainments=pso_res,
        student_stats=student_stats,
        bloom_stats=bloom_stats,
        coverage_gaps=gaps
    )

@app.post("/upload_excel")
async def upload_excel(file: UploadFile = File(...)):
    """Upload Excel for analysis."""
    try:
        data = load_data_from_excel(file.file, file.filename or "")
        return await full_analytics(AnalyticsRequest(data=data))
    except Exception as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc

@app.get("/health")
async def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)

