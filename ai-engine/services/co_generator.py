import json
from typing import List
from pydantic import ValidationError
from config.llm_config import get_llm
from models.schema import CourseOutcome
from utils.text_cleaner import clean_text

llm = get_llm()

with open('prompts/co_generation_prompt.txt', 'r') as f:
    prompt_template = f.read()

def generate_course_outcomes(syllabus: str, pos: List[str], psos: List[str]) -> List[CourseOutcome]:
    syllabus_clean = clean_text(syllabus)
    pos_str = ', '.join(pos)
    psos_str = ', '.join(psos)
    
    prompt = prompt_template.format(syllabus=syllabus_clean, pos=pos_str, psos=psos_str)
    
    response = llm.invoke(prompt)
    try:
        cos_data = json.loads(response.content)
        cos = [CourseOutcome(**co) for co in cos_data]
        if len(cos) < 4 or len(cos) > 6:
            raise ValueError("CO count must be 4-6")
        return cos
    except (json.JSONDecodeError, ValidationError, ValueError) as e:
        raise ValueError(f"Invalid CO generation: {str(e)}")

