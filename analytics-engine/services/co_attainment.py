import pandas as pd
import numpy as np
from typing import Dict, List
from models.data_models import StudentMarks, QuestionCOMapping, COAttainmentInput, MarksData
from models.attainment_models import COAttainment, AttainmentLevel
from config.attainment_config import ATTAINMENT_LEVELS, CO_THRESHOLD_CONFIG

def calculate_co_attainment(input_data: COAttainmentInput) -> List[COAttainment]:
    """Calculate CO attainment % and levels."""
    df_marks = pd.DataFrame([s.dict() for s in input_data.marks_data.students])
    df_qco = pd.DataFrame([m.dict() for m in input_data.marks_data.qco_map])
    
    # Weighted avg per CO
    co_scores = {}
    for _, row in df_qco.iterrows():
        q = row['question']
        co = row['co']
        max_m = row['max_marks']
        if co not in co_scores:
            co_scores[co] = {'total': 0, 'max_total': 0, 'student_scores': []}
        for sid in df_marks['student_id']:
            score = df_marks.loc[df_marks['student_id'] == sid, q].iloc[0]
            co_scores[co]['total'] += score
            co_scores[co]['max_total'] += max_m
            co_scores[co]['student_scores'].append(score / max_m * 100)
    
    results = []
    for co, data in co_scores.items():
        avg_pct = (data['total'] / data['max_total']) * 100 / len(input_data.marks_data.students)
        
        # Level
        level = next((lvl for lvl, thresh in reversed(ATTAINMENT_LEVELS.items()) if avg_pct > thresh), AttainmentLevel.L0)
        
        # Threshold: % students >= target_score
        thresh_met = np.mean(np.array(data['student_scores']) >= CO_THRESHOLD_CONFIG['target_score']) * 100 >= CO_THRESHOLD_CONFIG['target_percentage']
        
        results.append(COAttainment(co=co, percentage=round(avg_pct, 2), level=level, threshold_met=thresh_met))
    
    return results

# Example
if __name__ == '__main__':
    # Sample data from spec
    students = [StudentMarks(student_id='S1', marks={'Q1':8,'Q2':7,'Q3':12}), StudentMarks(student_id='S2', marks={'Q1':6,'Q2':5,'Q3':10})]
    qco = [QuestionCOMapping(question='Q1', co='CO1', max_marks=10), QuestionCOMapping(question='Q2', co='CO1', max_marks=10), QuestionCOMapping(question='Q3', co='CO2', max_marks=20)]
    md = MarksData(students=students, qco_map=qco)
    print(calculate_co_attainment(COAttainmentInput(marks_data=md)))


