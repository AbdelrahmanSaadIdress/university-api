const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/faculty_management';
  console.log('🧩 Connecting to MongoDB URI:', uri);
  console.log('📚 Connected to database:', mongoose.connection.name);
  try {
    await mongoose.connect(uri);
    console.log(`✅ MongoDB connected successfully`);
    console.log('📚 Connected to database:', mongoose.connection.name); // <--- ADD THIS
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
