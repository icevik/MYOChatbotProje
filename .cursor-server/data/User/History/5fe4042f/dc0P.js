const express = require('express');
const { auth, adminAuth } = require('../middleware/auth');
const {
    getAllCourses,
    getCoursesByCategory,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController');

const router = express.Router();

router.get('/', auth, getAllCourses);
router.get('/category/:category', auth, getCoursesByCategory);
router.post('/', adminAuth, createCourse);
router.patch('/:id', adminAuth, updateCourse);
router.delete('/:id', adminAuth, deleteCourse);

module.exports = router; 