const express = require('express');
const { verifyToken, isAdmin } = require('../middleware/auth');
const {
    getAllCourses,
    getCoursesByCategory,
    createCourse,
    updateCourse,
    deleteCourse
} = require('../controllers/courseController');

const router = express.Router();

router.get('/', verifyToken, getAllCourses);
router.get('/category/:category', verifyToken, getCoursesByCategory);
router.post('/', verifyToken, isAdmin, createCourse);
router.patch('/:id', verifyToken, isAdmin, updateCourse);
router.delete('/:id', verifyToken, isAdmin, deleteCourse);

module.exports = router; 