import pandas as pd
import re
from typing import List, Union, IO
from models.data_models import MarksData, StudentMarks, QuestionCOMapping, COPOMapping, BloomMapping

def _read_excel(source: Union[str, IO[bytes]]):
    return pd.ExcelFile(source)

def _read_csv(source: Union[str, IO[bytes]]):
    return pd.read_csv(source)

def parse_excel_marks(xls: pd.ExcelFile) -> list:
    df = pd.read_excel(xls, sheet_name='Marks')
    students = []
    for _, row in df.iterrows():
        marks = {col: float(row[col]) for col in df.columns if col.startswith('Q')}
        student_id = str(row.get('StudentID') or row.get('Student') or row.get('Roll') or row.get('ID'))
        students.append(StudentMarks(student_id=student_id, marks=marks))
    return students

def parse_mappings(xls: pd.ExcelFile, sheet: str) -> list:
    df = pd.read_excel(xls, sheet_name=sheet)
    if sheet == 'QCO':
        return [QuestionCOMapping(**row) for _, row in df.iterrows()]
    elif sheet == 'COPO':
        return [COPOMapping(**row) for _, row in df.iterrows()]
    elif sheet == 'Bloom':
        return [BloomMapping(**row) for _, row in df.iterrows()]
    return []

def _parse_csv_to_marks(df: pd.DataFrame) -> MarksData:
    # First column = student id
    student_col = df.columns[0]
    question_cols = [c for c in df.columns if c != student_col]

    students = []
    for _, row in df.iterrows():
        marks = {q.split(' ')[0]: float(row[q]) for q in question_cols}
        students.append(StudentMarks(student_id=str(row[student_col]), marks=marks))

    qco_map = []
    for q in question_cols:
        q_key = q.split(' ')[0]
        match = re.search(r'\(?(CO\d+)\)?', q, re.IGNORECASE)
        co = match.group(1).upper() if match else f"CO{re.sub(r'[^0-9]', '', q_key) or '1'}"
        max_marks = float(df[q].max()) if len(df[q]) > 0 else 10.0
        qco_map.append(QuestionCOMapping(question=q_key, co=co, max_marks=max_marks))

    return MarksData(students=students, qco_map=qco_map, copo_map=[], bloom_map=[])

def load_data_from_excel(source: Union[str, IO[bytes]], filename: str = "") -> MarksData:
    if filename.lower().endswith(".csv"):
        df = _read_csv(source)
        return _parse_csv_to_marks(df)
    xls = _read_excel(source)
    students = parse_excel_marks(xls)
    qco_map = parse_mappings(xls, 'QCO')
    copo_map = parse_mappings(xls, 'COPO')
    bloom_map = parse_mappings(xls, 'Bloom')
    return MarksData(students=students, qco_map=qco_map, copo_map=copo_map, bloom_map=bloom_map)

