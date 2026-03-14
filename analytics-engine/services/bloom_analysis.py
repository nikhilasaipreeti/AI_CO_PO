import pandas as pd
import numpy as np
from typing import Dict
from models.data_models import MarksData, BloomMapping
from config.attainment_config import BLOOM_LEVELS

def analyze_bloom_performance(marks_data: MarksData) -> Dict[str, float]:
    """Performance % per Bloom level."""
    if not marks_data.bloom_map:
        return {}
    
    df_marks = pd.DataFrame([s.dict() for s in marks_data.students])
    bloom_map = {m.question: m.bloom_level for m in marks_data.bloom_map}
    
    bloom_scores = {level: [] for level in BLOOM_LEVELS}
    for _, row in df_marks.iterrows():
        sid = row['student_id']
        for q, score in row.items():
            if q in bloom_map and pd.notna(score):
                level = bloom_map[q]
                bloom_scores[level].append(score)
    
    results = {level: round(np.mean(scores)*100, 2) if scores else 0 for level, scores in bloom_scores.items()}
    return results

