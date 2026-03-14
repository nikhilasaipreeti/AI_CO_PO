from services.bloom_classifier import classify_bloom
from config.llm_config import get_llm
from typing import List

llm = get_llm()

QUALITY_PROMPT = """
Score CO quality 1-10:
Criteria: measurable, clear, Bloom-aligned, action verb.

CO: {co_desc}

Score: integer 1-10
Justification: brief
"""

def analyze_co_quality(cos: List[dict]) -> List[dict]:
    results = []
    for co in cos:
        prompt = QUALITY_PROMPT.format(co_desc=co['description'])
        response = llm.invoke(prompt)
        score_just = response.content.strip()
        score = int(score_just.split()[0])
        co['quality_score'] = score
        results.append(co)
    return results

