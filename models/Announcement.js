const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: String,
    content: String,
    posted_by: { type: mongoose.Schema.Types.ObjectId },
    target_audience: String,
    created_at: { type: Date, default: Date.now },
    expires_at: Date
});

module.exports = mongoose.model('Announcement', announcementSchema);
