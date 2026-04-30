const express = require('express');
const router = express.Router();
const {
    createExam,
    getCourseExams,
    getExamById,
    mapQuestionsToCOs,
    classifyBloomLevel,
    getExamQuestions
} = require('../controllers/assessment.controller');

// Routes
router.post('/exam', createExam);
router.get('/course/:courseId', getCourseExams);
router.get('/exam/:examId', getExamById);
router.post('/exam/:examId/map-questions', mapQuestionsToCOs);
router.post('/classify-bloom', classifyBloomLevel);
router.get('/exam/:examId/questions', getExamQuestions);

module.exports = router;