const express = require('express');
const router = express.Router();
const {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    generateCOs,
    getCourseCOs
} = require('../controllers/course.controller');

// Test route
router.get('/test', (req, res) => {
    res.json({
        success: true,
        message: 'Course routes are working!',
        time: new Date().toISOString()
    });
});

// Course CRUD
router.get('/', getCourses);
router.get('/:id', getCourse);
router.post('/', createCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);

// CO generation + listing
router.post('/:id/generate-cos', generateCOs);
router.get('/:id/cos', getCourseCOs);

module.exports = router;
