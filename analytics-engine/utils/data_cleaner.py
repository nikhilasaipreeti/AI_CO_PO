import pandas as pd
import numpy as np
from typing import List, Dict

def clean_student_marks(students: List[dict]) -> List[dict]:
    """Remove NaN, normalize scores."""
    df = pd.DataFrame(students)
    df = df.fillna(0)
    # Cap at 100%
    numeric_cols = df.select_dtypes(include=np.number).columns
    df[numeric_cols] = df[numeric_cols].clip(upper=100)
    return df.to_dict('records')

def clean_mappings(maps: List[dict]) -> List[dict]:
    """Ensure required fields, drop invalids."""
    valid_maps = [m for m in maps if all(k in m for k in ['question', 'co'])]  # Adjust per type
    return valid_maps

