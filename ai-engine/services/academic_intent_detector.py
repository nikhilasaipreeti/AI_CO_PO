from config.llm_config import get_llm
from utils.text_cleaner import clean_text

llm = get_llm()

INTENT_PROMPT = """
Classify academic intent: theory, numerical, design, analysis.

Question: {question}

Return only one: theory/numerical/design/analysis
"""

def detect_intent(question: str) -> str:
    clean_q = clean_text(question)
    prompt = INTENT_PROMPT.format(question=clean_q)
    response = llm.invoke(prompt)
    return response.content.strip()

