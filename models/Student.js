const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
    student_id: { type: String, required: true, unique: true },
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    phone: String,
    gender: String,
    dob: Date,
    department_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    address: String,
    enrollment_status: String,
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', StudentSchema);
