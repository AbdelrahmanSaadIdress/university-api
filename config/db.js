// config/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/faculty_management';

  try {
    await mongoose.connect(uri);
    console.log(`✅ MongoDB connected → ${uri.includes('mongodb+srv') ? 'Atlas Cloud' : 'Localhost'}`);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
