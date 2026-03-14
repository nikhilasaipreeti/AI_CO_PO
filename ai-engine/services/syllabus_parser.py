import json
from typing import List, Dict
from config.llm_config import get_llm
from utils.text_cleaner import clean_text

llm = get_llm()

SYLLABUS_PROMPT = """
Extract structured topics from the syllabus.

Input:
{syllabus}

Output JSON:
{{
  "units": [
    {{
      "unit_id": 1,
      "title": "Unit 1: Network Fundamentals",
      "topics": ["topic1", "topic2"]
    }}
  ]
}}
"""

def extract_topics(syllabus_text: str) -> List[Dict]:
    clean_syl = clean_text(syllabus_text)
    prompt = SYLLABUS_PROMPT.format(syllabus=clean_syl)
    response = llm.invoke(prompt)
    data = json.loads(response.content)
    return data['units']

