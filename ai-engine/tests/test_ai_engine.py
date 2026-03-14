import pytest
from services.co_generator import generate_course_outcomes
from services.bloom_classifier import classify_bloom
# mock llm for tests

@pytest.fixture
def sample_syllabus():
    return "Understand routing concepts and apply algorithms."

@pytest.fixture
def sample_pos():
    return ["PO1", "PO2", "PO3"]

@pytest.fixture
def sample_psos():
    return ["PSO1"]

def test_co_generation(sample_syllabus, sample_pos, sample_psos):
    cos = generate_course_outcomes(sample_syllabus, sample_pos, sample_psos)
    assert 4 <= len(cos) <= 6
    assert all(hasattr(co, 'bloom_level') for co in cos)

def test_bloom_classifier():
    result = classify_bloom("Explain packet switching")
    assert result.bloom_level in ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create']

# Additional tests for other services


