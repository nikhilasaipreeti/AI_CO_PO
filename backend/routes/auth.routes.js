const express = require('express');
const router = express.Router();
const { register, login, getMe, logout } = require('../controllers/auth.controller');
const { protect } = require('../src/middleware/auth.middleware');

// Test route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Auth routes are working!',
        time: new Date().toISOString()
    });
});

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);

module.exports = router;
