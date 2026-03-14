import json
import random

def generate_fake_marks(num_students=100, num_questions=4, max_marks=[10, 10, 15, 15]):
    marks = []
    for i in range(1, num_students + 1):
        student_marks = {"Student": f"S{i}"}
        for j in range(1, num_questions + 1):
            student_marks[f"Q{j}"] = random.randint(0, max_marks[j-1])
        marks.append(student_marks)
    return marks

if __name__ == "__main__":
    fake_marks = generate_fake_marks()
    with open("large_dataset.json", "w") as f:
        json.dump(fake_marks, f, indent=2)
    print("Generated fake marks in large_dataset.json")