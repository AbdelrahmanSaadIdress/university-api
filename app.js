const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 🧩 1. الاتصال بقاعدة البيانات
connectDB();

// 🧩 2. إعداد الميدلوير
app.use(express.json());

// ✅ 3. حل مشكلة CORS
app.use(cors({
  origin: "*" // ممكن تغيرها لـ "http://localhost:5173" لو عايزة تحددي الـ Frontend
}));

// 🔗 4. استيراد الـ Routes
const studentRoutes = require('./routes/studentRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const academicRecordRoutes = require('./routes/academicRecordRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

// 🔗 5. استخدام الـ Routes
app.use('/api/students', studentRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/records', academicRecordRoutes);
app.use('/api/attendance', attendanceRoutes);

// 🧠 6. Route تجريبي
app.get('/', (req, res) => {
    res.send('Faculty Management API running ✅');
});

// 🚀 7. تشغيل السيرفر
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
