from pydantic import BaseModel
from typing import Dict, List
from enum import Enum

class AttainmentLevel(str, Enum):
    L0 = 'Level 0'
    L1 = 'Level 1'
    L2 = 'Level 2'
    L3 = 'Level 3'

class COAttainment(BaseModel):
    co: str
    percentage: float
    level: AttainmentLevel
    threshold_met: bool

class POAttainment(BaseModel):
    po: str
    percentage: float
    level: AttainmentLevel

class PSOAttainment(BaseModel):
    pso: str
    percentage: float
    level: AttainmentLevel

class AnalyticsResult(BaseModel):
    co_attainments: List[COAttainment]
    po_attainments: List[POAttainment]
    pso_attainments: List[PSOAttainment]
    student_stats: Dict[str, float]  # avg, median, std
    bloom_stats: Dict[str, float]
    coverage_gaps: List[str]

