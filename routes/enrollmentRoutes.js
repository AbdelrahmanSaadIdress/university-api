const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');

router.get('/', async (req, res) => {
    const data = await Enrollment.find().populate('student_id').populate('course_id');
    res.json(data);
});

router.post('/', async (req, res) => {
    try {
        const enrollment = new Enrollment(req.body);
        await enrollment.save();
        res.status(201).json(enrollment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
