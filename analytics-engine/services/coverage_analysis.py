import pandas as pd
from typing import List
from models.data_models import QuestionCOMapping

def analyze_course_coverage(qco_map: List[QuestionCOMapping]) -> List[str]:
    """COs with no/low coverage."""
    df = pd.DataFrame([m.dict() for m in qco_map])
    cos = df['co'].unique()
    coverage_count = df['co'].value_counts().to_dict()
    
    gaps = []
    for co in cos:
        count = coverage_count.get(co, 0)
        if count == 0:
            gaps.append(f'{co} has no assessment coverage')
        elif count < 2:  # Arbitrary low threshold
            gaps.append(f'{co} has low coverage ({count} questions)')
    
    return gaps

