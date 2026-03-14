import json
from typing import List
from config.llm_config import get_llm
from models.schema import QuestionMapping
from utils.text_cleaner import clean_text
from utils.embeddings import get_embedding, semantic_search

llm = get_llm()

with open('prompts/question_mapping_prompt.txt', 'r') as f:
    prompt_template = f.read()

def map_questions_to_cos(questions: List[str], cos: List[dict]) -> List[QuestionMapping]:
    cos_str = json.dumps(cos)
    questions_str = json.dumps(questions)
    prompt = prompt_template.format(cos=cos_str, questions=questions_str)
    
    response = llm.invoke(prompt)
    mappings_data = json.loads(response.content)
    
    # Semantic boost
    co_embs = [get_embedding(co['description']) for co in cos]
    for m in mappings_data:
        q_emb = get_embedding(m['question'])
        best_idx = semantic_search(q_emb, np.array(co_embs))[0][0]
        m['semantic_conf'] = float(best_idx)  # simplify
    
    return [QuestionMapping(**m) for m in mappings_data]

