from typing import List, Dict, Any
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


