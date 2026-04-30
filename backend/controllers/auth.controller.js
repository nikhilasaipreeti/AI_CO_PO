const User = require('../src/models/User.model');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
};

// @desc    Register user
// @route   POST /api/auth/register
const register = async(req, res) => {
    try {
        const { name, email, password, role, department, employeeId } = req.body;

        // Check if user exists in database
        const userExists = await User.findOne({ email });
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

// @desc    Login user
// @route   POST /api/auth/login
const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login attempt for email:', email);

        // Find user in database (include password field for comparison)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            console.log('User not found:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Check password using the comparePassword method from User model
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            console.log('Password mismatch for:', email);
            return res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            });
        }

        // Update last login
        user.lastLogin = Date.now();
        await user.save();

        // Generate token
        const token = generateToken(user._id);

        console.log('Login successful for:', email);

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
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get current user
// @route   GET /api/auth/me
const getMe = async(req, res) => {
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

module.exports = {
    register,
    login,
    getMe,
    logout
};