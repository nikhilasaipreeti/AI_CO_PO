import pandas as pd
from typing import List
from models.data_models import MarksData, StudentMarks, QuestionCOMapping, COPOMapping, BloomMapping

def parse_excel_marks(file_path: str) -> list:
    """Parse student marks sheet."""
    df = pd.read_excel(file_path, sheet_name='Marks')  # Assume sheet name
    students = []
    for _, row in df.iterrows():
        marks = {col: row[col] for col in df.columns if col.startswith('Q')}
        students.append(StudentMarks(student_id=row['StudentID'], marks=marks))
    return students

def parse_mappings(file_path: str, sheet: str) -> list:
    """Parse Q-CO, CO-PO maps."""
    df = pd.read_excel(file_path, sheet_name=sheet)
    if sheet == 'QCO':
        return [QuestionCOMapping(**row) for _, row in df.iterrows()]
    elif sheet == 'COPO':
        return [COPOMapping(**row) for _, row in df.iterrows()]
    elif sheet == 'Bloom':
        return [BloomMapping(**row) for _, row in df.iterrows()]
    return []

def load_data_from_excel(file_path: str) -> MarksData:
    """Load full data from multi-sheet Excel."""
    students = parse_excel_marks(file_path)
    qco_map = parse_mappings(file_path, 'QCO')
    copo_map = parse_mappings(file_path, 'COPO')
    bloom_map = parse_mappings(file_path, 'Bloom')
    return MarksData(students=students, qco_map=qco_map, copo_map=copo_map, bloom_map=bloom_map)

