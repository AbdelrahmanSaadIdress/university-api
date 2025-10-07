const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    ref_id: mongoose.Schema.Types.ObjectId,
    ref_type: String,
    username: { type: String, unique: true },
    password_hash: String,
    last_login: Date
});

module.exports = mongoose.model('User', userSchema);
