// @desc    Send message to chatbot
// @route   POST /api/chat/message
const sendMessage = async(req, res) => {
    try {
        const { message, courseId } = req.body;

        // Mock AI responses based on keywords
        let response = '';

        if (message.toLowerCase().includes('generate') && message.toLowerCase().includes('co')) {
            response = "I can help you generate Course Outcomes. Please go to the Course Management page and upload your syllabus, then click 'Generate COs'.";
        } else if (message.toLowerCase().includes('attainment')) {
            response = "To calculate attainment, you need to: 1) Configure exams, 2) Map questions to COs, 3) Upload student marks. Then the system will automatically calculate CO, PO, and PSO attainment.";
        } else if (message.toLowerCase().includes('map') && message.toLowerCase().includes('question')) {
            response = "Question mapping is done automatically by our AI. Just upload your question paper and the system will map each question to the appropriate CO and Bloom's level.";
        } else if (message.toLowerCase().includes('bloom')) {
            response = "Bloom's Taxonomy has 6 levels: Remember, Understand, Apply, Analyze, Evaluate, and Create. Our AI classifies questions into these levels automatically.";
        } else if (message.toLowerCase().includes('hello') || message.toLowerCase().includes('hi')) {
            response = "Hello! I'm your OBE Assistant. I can help you with CO-PO mapping, attainment calculation, and answering questions about Outcome Based Education. What would you like to know?";
        } else {
            response = "I understand you're asking about \"" + message + "\". To help you better, please try one of these topics: CO generation, attainment calculation, question mapping, Bloom's taxonomy, or check the documentation.";
        }

        res.status(200).json({
            success: true,
            data: {
                response: response,
                timestamp: new Date().toISOString(),
                context: courseId ? { courseId } : null
            }
        });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get suggestions for CO-PO mapping
// @route   POST /api/chat/suggest-mapping
const suggestMapping = async(req, res) => {
    try {
        const { coDescription, bloomLevel } = req.body;

        // Mock suggestions based on Bloom's level
        let suggestions = {
            poMappings: [],
            psoMappings: []
        };

        switch (bloomLevel) {
            case 'Remember':
            case 'Understand':
                suggestions.poMappings = ['PO1', 'PO2'];
                suggestions.psoMappings = ['PSO1'];
                break;
            case 'Apply':
                suggestions.poMappings = ['PO2', 'PO3'];
                suggestions.psoMappings = ['PSO1', 'PSO2'];
                break;
            case 'Analyze':
                suggestions.poMappings = ['PO2', 'PO4'];
                suggestions.psoMappings = ['PSO2'];
                break;
            case 'Evaluate':
                suggestions.poMappings = ['PO3', 'PO5', 'PO6'];
                suggestions.psoMappings = ['PSO2', 'PSO3'];
                break;
            case 'Create':
                suggestions.poMappings = ['PO3', 'PO5', 'PO11'];
                suggestions.psoMappings = ['PSO2', 'PSO3'];
                break;
            default:
                suggestions.poMappings = ['PO1', 'PO2', 'PO3'];
                suggestions.psoMappings = ['PSO1', 'PSO2'];
        }

        res.status(200).json({
            success: true,
            data: suggestions
        });
    } catch (error) {
        console.error('Suggest mapping error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Analyze question paper
// @route   POST /api/chat/analyze-paper
const analyzePaper = async(req, res) => {
    try {
        const { questions } = req.body;

        // Mock analysis
        const analysis = questions.map((q, index) => {
            const bloomLevels = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];
            const randomLevel = bloomLevels[index % 6];
            const coNum = (index % 4) + 1;

            return {
                questionId: index + 1,
                questionText: q.text || `Question ${index + 1}`,
                suggestedCO: `CO${coNum}`,
                bloomLevel: randomLevel,
                confidence: 0.85 + (Math.random() * 0.1),
                keywords: ['programming', 'algorithm', 'data structure'].slice(0, 2 + (index % 2))
            };
        });

        res.status(200).json({
            success: true,
            data: {
                analysis,
                summary: {
                    totalQuestions: questions.length,
                    bloomDistribution: {
                        Remember: analysis.filter(a => a.bloomLevel === 'Remember').length,
                        Understand: analysis.filter(a => a.bloomLevel === 'Understand').length,
                        Apply: analysis.filter(a => a.bloomLevel === 'Apply').length,
                        Analyze: analysis.filter(a => a.bloomLevel === 'Analyze').length,
                        Evaluate: analysis.filter(a => a.bloomLevel === 'Evaluate').length,
                        Create: analysis.filter(a => a.bloomLevel === 'Create').length
                    }
                }
            }
        });
    } catch (error) {
        console.error('Analyze paper error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get OBE concept explanation
// @route   POST /api/chat/explain
const explainConcept = async(req, res) => {
    try {
        const { concept } = req.body;

        const explanations = {
            'obe': 'Outcome Based Education (OBE) is an educational approach that focuses on what students should be able to do after completing a course or program. It involves defining outcomes, designing curriculum to achieve them, and assessing whether they have been achieved.',
            'co': 'Course Outcomes (COs) are specific statements that describe what students should be able to do upon completing a course. They are written using action verbs from Bloom\'s Taxonomy and are measurable.',
            'po': 'Program Outcomes (POs) are broader statements that describe what students should know or be able to do upon completing a program. There are typically 12 POs defined by NBA.',
            'pso': 'Program Specific Outcomes (PSOs) are outcomes specific to a particular program or discipline, in addition to the generic POs.',
            'bloom': 'Bloom\'s Taxonomy is a hierarchical classification of cognitive skills: Remember (recall facts), Understand (explain ideas), Apply (use information), Analyze (break down information), Evaluate (justify decisions), Create (produce new work).',
            'attainment': 'Attainment is the measurement of how well students have achieved the defined outcomes. It is calculated based on student performance in assessments and compared against predefined thresholds.'
        };

        const conceptLower = concept.toLowerCase();
        let explanation = explanations[conceptLower] || `I don't have a specific explanation for "${concept}". Try asking about OBE, CO, PO, PSO, Bloom, or attainment.`;

        res.status(200).json({
            success: true,
            data: {
                concept,
                explanation,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        console.error('Explain concept error:', error);
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
    explainConcept
};