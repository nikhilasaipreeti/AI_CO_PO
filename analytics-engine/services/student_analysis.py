import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from typing import Dict
from models.data_models import MarksData

def analyze_student_performance(marks_data: MarksData) -> Dict[str, float]:
    """Student stats: top/weak, avg/median/std, clustering."""
    df = pd.DataFrame([s.dict()['marks'] for s in marks_data.students])
    df['student_id'] = [s.student_id for s in marks_data.students]
    
    stats = {
        'average': round(df.drop('student_id', axis=1).mean().mean(), 2),
        'median': round(df.drop('student_id', axis=1).median().mean(), 2),
        'std_dev': round(df.drop('student_id', axis=1).std().mean(), 2),
        'top_performers': df['student_id'].iloc[df.mean(axis=1).nlargest(3).index].tolist(),
        'weak_students': df['student_id'].iloc[df.mean(axis=1).nsmallest(3).index].tolist()
    }
    
    # Clustering (e.g., 3 clusters: high/medium/low)
    X = df.drop('student_id', axis=1)
    kmeans = KMeans(n_clusters=3, n_init=10)
    clusters = kmeans.fit_predict(X)
    stats['clusters'] = dict(zip(df['student_id'], clusters))
    
    return stats

