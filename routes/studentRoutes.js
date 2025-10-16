const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

// 🟢 GET all students
router.get('/', async (req, res) => {
    try {
        const students = await Student.find().populate('department_id');
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🟢 POST login
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1️⃣ Check if student exists
        const student = await Student.findOne({ email });
        if (!student) {
            return res.status(404).json({ message: 'No account found with this email' });
        }

        // 2️⃣ Compare passwords
        const isMatch = await student.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // 3️⃣ Return basic info (without password)
        res.json({
            message: 'Login successful',
            student: {
                id: student._id,
                first_name: student.first_name,
                last_name: student.last_name,
                email: student.email,
                department: student.department_id,
                enrollment_status: student.enrollment_status,
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// 🟢 POST signup (register new student)
router.post('/signup', async (req, res) => {
    try {
        const { full_name, email, password, confirm_password, department_id } = req.body;

        // 1️⃣ Check if email alraaeady exists
        const existingStudent = await Student.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Email already registered' });
        }

        // 2️⃣ Auto-generate unique student_id
        const randomNum = Math.floor(1000 + Math.random() * 9000); // 4-digit number
        const student_id = `${full_name.substring(0,3).toUpperCase()}${randomNum}`;

        // 3️⃣ Create new student
        const newStudent = new Student({
            student_id,
            full_name,
            email,
            password,  // will be hashed automatically
            confirm_password,
            department_id,
            enrollment_status: 'Active'
        });

        await newStudent.save();

        res.status(201).json({
            message: 'Student registered successfully',
            student: {
                id: newStudent._id,
                student_id: newStudent.student_id,
                full_name: newStudent.first_name,
                email: newStudent.email,
                department_id: newStudent.department_id,
                enrollment_status: newStudent.enrollment_status
            }
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



// 🟢 GET student by ID
router.get('/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id).populate('department_id');
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// 🟢 POST new student
router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 🟢 PUT update student
router.put('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// 🟢 DELETE student
router.delete('/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// 🧹 DELETE all students
router.delete('/', async (req, res) => {
    try {
        const result = await Student.deleteMany({}); // removes ALL documents
        res.json({
        message: `All students deleted successfully`,
        deletedCount: result.deletedCount
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// 🟢 POST /api/students/forgot-password
router.post("/forgot-password", async (req, res) => {
    try {
        const { email } = req.body;

        const student = await Student.findOne({ email });
        if (!student) {
        return res.status(404).json({ message: "No account found with that email." });
        }

        // Generate a reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        student.resetPasswordToken = hashedToken;
        student.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
        await student.save();

        // Create the reset link for the frontend
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Send an email with the link
        const html = `
        <div style="font-family: Arial, sans-serif; color: #333;">
            <h2>Password Reset Request</h2>
            <p>Hello ${student.first_name || "Student"},</p>
            <p>We received a request to reset your password.</p>
            <p>Click the button below to set a new password (link expires in 10 minutes):</p>
            <a href="${resetLink}" 
            style="display:inline-block; padding:10px 20px; color:#fff; background-color:#007BFF;
                    border-radius:5px; text-decoration:none;">Reset Password</a>
            <p>If you didn’t request this, you can ignore this email.</p>
        </div>
        `;

        await sendEmail(student.email, "Password Reset Request", html);

        res.json({ message: "Password reset link sent to your email." });
    } catch (err) {
        console.error("Forgot Password Error:", err);
        res.status(500).json({ message: "Server error, please try again later." });
    }


});

// 🟢 POST /api/students/reset-password/:token
router.post("/reset-password/:token", async (req, res) => {
    try {
        const { token } = req.params;
        const { newPassword, confirmPassword } = req.body;

        // 1️⃣ Validate input
        if (!newPassword || !confirmPassword) {
        return res.status(400).json({ message: "Please provide both newPassword and confirmPassword." });
        }
        if (newPassword !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
        }

        // 2️⃣ Hash token to find user
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

        // 3️⃣ Find student with matching token and non-expired time
        const student = await Student.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() },
        });

        if (!student) {
        return res.status(400).json({ message: "Invalid or expired reset token." });
        }

        // 4️⃣ Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        student.password = hashedPassword;
        student.confirm_password = hashedPassword;

        // 5️⃣ Remove token fields
        student.resetPasswordToken = undefined;
        student.resetPasswordExpires = undefined;

        await student.save();

        res.json({ message: "Password has been reset successfully." });
    } catch (err) {
        console.error("Reset Password Error:", err);
        res.status(500).json({ message: "Server error, please try again later." });
    }
});