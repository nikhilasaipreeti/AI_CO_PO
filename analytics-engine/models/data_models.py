from pydantic import BaseModel
from typing import Dict, List, Optional, Any
from datetime import date

class StudentMarks(BaseModel):
    student_id: str
    marks: Dict[str, float]  # e.g., {'Q1': 8, 'Q2': 7}

class QuestionCOMapping(BaseModel):
    question: str
    co: str
    max_marks: float

class COMapping(BaseModel):
    co: str
    questions: List[str]

class COPOMapping(BaseModel):
    co: str
    pos: List[str]

class BloomMapping(BaseModel):
    question: str
    bloom_level: str

class MarksData(BaseModel):
    students: List[StudentMarks]
    qco_map: List[QuestionCOMapping]
    copo_map: List[COPOMapping]
    bloom_map: Optional[List[BloomMapping]] = None
    date: Optional[date] = None

class COAttainmentInput(BaseModel):
    marks_data: MarksData
    co_threshold_config: Optional[Dict[str, Any]] = None

# More models in attainment_models.py

