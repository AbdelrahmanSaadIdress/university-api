const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    date: Date,
    status: String,
    note: String
});

module.exports = mongoose.model('Attendance', attendanceSchema);
