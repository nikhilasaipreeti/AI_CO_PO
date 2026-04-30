const express = require('express');
const router = express.Router();
const User = require('../src/models/User.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {
    generateOTP,
    sendOTPEmail,
    sendLoginOTPEmail,
    storeOTP,
    verifyOTP
} = require('../src/services/email.service');
const {
    protect
} = require('../src/middleware/auth.middleware');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// @desc    Register user
// @route   POST /api/auth/register
const register = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            role,
            department,
            employeeId
        } = req.body;

        // Check if user exists in database
        const userExists = await User.findOne({
            email
        });
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create user in database
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'faculty',
            department,
            employeeId
        });

        // Generate token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            }
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Login Step 1 — verify credentials, send OTP
// @route   POST /api/auth/login
const login = async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;
        console.log('Login attempt for email:', email);

        const user = await User.findOne({
            email
        }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Credentials valid — generate and send OTP
        const otp = generateOTP();
        storeOTP(email, otp, 'login');

        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.log(`⚠️  Gmail not configured. Login OTP for ${email}: ${otp}`);
            return res.json({
                success: true,
                requireOTP: true,
                message: 'OTP generated (Gmail not configured — check server logs)',
                devOtp: process.env.NODE_ENV === 'development' ? otp : undefined
            });
        }

        await sendLoginOTPEmail(email, otp, user.name);
        console.log(`✅ Login OTP sent to ${email}`);

        res.json({
            success: true,
            requireOTP: true,
            message: `OTP sent to ${email}. Valid for 10 minutes.`
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Login Step 2 — verify OTP, issue JWT
// @route   POST /api/auth/verify-login-otp
const verifyLoginOTP = async (req, res) => {
    try {
        const {
            email,
            otp
        } = req.body;
        if (!email || !otp) {
            return res.status(400).json({
                success: false,
                message: 'Email and OTP are required'
            });
        }

        const result = verifyOTP(email, otp, 'login');
        if (!result.valid) {
            return res.status(400).json({
                success: false,
                message: result.message
            });
        }

        const user = await User.findOne({
            email
        });
        if (!user) return res.status(404).json({
            success: false,
            message: 'User not found'
        });

        user.lastLogin = Date.now();
        await user.save();

        const token = generateToken(user._id);
        console.log(`✅ Login OTP verified for ${email}`);

        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            }
        });

    } catch (error) {
        console.error('Verify login OTP error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            }
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
const logout = (req, res) => {
    res.json({
        success: true,
        message: 'Logged out successfully'
    });
};

// Register routes
router.post('/register', register);
router.post('/login', login);
router.post('/verify-login-otp', verifyLoginOTP);
router.get('/me', protect, getMe);
router.post('/logout', logout);

// @desc    Send OTP to email for password reset
// @route   POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res) => {
    try {
        const {
            email
        } = req.body;
        if (!email) return res.status(400).json({
            success: false,
            message: 'Email is required'
        });

        const user = await User.findOne({
            email: email.toLowerCase()
        });
        if (!user) {
            // Don't reveal if email exists — security best practice
            return res.json({
                success: true,
                message: 'If this email exists, an OTP has been sent.'
            });
        }

        const otp = generateOTP();
        storeOTP(email, otp);

        // Check if Gmail is configured
        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.log(`⚠️  Gmail not configured. OTP for ${email}: ${otp}`);
            return res.json({
                success: true,
                message: 'OTP generated (Gmail not configured — check server logs)',
                devOtp: process.env.NODE_ENV === 'development' ? otp : undefined
            });
        }

        await sendOTPEmail(email, otp, user.name);
        res.json({
            success: true,
            message: 'OTP sent to your email. Valid for 10 minutes.'
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send OTP. Please try again.'
        });
    }
});

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
    try {
        const {
            email,
            otp
        } = req.body;
        if (!email || !otp) return res.status(400).json({
            success: false,
            message: 'Email and OTP are required'
        });

        const result = verifyOTP(email, otp);
        if (!result.valid) return res.status(400).json({
            success: false,
            message: result.message
        });

        // Generate a short-lived reset token
        const resetToken = jwt.sign({
            email,
            purpose: 'reset'
        }, process.env.JWT_SECRET, {
            expiresIn: '15m'
        });
        res.json({
            success: true,
            message: 'OTP verified successfully',
            resetToken
        });

    } catch (error) {
        console.error('Verify OTP error:', error);
        res.status(500).json({
            success: false,
            message: 'OTP verification failed'
        });
    }
});

// @desc    Reset password with token
// @route   POST /api/auth/reset-password
router.post('/reset-password', async (req, res) => {
    try {
        const {
            resetToken,
            newPassword
        } = req.body;
        if (!resetToken || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Reset token and new password are required'
            });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 6 characters'
            });
        }

        const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
        if (decoded.purpose !== 'reset') {
            return res.status(400).json({
                success: false,
                message: 'Invalid reset token'
            });
        }

        const user = await User.findOne({
            email: decoded.email
        });
        if (!user) return res.status(404).json({
            success: false,
            message: 'User not found'
        });

        user.password = newPassword; // Model pre-save hook will hash it
        await user.save();

        res.json({
            success: true,
            message: 'Password reset successfully. Please login with your new password.'
        });

    } catch (error) {
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(400).json({
                success: false,
                message: 'Reset token is invalid or expired. Please request a new OTP.'
            });
        }
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'Password reset failed'
        });
    }
});

module.exports = router;