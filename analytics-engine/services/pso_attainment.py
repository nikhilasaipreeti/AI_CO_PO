from typing import List, Dict
from models.attainment_models import PSOAttainment, AttainmentLevel, COAttainment
from config.attainment_config import ATTAINMENT_LEVELS

def calculate_pso_attainment(co_attainments: List, cospo_map: List[Dict]) -> List[PSOAttainment]:
    """PSO = avg of mapped CO % (similar to PO)."""
    pso_map = {}
    for mapping in cospo_map:
        co = mapping['co']
        psos = mapping['psos']
        for pso in psos:
            if pso not in pso_map:
                pso_map[pso] = []
            pso_map[pso].append(co_attainments[[c.co for c in co_attainments].index(co)].percentage)
    
    results = []
    for pso, cos in pso_map.items():
        avg = sum(cos) / len(cos)
        level = next((lvl for lvl, thresh in reversed(ATTAINMENT_LEVELS.items()) if avg > thresh), AttainmentLevel.L0)
        results.append(PSOAttainment(pso=pso, percentage=round(avg, 2), level=level))
    
    return results

