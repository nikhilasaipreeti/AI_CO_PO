module.exports = {
    /**
     * Prompt for generating Course Outcomes
     */
    generateCOPrompt: (syllabus, pos, psos) => `
You are an expert in Outcome Based Education (OBE). Generate 4-6 Course Outcomes (COs) for the following course syllabus.

Syllabus:
${syllabus}

Program Outcomes (POs):
${JSON.stringify(pos, null, 2)}

Program Specific Outcomes (PSOs):
${JSON.stringify(psos, null, 2)}

Requirements:
1. Each CO should start with an action verb from Bloom's Taxonomy
2. Cover different cognitive levels (Remember, Understand, Apply, Analyze, Evaluate, Create)
3. Each CO should be measurable and assessable
4. Map each CO to relevant POs and PSOs (1-3 POs per CO)
5. Include the Bloom's level for each CO

Return a JSON object with this structure:
{
  "cos": [
    {
      "description": "CO description",
      "bloomLevel": "Apply",
      "mappedPOs": ["PO1", "PO2"],
      "mappedPSOs": ["PSO1"]
    }
  ]
}
`,

    /**
     * Prompt for classifying Bloom's level
     */
    classifyBloomPrompt: (question) => `
Classify the following question into one of Bloom's Taxonomy levels:
- Remember
- Understand
- Apply
- Analyze
- Evaluate
- Create

Question: "${question}"

Return only the level name, nothing else.
`,

    /**
     * Prompt for mapping question to CO
     */
    mapQuestionPrompt: (question, courseOutcomes) => `
Given the following question and course outcomes, determine which CO this question is assessing.

Question: "${question}"

Course Outcomes:
${JSON.stringify(courseOutcomes, null, 2)}

Return a JSON object:
{
  "coId": "CO1",
  "confidence": 0.95,
  "bloomLevel": "Apply"
}
`,

    /**
     * Prompt for analyzing question paper
     */
    analyzePaperPrompt: (questions, courseOutcomes) => `
Analyze this question paper and map each question to the appropriate CO and Bloom's level.

Questions:
${JSON.stringify(questions, null, 2)}

Course Outcomes:
${JSON.stringify(courseOutcomes, null, 2)}

Return a JSON array of mappings:
[
  {
    "questionId": 1,
    "coCode": "CO1",
    "bloomLevel": "Understand",
    "confidence": 0.9
  }
]
`,

    /**
     * Prompt for suggesting CO-PO mapping
     */
    suggestMappingPrompt: (co, pos, psos) => `
Given this Course Outcome, suggest which POs and PSOs it should map to.

Course Outcome:
${co.description} (Bloom's Level: ${co.bloomLevel})

Available POs:
${JSON.stringify(pos, null, 2)}

Available PSOs:
${JSON.stringify(psos, null, 2)}

Return JSON:
{
  "poMappings": ["PO1", "PO2"],
  "psoMappings": ["PSO1"]
}
`,

    /**
     * Prompt for chatbot responses
     */
    chatPrompt: (message, context) => `
You are an expert AI assistant for an Outcome Based Education (OBE) Management System.

Your expertise:
- Course Outcomes (CO) generation and management
- CO-PO-PSO mapping with strength levels (1=Low, 2=Medium, 3=High)
- Bloom's Taxonomy (Remember, Understand, Apply, Analyze, Evaluate, Create)
- CO Attainment: Level 1 (≥50%), Level 2 (≥60%), Level 3 (≥70%)
- NBA accreditation requirements and SAR preparation
- Marks entry, analysis, and student performance tracking

${context ? `Course Context: ${JSON.stringify(context)}` : ''}

User Question: ${message}

Provide a clear, practical, markdown-formatted response. Include examples where helpful.
`
};