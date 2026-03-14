from collections import Counter
from typing import List, Dict
from services.question_mapper import map_questions_to_cos
from models.schema import QuestionMapping

def bloom_distribution(mappings: List[QuestionMapping]) -> Dict:
    blooms = [m.bloom_level for m in mappings]
    return dict(Counter(blooms))

def co_coverage(questions: List[str], cos: List[dict]) -> Dict:
    mappings = map_questions_to_cos(questions, cos)
    covered_cos = set(m.co_id for m in mappings)
    return {
        'total_cos': len(cos),
        'covered_cos': len(covered_cos),
        'uncovered': [co['id'] for co in cos if co['id'] not in covered_cos]
    }

