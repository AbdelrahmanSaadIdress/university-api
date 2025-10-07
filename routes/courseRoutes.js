const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET all courses
router.get('/', async (req, res) => {
    const courses = await Course.find().populate('department_id');
    res.json(courses);
});

// POST new course
router.post('/', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
