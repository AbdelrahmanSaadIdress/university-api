const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    course_code: { type: String, unique: true, required: true },
    course_name: { type: String, required: true },
    description: String,
    credits: Number,
    department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    instructor_name: String,
    schedule: String
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
