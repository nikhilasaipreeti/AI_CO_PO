import json
from config.llm_config import get_llm
from models.schema import BloomClassification
from utils.text_cleaner import clean_text

llm = get_llm()

with open('prompts/bloom_classifier_prompt.txt', 'r') as f:
    prompt_template = f.read()

def classify_bloom(text: str) -> BloomClassification:
    text_clean = clean_text(text)
    prompt = prompt_template.format(question=text_clean)
    response = llm.invoke(prompt)
    bloom_level = response.content.strip()
    return BloomClassification(text=text, bloom_level=bloom_level)

