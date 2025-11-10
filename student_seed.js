const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Student = require('./models/Student'); // adjust the path if needed


console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")

const uri = 'mongodb://127.0.0.1:27017/faculty_management';

const departments = [
    '670a55a7b320c3e5f47e84b2',
    '670a55a7b320c3e5f47e84b3',
    '670a55a7b320c3e5f47e84b4'
]; // replace with real Department _ids from your DB

async function seedStudents() {
    try {
        await mongoose.connect(uri);
        console.log('✅ Connected to MongoDB');

        // Delete old students first (optional)
        await Student.deleteMany({});
        console.log('🗑️ Old students removed');

        const salt = await bcrypt.genSalt(10);

        const students = [];
        for (let i = 1; i <= 50; i++) {
        const hashedPassword = await bcrypt.hash(`password${i}`, salt);
        students.push({
            student_id: `STU${1000 + i}`,
            full_name: `Student${i} Example${i}`,
            email: `student${i}@university.edu`,
            phone: `+201000000${(100 + i).toString().slice(-3)}`,
            gender: i % 2 === 0 ? 'Male' : 'Female',
            dob: new Date(2000, i % 12, i),
            department_id: departments[i % departments.length],
            address: `City ${i}, Street ${i}`,
            enrollment_status: 'Active',
            password: hashedPassword,
            confirm_password: hashedPassword

        });
    }

    const result = await Student.insertMany(students);
    console.log(`🎉 Successfully inserted ${result.length} students`);

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
    } catch (err) {
        console.error('❌ Error seeding students:', err);
        process.exit(1);
    }
}

seedStudents();
