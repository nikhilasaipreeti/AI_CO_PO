const express = require('express');
const router = express.Router();

// Test route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Course routes are working!',
        time: new Date().toISOString()
    });
});

// Get all courses
router.get('/', (req, res) => {
    res.json({
        success: true,
        data: [{
                id: 1,
                code: 'CS101',
                name: 'Introduction to Programming',
                department: 'Computer Science',
                semester: 1,
                credits: 4,
                status: 'active'
            },
            {
                id: 2,
                code: 'CS201',
                name: 'Data Structures',
                department: 'Computer Science',
                semester: 3,
                credits: 4,
                status: 'active'
            },
            {
                id: 3,
                code: 'CS301',
                name: 'Database Management Systems',
                department: 'Computer Science',
                semester: 4,
                credits: 3,
                status: 'draft'
            }
        ]
    });
});

// Get single course
router.get('/:id', (req, res) => {
    const courseId = req.params.id;
    res.json({
        success: true,
        data: {
            id: courseId,
            code: 'CS101',
            name: 'Introduction to Programming',
            syllabus: 'This course introduces fundamental programming concepts including variables, control structures, functions, arrays, and basic object-oriented programming.',
            department: 'Computer Science',
            semester: 1,
            credits: 4,
            facultyId: 1,
            status: 'active'
        }
    });
});

// Create course
router.post('/', (req, res) => {
    const courseData = req.body;
    res.status(201).json({
        success: true,
        message: 'Course created successfully',
        data: {
            id: Date.now(),
            ...courseData,
            createdAt: new Date().toISOString()
        }
    });
});

// Update course
router.put('/:id', (req, res) => {
    res.json({
        success: true,
        message: 'Course updated successfully',
        data: {
            id: req.params.id,
            ...req.body,
            updatedAt: new Date().toISOString()
        }
    });
});

// Delete course
router.delete('/:id', (req, res) => {
    res.json({
        success: true,
        message: `Course ${req.params.id} deleted successfully`
    });
});

// Generate COs for a course
router.post('/:id/generate-cos', (req, res) => {
    res.json({
        success: true,
        data: [{
                code: 'CO1',
                description: 'Understand basic programming concepts including variables, data types, and control structures',
                bloomLevel: 'Understand',
                mappedPOs: ['PO1', 'PO2'],
                mappedPSOs: ['PSO1']
            },
            {
                code: 'CO2',
                description: 'Apply programming constructs to solve simple computational problems',
                bloomLevel: 'Apply',
                mappedPOs: ['PO2', 'PO3'],
                mappedPSOs: ['PSO1', 'PSO2']
            },
            {
                code: 'CO3',
                description: 'Analyze problems and design algorithmic solutions',
                bloomLevel: 'Analyze',
                mappedPOs: ['PO2', 'PO4'],
                mappedPSOs: ['PSO2']
            },
            {
                code: 'CO4',
                description: 'Develop and test programs using appropriate programming paradigms',
                bloomLevel: 'Create',
                mappedPOs: ['PO3', 'PO5'],
                mappedPSOs: ['PSO1', 'PSO2']
            }
        ]
    });
});

// Get COs for a course
router.get('/:id/cos', (req, res) => {
    res.json({
        success: true,
        data: [{
                id: 1,
                code: 'CO1',
                description: 'Understand basic programming concepts',
                bloomLevel: 'Understand',
                mappedPOs: ['PO1', 'PO2']
            },
            {
                id: 2,
                code: 'CO2',
                description: 'Apply programming constructs',
                bloomLevel: 'Apply',
                mappedPOs: ['PO2', 'PO3']
            }
        ]
    });
});

module.exports = router;