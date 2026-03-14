from services.bloom_classifier import classify_bloom
from services.academic_intent_detector import detect_intent
from config.llm_config import get_llm
from utils.text_cleaner import clean_text

llm = get_llm()

def estimate_difficulty(question: str) -> str:
    bloom = classify_bloom(question).bloom_level
    intent = detect_intent(question)
    
    bloom_map = {
        'Remember': 'Easy',
        'Understand': 'Easy',
        'Apply': 'Medium',
        'Analyze': 'Medium',
        'Evaluate': 'Hard',
        'Create': 'Hard'
    }
    
    difficulty = bloom_map.get(bloom, 'Medium')
    if intent == 'numerical':
        if difficulty == 'Easy':
            difficulty = 'Medium'
        elif difficulty == 'Medium':
            difficulty = 'Hard'
    
    return difficulty

