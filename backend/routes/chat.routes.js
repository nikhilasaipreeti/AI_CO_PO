const express = require('express');
const router = express.Router();
const {
    sendMessage,
    suggestMapping,
    analyzePaper,
    explainConcept,
    generateSampleCOs,
    getSuggestions
} = require('../controllers/chat.controller');

// Test route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Chat routes are working!',
        time: new Date().toISOString()
    });
});

// Main chat - send message to Gemini AI
router.post('/message', sendMessage);

// AI-powered features
router.post('/suggest-mapping', suggestMapping);
router.post('/analyze-paper', analyzePaper);
router.post('/explain', explainConcept);
router.post('/generate-sample-cos', generateSampleCOs);

// Suggestions
router.get('/suggestions', getSuggestions);

module.exports = router;