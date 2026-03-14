from pydantic import BaseModel
from typing import List

class CourseOutcome(BaseModel):
    id: str
    description: str
    bloom_level: str
    mapped_pos: List[str]
    mapped_psos: List[str]

class QuestionMapping(BaseModel):
    question: str
    co_id: str
    bloom_level: str
    confidence: float

class BloomClassification(BaseModel):
    text: str
    bloom_level: str

# Add more models as needed

