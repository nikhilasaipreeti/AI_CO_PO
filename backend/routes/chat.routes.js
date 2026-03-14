const express = require('express');
const router = express.Router();
const {
    sendMessage,
    suggestMapping,
    analyzePaper,
    explainConcept
} = require('../controllers/chat.controller');

// Test route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Chat routes are working!',
        time: new Date().toISOString()
    });
});

// Chat routes - WITHOUT middleware for now
router.post('/message', sendMessage);
router.post('/suggest-mapping', suggestMapping);
router.post('/analyze-paper', analyzePaper);
router.post('/explain', explainConcept);

module.exports = router;