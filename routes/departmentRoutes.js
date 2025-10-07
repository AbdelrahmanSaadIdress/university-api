const express = require('express');
const router = express.Router();
const Department = require('../models/Department');

// GET all departments
router.get('/', async (req, res) => {
    const departments = await Department.find();
    res.json(departments);
});

// POST new department
router.post('/', async (req, res) => {
    try {
        const dept = new Department(req.body);
        await dept.save();
        res.status(201).json(dept);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
