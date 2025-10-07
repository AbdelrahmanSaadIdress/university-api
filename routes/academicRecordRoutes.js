const express = require('express');
const router = express.Router();
const AcademicRecord = require('../models/AcademicRecord');

router.get('/', async (req, res) => {
    const records = await AcademicRecord.find().populate('student_id course_id');
    res.json(records);
});

router.post('/', async (req, res) => {
    try {
        const record = new AcademicRecord(req.body);
        await record.save();
        res.status(201).json(record);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
