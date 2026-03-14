// Mock courses data
let courses = [{
        id: 1,
        code: 'CS101',
        name: 'Introduction to Programming',
        syllabus: 'This course introduces fundamental programming concepts including variables, control structures, functions, arrays, and basic object-oriented programming.',
        department: 'Computer Science',
        semester: 1,
        credits: 4,
        facultyId: 2,
        status: 'active',
        mappingCompleted: true,
        attainmentCalculated: false,
        createdAt: '2024-01-15T10:00:00Z'
    },
    {
        id: 2,
        code: 'CS201',
        name: 'Data Structures',
        syllabus: 'This course covers fundamental data structures including arrays, linked lists, stacks, queues, trees, and graphs, along with algorithms for manipulating them.',
        department: 'Computer Science',
        semester: 3,
        credits: 4,
        facultyId: 2,
        status: 'active',
        mappingCompleted: false,
        attainmentCalculated: false,
        createdAt: '2024-01-20T10:00:00Z'
    },
    {
        id: 3,
        code: 'CS301',
        name: 'Database Management Systems',
        syllabus: 'This course introduces database concepts, ER modeling, relational algebra, SQL, normalization, transaction management, and database design.',
        department: 'Computer Science',
        semester: 4,
        credits: 3,
        facultyId: 1,
        status: 'draft',
        mappingCompleted: false,
        attainmentCalculated: false,
        createdAt: '2024-02-01T10:00:00Z'
    }
];

// Mock CO data
let courseOutcomes = [{
        id: 1,
        courseId: 1,
        code: 'CO1',
        description: 'Understand basic programming concepts including variables, data types, and control structures',
        bloomLevel: 'Understand',
        mappedPOs: ['PO1', 'PO2'],
        mappedPSOs: ['PSO1'],
        aiGenerated: true
    },
    {
        id: 2,
        courseId: 1,
        code: 'CO2',
        description: 'Apply programming constructs to solve simple computational problems',
        bloomLevel: 'Apply',
        mappedPOs: ['PO2', 'PO3'],
        mappedPSOs: ['PSO1', 'PSO2'],
        aiGenerated: true
    },
    {
        id: 3,
        courseId: 1,
        code: 'CO3',
        description: 'Analyze problems and design algorithmic solutions',
        bloomLevel: 'Analyze',
        mappedPOs: ['PO2', 'PO4'],
        mappedPSOs: ['PSO2'],
        aiGenerated: true
    }
];

// @desc    Create a new course
// @route   POST /api/courses
const createCourse = async(req, res) => {
    try {
        const courseData = {
            id: courses.length + 1,
            ...req.body,
            facultyId: req.body.facultyId || 2,
            status: 'draft',
            mappingCompleted: false,
            attainmentCalculated: false,
            createdAt: new Date().toISOString()
        };

        courses.push(courseData);

        res.status(201).json({
            success: true,
            data: courseData
        });
    } catch (error) {
        console.error('Create course error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get all courses
// @route   GET /api/courses
const getCourses = async(req, res) => {
    try {
        res.status(200).json({
            success: true,
            count: courses.length,
            data: courses
        });
    } catch (error) {
        console.error('Get courses error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get single course
// @route   GET /api/courses/:id
const getCourse = async(req, res) => {
    try {
        const course = courses.find(c => c.id === parseInt(req.params.id));

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        res.status(200).json({
            success: true,
            data: course
        });
    } catch (error) {
        console.error('Get course error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Update course
// @route   PUT /api/courses/:id
const updateCourse = async(req, res) => {
    try {
        const courseId = parseInt(req.params.id);
        const courseIndex = courses.findIndex(c => c.id === courseId);

        if (courseIndex === -1) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        courses[courseIndex] = {
            ...courses[courseIndex],
            ...req.body,
            updatedAt: new Date().toISOString()
        };

        res.status(200).json({
            success: true,
            data: courses[courseIndex]
        });
    } catch (error) {
        console.error('Update course error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Delete course
// @route   DELETE /api/courses/:id
const deleteCourse = async(req, res) => {
    try {
        const courseId = parseInt(req.params.id);
        courses = courses.filter(c => c.id !== courseId);

        res.status(200).json({
            success: true,
            message: 'Course deleted successfully'
        });
    } catch (error) {
        console.error('Delete course error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Generate COs for a course
// @route   POST /api/courses/:id/generate-cos
const generateCOs = async(req, res) => {
    try {
        const courseId = parseInt(req.params.id);
        const course = courses.find(c => c.id === courseId);

        if (!course) {
            return res.status(404).json({
                success: false,
                message: 'Course not found'
            });
        }

        // Generate COs based on syllabus (mock)
        const newCOs = [{
                id: courseOutcomes.length + 1,
                courseId,
                code: 'CO1',
                description: 'Understand the fundamental concepts of ' + course.name,
                bloomLevel: 'Understand',
                mappedPOs: ['PO1', 'PO2'],
                mappedPSOs: ['PSO1'],
                aiGenerated: true
            },
            {
                id: courseOutcomes.length + 2,
                courseId,
                code: 'CO2',
                description: 'Apply principles of ' + course.name + ' to solve problems',
                bloomLevel: 'Apply',
                mappedPOs: ['PO2', 'PO3'],
                mappedPSOs: ['PSO1', 'PSO2'],
                aiGenerated: true
            },
            {
                id: courseOutcomes.length + 3,
                courseId,
                code: 'CO3',
                description: 'Analyze complex problems using ' + course.name + ' techniques',
                bloomLevel: 'Analyze',
                mappedPOs: ['PO2', 'PO4'],
                mappedPSOs: ['PSO2'],
                aiGenerated: true
            },
            {
                id: courseOutcomes.length + 4,
                courseId,
                code: 'CO4',
                description: 'Design and implement solutions using ' + course.name,
                bloomLevel: 'Create',
                mappedPOs: ['PO3', 'PO5'],
                mappedPSOs: ['PSO1', 'PSO2'],
                aiGenerated: true
            }
        ];

        courseOutcomes.push(...newCOs);

        // Update course status
        const courseIndex = courses.findIndex(c => c.id === courseId);
        courses[courseIndex].status = 'active';
        courses[courseIndex].mappingCompleted = true;

        res.status(200).json({
            success: true,
            data: newCOs
        });
    } catch (error) {
        console.error('Generate COs error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// @desc    Get COs for a course
// @route   GET /api/courses/:id/cos
const getCourseCOs = async(req, res) => {
    try {
        const courseId = parseInt(req.params.id);
        const cos = courseOutcomes.filter(co => co.courseId === courseId);

        res.status(200).json({
            success: true,
            count: cos.length,
            data: cos
        });
    } catch (error) {
        console.error('Get COs error:', error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    generateCOs,
    getCourseCOs
};