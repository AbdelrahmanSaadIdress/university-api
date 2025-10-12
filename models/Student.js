const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const StudentSchema = new mongoose.Schema({
    student_id: {
        type: String,
        required: [true, 'Student ID is required'],
        unique: true,
        trim: true
    },
    first_name: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    phone: {
        type: String,
        trim: true,
        match: [/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number']
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    dob: {
        type: Date
    },
    department_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    address: {
        type: String,
        trim: true
    },
    enrollment_status: {
        type: String,
        enum: ['Active', 'Inactive', 'Graduated', 'Suspended'],
        default: 'Active'
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date
});

// Hash password before saving
StudentSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Compare password for login
StudentSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Student', StudentSchema);
