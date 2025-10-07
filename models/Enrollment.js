const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    semester: String,
    status: String,
    enrolled_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);
