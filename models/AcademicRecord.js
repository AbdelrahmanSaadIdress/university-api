const mongoose = require('mongoose');

const academicRecordSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    semester: String,
    grade: String,
    gpa_points: Number,
    attendance_percentage: Number
}, { timestamps: true });

module.exports = mongoose.model('AcademicRecord', academicRecordSchema);
