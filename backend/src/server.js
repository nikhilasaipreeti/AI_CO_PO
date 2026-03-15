const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') }); // Fixed path to .env

// Import routes - Fix the paths (go up one level to root, then into routes folder)
const authRoutes = require('../routes/auth.routes'); // Changed from './routes/auth.routes'
const courseRoutes = require('../routes/course.routes'); // Changed from './routes/course.routes'
const assessmentRoutes = require('../routes/assessment.routes'); // Changed from './routes/assessment.routes'
const attainmentRoutes = require('../routes/attainment.routes'); // Changed from './routes/attainment.routes'
const chatRoutes = require('../routes/chat.routes'); // Changed from './routes/chat.routes'
const integrationRoutes = require('../routes/integration.routes');

// Import middleware - Fix the path
const { errorHandler } = require('./middleware/error.middleware'); // This one is correct (in src/middleware)

const app = express();
app.set('trust proxy', 1);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:8080',
    credentials: true
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api', limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Database connection - Use your CO_PO database
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/CO_PO', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('✅ MongoDB connected successfully');
        console.log('📊 Database:', mongoose.connection.name);
    })
    .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/assessment', assessmentRoutes);
app.use('/api/attainment', attainmentRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api', integrationRoutes);

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Server is running',
        timestamp: new Date().toISOString(),
        database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
    });
});

// Root route for quick sanity
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'Backend is running. Use /health or /api/test.',
        timestamp: new Date().toISOString()
    });
});

app.get('/api', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'API root. Try /api/test or /api/generate-co.',
        timestamp: new Date().toISOString()
    });
});

// Test route
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'API is working',
        routes: {
            auth: '/api/auth',
            courses: '/api/courses',
            assessment: '/api/assessment',
            attainment: '/api/attainment',
            chat: '/api/chat'
        }
    });
});

// Error handling middleware
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 Test: http://localhost:${PORT}/api/test`);
    console.log(`🔗 Health: http://localhost:${PORT}/health`);
});

module.exports = app;

