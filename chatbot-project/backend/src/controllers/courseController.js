const Course = require('../models/Course');

// Tüm dersleri getir
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isActive: true });
        res.send(courses);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Kategori bazlı dersleri getir
const getCoursesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const courses = await Course.find({ category, isActive: true });
        res.send(courses);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

// Yeni ders ekle (Admin)
const createCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).send(course);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Ders güncelle (Admin)
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!course) {
            return res.status(404).send({ error: 'Ders bulunamadı' });
        }
        res.send(course);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};

// Ders sil (Admin)
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).send({ error: 'Ders bulunamadı' });
        }
        res.send(course);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = {
    getAllCourses,
    getCoursesByCategory,
    createCourse,
    updateCourse,
    deleteCourse
}; 