"""Attainment configuration: thresholds, levels, targets."""

# Attainment levels for CO/PO/PSO
ATTAINMENT_LEVELS = {
    'L3': 70,  # >70%
    'L2': 60,  # 60-70%
    'L1': 50,  # 50-60%
    'L0': 0    # <50%
}

# Default CO threshold: 60% students >=60% in CO
CO_THRESHOLD_CONFIG = {
    'target_percentage': 60,  # 60% of students
    'target_score': 60        # >=60%
}

# Bloom levels mapping example (from ai-engine)
BLOOM_LEVELS = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create']

