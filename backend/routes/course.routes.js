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

router.get('/test', (req, res) => res.json({
    success: true,
    message: 'Course routes working!'
}));

router.get('/', getCourses);
router.post('/', createCourse);
router.get('/:id', getCourse);
router.put('/:id', updateCourse);
router.delete('/:id', deleteCourse);
router.post('/:id/generate-cos', generateCOs);
router.get('/:id/cos', getCourseCOs);

module.exports = router;