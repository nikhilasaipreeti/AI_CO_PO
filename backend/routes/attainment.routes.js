const express = require('express');
const router = express.Router();
const {
    calculateCOAttainment,
    calculateAndSaveCOAttainment,
    calculatePOAttainment,
    calculatePSOAttainment,
    getCourseAttainment,
    generateAttainmentReport
} = require('../controllers/attainment.controller');

// Test route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Attainment routes are working!',
        time: new Date().toISOString()
    });
});

router.post('/co/exam/:examId', calculateCOAttainment);
router.post('/course/:courseId/co', calculateAndSaveCOAttainment);
router.post('/course/:courseId/po', calculatePOAttainment);
router.post('/course/:courseId/pso', calculatePSOAttainment);
router.get('/course/:courseId', getCourseAttainment);
router.get('/course/:courseId/report', generateAttainmentReport);

module.exports = router;
