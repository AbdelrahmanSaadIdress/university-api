const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// 🟢 GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().populate('department_id');
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// 🟢 GET student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('department_id');
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🟢 POST new student
router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 🟢 PUT update student
router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 🟢 DELETE student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})





module.exports = router;

