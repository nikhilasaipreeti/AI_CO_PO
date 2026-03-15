from typing import Dict, Any
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from services.co_generator import generate_course_outcomes
from services.question_mapper import map_questions_to_cos
from services.bloom_classifier import classify_bloom
from services.syllabus_parser import extract_topics
from services.academic_intent_detector import detect_intent
from services.difficulty_estimator import estimate_difficulty
from services.co_quality_analyzer import analyze_co_quality
from services.analytics import bloom_distribution, co_coverage

def route_request(service_type: str, **kwargs) -> Dict[str, Any]:
    if service_type == 'generate_course_outcomes':
        return {'cos': generate_course_outcomes(kwargs['syllabus'], kwargs['pos'], kwargs['psos'])}
    elif service_type == 'map_questions':
        return {'mappings': map_questions_to_cos(kwargs['questions'], kwargs['cos'])}
    elif service_type == 'classify_bloom':
        return {'result': classify_bloom(kwargs['text']).model_dump()}
    elif service_type == 'extract_syllabus_topics':
        return {'units': extract_topics(kwargs['syllabus'])}
    elif service_type == 'detect_intent':
        return {'intent': detect_intent(kwargs['question'])}
    elif service_type == 'estimate_difficulty':
        return {'difficulty': estimate_difficulty(kwargs['question'])}
    elif service_type == 'analyze_co_quality':
        return {'analyzed_cos': analyze_co_quality(kwargs['cos'])}
    elif service_type == 'bloom_distribution':
        mappings = map_questions_to_cos(kwargs['questions'], kwargs['cos'])
        return {'distribution': bloom_distribution(mappings)}
    elif service_type == 'co_coverage':
        return co_coverage(kwargs['questions'], kwargs['cos'])
    return {'error': 'Unknown service'}

app = FastAPI(title="AI Engine")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/analyze")
async def analyze(payload: Dict[str, Any]):
    if "service_type" not in payload:
        raise HTTPException(status_code=400, detail="service_type is required")
    service_type = payload.pop("service_type")
    try:
        return route_request(service_type, **payload)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc)) from exc


