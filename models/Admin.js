const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password_hash: String,
    role: String,
    permissions: [String],
    last_login: Date
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
