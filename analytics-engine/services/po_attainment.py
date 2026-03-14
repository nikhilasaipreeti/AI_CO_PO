import pandas as pd
from typing import List, Dict
from models.attainment_models import POAttainment, AttainmentLevel, COAttainment
from config.attainment_config import ATTAINMENT_LEVELS

def calculate_po_attainment(co_attainments: List[COAttainment], copo_map: List[Dict]) -> List[POAttainment]:
    """PO = avg of mapped CO %."""
    po_map = {}
    for mapping in copo_map:
        co = mapping['co']
        pos = mapping['pos']
        for po in pos:
            if po not in po_map:
                po_map[po] = []
            po_map[po].append(co_attainments[[c.co for c in co_attainments].index(co)].percentage)
    
    results = []
    for po, cos in po_map.items():
        avg = sum(cos) / len(cos)
        level = next((lvl for lvl, thresh in reversed(ATTAINMENT_LEVELS.items()) if avg > thresh), AttainmentLevel.L0)
        results.append(POAttainment(po=po, percentage=round(avg, 2), level=level))
    
    return results

