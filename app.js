// server.js
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1️⃣ Connect to DB
connectDB();

// 2️⃣ Middleware
app.use(express.json());
app.use(cors({ origin: "*" }));

// 3️⃣ Routes
const studentRoutes = require('./routes/studentRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const academicRecordRoutes = require('./routes/academicRecordRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');

app.use('/api/students', studentRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);
app.use('/api/records', academicRecordRoutes);
app.use('/api/attendance', attendanceRoutes);

// 4️⃣ Test route
app.get('/', (req, res) => {
  res.send('Faculty Management API running ✅');
});

// 5️⃣ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


