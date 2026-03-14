// Mock user data (in real app, this would come from database)
const users = [{
        id: 1,
        name: 'Admin User',
        email: 'admin@college.edu',
        password: 'admin123', // In real app, this would be hashed
        role: 'admin',
        department: 'Administration',
        employeeId: 'ADMIN001'
    },
    {
        id: 2,
        name: 'Dr. John Smith',
        email: 'faculty@college.edu',
        password: 'faculty123',
        role: 'faculty',
        department: 'Computer Science',
        employeeId: 'FAC001'
    }
];

// @desc    Register user
// @route   POST /api/auth/register
const register = async(req, res) => {
    try {
        const { name, email, password, role, department, employeeId } = req.body;

        // Check if user exists
        const userExists = users.find(u => u.email === email);
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        // Create new user (mock)
        const newUser = {
            id: users.length + 1,
            name,
            email,
            password,
            role: role || 'faculty',
            department,
            employeeId
        };

        // In real app, save to database
        users.push(newUser);

        res.status(201).json({
            success: true,
            token: 'mock-jwt-token-' + Date.now(),
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
                department: newUser.department
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

        // Find user
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        res.status(200).json({
            success: true,
            token: 'mock-jwt-token-' + Date.now(),
            user: {
                id: user.id,
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
        // For demo, return faculty user
        const user = users[1]; // faculty user

        res.status(200).json({
            success: true,
            user: {
                id: user.id,
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
    res.status(200).json({
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