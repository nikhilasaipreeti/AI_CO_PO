// Mock exams data
let exams = [{
        id: 1,
        courseId: 1,
        name: 'T1',
        type: 'formative',
        examCode: 'T1',
        date: '2024-02-15',
        totalMarks: 30,
        duration: 60,
        questionStructure: [
            { questionNumber: 1, marks: 10, description: 'Question 1' },
            { questionNumber: 2, marks: 10, description: 'Question 2' },
            { questionNumber: 3, marks: 10, description: 'Question 3' }
        ],
        status: 'configured',
        createdBy: 2,
        createdAt: '2024-02-01T10:00:00Z'
    },
    {
        id: 2,
        courseId: 1,
        name: 'T2',
        type: 'formative',
        examCode: 'T2',
        date: '2024-03-15',
        totalMarks: 30,
        duration: 60,
        questionStructure: [
            { questionNumber: 1, marks: 10, description: 'Question 1' },
            { questionNumber: 2, marks: 10, description: 'Question 2' },
            { questionNumber: 3, marks: 10, description: 'Question 3' }
        ],
        status: 'questions_mapped',
        createdBy: 2,
        createdAt: '2024-02-15T10:00:00Z'
    }
];

// Mock questions data
let questions = [{
        id: 1,
        examId: 1,
        questionNumber: 1,
        text: 'Explain the concept of variables and data types in programming.',
        marks: 10,
        mappedCO: 1,
        bloomLevel: 'Understand',
        aiClassified: true
    },
    {
        id: 2,
        examId: 1,
        questionNumber: 2,
        text: 'Write a program to find the sum of two numbers.',
        marks: 10,
        mappedCO: 2,
        bloomLevel: 'Apply',
        aiClassified: true
    },
    {
        id: 3,
        examId: 1,
        questionNumber: 3,
        text: 'Analyze the given code and identify the output.',
        marks: 10,
        mappedCO: 3,
        bloomLevel: 'Analyze',
        aiClassified: true
    }
];

// @desc    Create exam configuration
// @route   POST /api/assessment/exam
const createExam = async(req, res) => {
    try {
        const examData = {
            id: exams.length + 1,
            ...req.body,
            status: 'draft',
            createdBy: req.body.createdBy || 2,
            createdAt: new Date().toISOString()
        };

        exams.push(examData);

        // Create questions from structure
        if (examData.questionStructure) {
            const newQuestions = examData.questionStructure.map((q, index) => ({
                id: questions.length + index + 1,
                examId: examData.id,
                questionNumber: index + 1,
                text: q.description || `Question ${index + 1}`,
                marks: q.marks,
                mappedCO: null,
                bloomLevel: null,
                aiClassified: false
            }));
            questions.push(...newQuestions);
        }

        res.status(201).json({
            success: true,
            data: examData
        });
    } catch (error) {
        console.error('Create exam error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get exams for a course
// @route   GET /api/assessment/course/:courseId
const getCourseExams = async(req, res) => {
    try {
        const courseId = parseInt(req.params.courseId);
        const courseExams = exams.filter(e => e.courseId === courseId);

        res.status(200).json({
            success: true,
            count: courseExams.length,
            data: courseExams
        });
    } catch (error) {
        console.error('Get exams error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get exam by ID
// @route   GET /api/assessment/exam/:examId
const getExamById = async(req, res) => {
    try {
        const exam = exams.find(e => e.id === parseInt(req.params.examId));

        if (!exam) {
            return res.status(404).json({
                success: false,
                message: 'Exam not found'
            });
        }

        res.status(200).json({
            success: true,
            data: exam
        });
    } catch (error) {
        console.error('Get exam error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Map questions to COs
// @route   POST /api/assessment/exam/:examId/map-questions
const mapQuestionsToCOs = async(req, res) => {
    try {
        const examId = parseInt(req.params.examId);
        const exam = exams.find(e => e.id === examId);

        if (!exam) {
            return res.status(404).json({
                success: false,
                message: 'Exam not found'
            });
        }

        // Get questions for this exam
        const examQuestions = questions.filter(q => q.examId === examId);

        // Map each question to a CO (mock mapping)
        const mappedQuestions = examQuestions.map((q, index) => {
            const coId = (index % 3) + 1; // Alternate between CO1, CO2, CO3
            const bloomLevels = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];
            const bloomLevel = bloomLevels[index % 6];

            // Update question
            q.mappedCO = coId;
            q.bloomLevel = bloomLevel;
            q.aiClassified = true;

            return {
                questionId: q.id,
                questionNumber: q.questionNumber,
                mappedCO: `CO${coId}`,
                bloomLevel: bloomLevel,
                confidence: 0.85 + (Math.random() * 0.1)
            };
        });

        // Update exam status
        const examIndex = exams.findIndex(e => e.id === examId);
        exams[examIndex].status = 'questions_mapped';

        res.status(200).json({
            success: true,
            data: mappedQuestions
        });
    } catch (error) {
        console.error('Map questions error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Classify question Bloom's level
// @route   POST /api/assessment/classify-bloom
const classifyBloomLevel = async(req, res) => {
    try {
        const { question } = req.body;

        // Mock classification
        const bloomLevels = ['Remember', 'Understand', 'Apply', 'Analyze', 'Evaluate', 'Create'];
        const randomLevel = bloomLevels[Math.floor(Math.random() * bloomLevels.length)];

        res.status(200).json({
            success: true,
            data: {
                question,
                bloomLevel: randomLevel,
                confidence: 0.9
            }
        });
    } catch (error) {
        console.error('Classify bloom error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get questions for an exam
// @route   GET /api/assessment/exam/:examId/questions
const getExamQuestions = async(req, res) => {
    try {
        const examId = parseInt(req.params.examId);
        const examQuestions = questions.filter(q => q.examId === examId);

        res.status(200).json({
            success: true,
            count: examQuestions.length,
            data: examQuestions
        });
    } catch (error) {
        console.error('Get questions error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createExam,
    getCourseExams,
    getExamById,
    mapQuestionsToCOs,
    classifyBloomLevel,
    getExamQuestions
};