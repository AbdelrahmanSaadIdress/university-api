const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    dept_code: { type: String, unique: true, required: true },
    dept_name: { type: String, required: true },
    office_location: String
}, { timestamps: true });

module.exports = mongoose.model('Department', departmentSchema);
