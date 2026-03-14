const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Auth routes are working!',
        time: new Date().toISOString()
    });
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin@college.edu' && password === 'admin123') {
        res.json({
            success: true,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6IkFkbWluIFVzZXIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjJ9',
            user: {
                id: 1,
                name: 'Admin User',
                email: 'admin@college.edu',
                role: 'admin',
                department: 'Administration'
            }
        });
    } else if (email === 'faculty@college.edu' && password === 'faculty123') {
        res.json({
            success: true,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6IkRyLiBKb2huIFNtaXRoIiwicm9sZSI6ImZhY3VsdHkiLCJpYXQiOjE1MTYyMzkwMjJ9',
            user: {
                id: 2,
                name: 'Dr. John Smith',
                email: 'faculty@college.edu',
                role: 'faculty',
                department: 'Computer Science'
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
});

// Register route
router.post('/register', (req, res) => {
    const { name, email, password, department } = req.body;

    res.status(201).json({
        success: true,
        message: 'Registration successful',
        user: {
            id: Date.now(),
            name,
            email,
            department,
            role: 'faculty'
        }
    });
});

// Get current user
router.get('/me', (req, res) => {
    res.json({
        success: true,
        user: {
            id: 2,
            name: 'Dr. John Smith',
            email: 'faculty@college.edu',
            role: 'faculty',
            department: 'Computer Science'
        }
    });
});

// Logout route
router.post('/logout', (req, res) => {
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
});

module.exports = router;