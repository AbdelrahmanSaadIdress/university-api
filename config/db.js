const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/faculty_management';

  console.log('🧩 Connecting to MongoDB URI:', uri);

  try {
    await mongoose.connect(uri);
    console.log(`✅ MongoDB connected successfully`);
    console.log("📚 Connected to database:", mongoose.connection.name);
    console.log("📍 Host:", mongoose.connection.host);
    console.log("🔌 Port:", mongoose.connection.port);
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
