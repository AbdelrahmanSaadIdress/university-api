const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');

router.get('/', async (req, res) => {
    const data = await Attendance.find().populate('student_id course_id');
    res.json(data);
});

router.post('/', async (req, res) => {
    try {
        const record = new Attendance(req.body);
        await record.save();
        res.status(201).json(record);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
