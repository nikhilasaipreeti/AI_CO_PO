const express = require('express');
const multer = require('multer');
const router = express.Router();
const {
    generateCO,
    mapQuestionsHandler,
    uploadMarks,
    calculateAttainmentHandler,
    getAttainmentReport
} = require('../controllers/integration.controller');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 10 * 1024 * 1024 }
});

router.post('/generate-co', generateCO);
router.post('/map-questions', mapQuestionsHandler);
router.post('/upload-marks', upload.single('file'), uploadMarks);
router.post('/calculate-attainment', calculateAttainmentHandler);
router.get('/attainment-report', getAttainmentReport);

module.exports = router;
