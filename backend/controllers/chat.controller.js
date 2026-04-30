const geminiService = require('../src/services/ai-engine/gemini.service');
const gemini = require('../src/config/gemini');

// Rich system context for OBE assistant
const OBE_SYSTEM_CONTEXT = {
    role: 'OBE AI Assistant for Vignan University',
    expertise: [
        'Course Outcome (CO) generation from syllabus',
        'CO-PO-PSO mapping with strength levels (1, 2, 3)',
        'Bloom\'s Taxonomy classification (Remember, Understand, Apply, Analyze, Evaluate, Create)',
        'CO Attainment calculation (Level 1: ≥50%, Level 2: ≥60%, Level 3: ≥70%)',
        'PO Attainment aggregation from CO attainments',
        'PSO Attainment calculation',
        'NBA accreditation report generation',
        'Marks entry and analysis',
        'Question paper analysis and CO mapping',
        'SAR (Self Assessment Report) preparation'
    ],
    systemInfo: {
        attainmentLevels: {
            level1: '≥50% students scoring above threshold',
            level2: '≥60% students scoring above threshold',
            level3: '≥70% students scoring above threshold'
        },
        bloomLevels: ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'],
        nbaPOs: [
            'PO1: Engineering Knowledge',
            'PO2: Problem Analysis',
            'PO3: Design/Development of Solutions',
            'PO4: Conduct Investigations of Complex Problems',
            'PO5: Modern Tool Usage',
            'PO6: The Engineer and Society',
            'PO7: Environment and Sustainability',
            'PO8: Ethics',
            'PO9: Individual and Team Work',
            'PO10: Communication',
            'PO11: Project Management and Finance',
            'PO12: Life-long Learning'
        ],
        systemFeatures: [
            'AI-powered CO generation from syllabus upload',
            'Automatic Bloom\'s level classification',
            'CO-PO-PSO mapping matrix',
            'Marks upload via Excel/CSV',
            'Automatic attainment calculation',
            'NBA-ready PDF/Excel report export',
            'Course management dashboard',
            'Assessment configuration'
        ]
    }
};

// Build a rich prompt for the chatbot
const buildChatPrompt = (message, courseContext) => {
    return `You are an expert AI assistant for an Outcome Based Education (OBE) Management System used at Vignan University.

Your expertise covers:
- Course Outcomes (CO) generation and management
- CO-PO-PSO mapping with strength levels (1=Low, 2=Medium, 3=High)
- Bloom's Taxonomy (Remember, Understand, Apply, Analyze, Evaluate, Create)
- CO Attainment calculation: Level 1 (≥50%), Level 2 (≥60%), Level 3 (≥70%)
- PO and PSO attainment aggregation
- NBA accreditation requirements and SAR preparation
- Marks entry, analysis, and student performance tracking
- Question paper analysis and CO mapping

System Features Available:
- AI-powered CO generation from syllabus
- Automatic Bloom's level classification for questions
- CO-PO-PSO mapping matrix builder
- Excel/CSV marks upload
- Automatic attainment calculation and visualization
- NBA-ready report export (PDF/Excel)

NBA Program Outcomes (PO1-PO12):
PO1: Engineering Knowledge, PO2: Problem Analysis, PO3: Design/Development,
PO4: Complex Problem Investigation, PO5: Modern Tool Usage, PO6: Engineer & Society,
PO7: Environment & Sustainability, PO8: Ethics, PO9: Team Work,
PO10: Communication, PO11: Project Management, PO12: Life-long Learning

${courseContext ? `Current Course Context: ${JSON.stringify(courseContext)}` : ''}

User Question: ${message}

Instructions:
- Give clear, practical, and helpful answers specific to this OBE system
- Use markdown formatting for better readability (bold, bullet points, numbered lists)
- If explaining a process, give step-by-step instructions
- If asked about calculations, show the formula and an example
- Keep responses concise but complete
- If the question is about a feature in the system, guide them to the right page/section
- Always be encouraging and supportive`;
};

// @desc    Send message to AI chatbot (Real Gemini AI)
// @route   POST /api/chat/message
const sendMessage = async (req, res) => {
    try {
        const {
            message,
            courseId,
            courseContext
        } = req.body;

        if (!message || !message.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        console.log(`💬 Chat message received: "${message.substring(0, 50)}..."`);

        // Build context
        const context = {
            ...(courseContext || {}),
            courseId: courseId || null,
            systemInfo: OBE_SYSTEM_CONTEXT.systemInfo
        };

        // Build the prompt
        const prompt = buildChatPrompt(message, courseId ? context : null);

        // Call real Gemini AI — pass raw user message for smart fallback
        const aiResponse = await gemini.generateContent(prompt, 0.7, message);

        console.log(`✅ Gemini response generated successfully`);

        res.status(200).json({
            success: true,
            data: {
                response: aiResponse,
                timestamp: new Date().toISOString(),
                context: courseId ? {
                    courseId
                } : null,
                powered_by: 'Gemini AI'
            }
        });

    } catch (error) {
        console.error('❌ Chat error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to get AI response. Please try again.',
            error: error.message
        });
    }
};

// @desc    Suggest CO-PO mapping using Gemini AI
// @route   POST /api/chat/suggest-mapping
const suggestMapping = async (req, res) => {
    try {
        const {
            coDescription,
            bloomLevel,
            coCode
        } = req.body;

        const prompt = `You are an OBE expert. Suggest the best PO and PSO mappings for this Course Outcome.

Course Outcome: "${coDescription}"
Bloom's Level: ${bloomLevel}
CO Code: ${coCode || 'CO'}

NBA Program Outcomes:
PO1: Engineering Knowledge
PO2: Problem Analysis  
PO3: Design/Development of Solutions
PO4: Conduct Investigations of Complex Problems
PO5: Modern Tool Usage
PO6: The Engineer and Society
PO7: Environment and Sustainability
PO8: Ethics
PO9: Individual and Team Work
PO10: Communication
PO11: Project Management and Finance
PO12: Life-long Learning

PSOs (Program Specific Outcomes) are program-specific. Suggest PSO1, PSO2, PSO3 based on the CO content.

Return ONLY a valid JSON object:
{
  "poMappings": [
    { "code": "PO1", "strength": 3, "reason": "brief reason" },
    { "code": "PO2", "strength": 2, "reason": "brief reason" }
  ],
  "psoMappings": [
    { "code": "PSO1", "strength": 2, "reason": "brief reason" }
  ],
  "explanation": "Brief explanation of the mapping rationale"
}

Strength: 3=High, 2=Medium, 1=Low. Only include POs/PSOs with strength ≥ 1.`;

        const result = await gemini.generateJSON(prompt);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error('❌ Suggest mapping error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Analyze question paper using Gemini AI
// @route   POST /api/chat/analyze-paper
const analyzePaper = async (req, res) => {
    try {
        const {
            questions,
            courseOutcomes
        } = req.body;

        if (!questions || questions.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Questions are required'
            });
        }

        const prompt = `You are an OBE expert. Analyze this question paper and map each question to the appropriate Course Outcome and Bloom's Taxonomy level.

Questions:
${JSON.stringify(questions, null, 2)}

${courseOutcomes ? `Available Course Outcomes:\n${JSON.stringify(courseOutcomes, null, 2)}` : 'No specific COs provided - suggest appropriate CO codes (CO1, CO2, etc.)'}

Bloom's Taxonomy Levels: Remember, Understand, Apply, Analyze, Evaluate, Create

Return ONLY a valid JSON object:
{
  "mappings": [
    {
      "questionId": 1,
      "questionText": "question text",
      "suggestedCO": "CO1",
      "bloomLevel": "Apply",
      "confidence": 0.9,
      "reasoning": "brief reason"
    }
  ],
  "summary": {
    "totalQuestions": 3,
    "bloomDistribution": {
      "Remember": 0, "Understand": 1, "Apply": 1, "Analyze": 1, "Evaluate": 0, "Create": 0
    },
    "coDistribution": { "CO1": 1, "CO2": 1, "CO3": 1 },
    "overallAnalysis": "Brief analysis of the question paper quality and coverage"
  }
}`;

        const result = await gemini.generateJSON(prompt);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error('❌ Analyze paper error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Explain OBE concept using Gemini AI
// @route   POST /api/chat/explain
const explainConcept = async (req, res) => {
    try {
        const {
            concept
        } = req.body;

        const prompt = `You are an OBE expert. Explain the following concept clearly and concisely for a faculty member using an OBE management system.

Concept: "${concept}"

Provide:
1. A clear definition
2. Why it matters in OBE/NBA accreditation
3. A practical example
4. How it's used in the system

Use markdown formatting. Keep it under 300 words.`;

        const explanation = await gemini.generateContent(prompt, 0.5);

        res.status(200).json({
            success: true,
            data: {
                concept,
                explanation,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('❌ Explain concept error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Generate sample COs for a subject using Gemini AI
// @route   POST /api/chat/generate-sample-cos
const generateSampleCOs = async (req, res) => {
    try {
        const {
            subjectName,
            department,
            semester
        } = req.body;

        const prompt = `Generate 5 well-written Course Outcomes (COs) for the subject "${subjectName}" 
for ${department || 'Engineering'} department, Semester ${semester || 'N/A'}.

Requirements:
- Each CO must start with a Bloom's Taxonomy action verb
- Cover at least 4 different Bloom's levels
- Be specific, measurable, and achievable
- Follow NBA OBE guidelines

Return ONLY valid JSON:
{
  "subjectName": "${subjectName}",
  "cos": [
    {
      "code": "CO1",
      "description": "Full CO statement starting with action verb",
      "bloomLevel": "Understand",
      "suggestedPOs": ["PO1", "PO2"],
      "suggestedPSOs": ["PSO1"]
    }
  ]
}`;

        const result = await gemini.generateJSON(prompt);

        res.status(200).json({
            success: true,
            data: result
        });

    } catch (error) {
        console.error('❌ Generate sample COs error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get chat history suggestions based on course
// @route   GET /api/chat/suggestions
const getSuggestions = async (req, res) => {
    try {
        const {
            courseId
        } = req.query;

        const suggestions = [
            "How do I generate Course Outcomes from my syllabus?",
            "Explain Bloom's Taxonomy with examples",
            "How is CO attainment calculated?",
            "What is CO-PO mapping and how to do it?",
            "How to upload student marks?",
            "What are the NBA accreditation requirements?",
            "Generate sample COs for my course",
            "What is the difference between PO and PSO?",
            "How to interpret attainment levels?",
            "How to export reports for NBA?"
        ];

        res.status(200).json({
            success: true,
            data: suggestions
        });

    } catch (error) {
        console.error('❌ Get suggestions error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    sendMessage,
    suggestMapping,
    analyzePaper,
    explainConcept,
    generateSampleCOs,
    getSuggestions
};