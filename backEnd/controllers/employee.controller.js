import Employee from '../models/Employee.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'public/uploads';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only images are allowed (jpeg, jpg, png, webp)'));
    }
});

export const addEmployee = async (req, res) => {
    try {
        const { 
            name, email, employeeId, dob, gender, 
            maritalStatus, designation, department, salary, password, role 
        } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, error: "Email already registered" });
        }

        const empIdExists = await Employee.findOne({ employeeId });
        if (empIdExists) {
            return res.status(400).json({ success: false, error: "Employee ID already assigned" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            profileImage: req.file ? req.file.path.replace(/\\/g, "/") : ""
        });
        const savedUser = await newUser.save();

        const newEmployee = new Employee({
            userId: savedUser._id,
            employeeId,
            dob,
            gender,
            maritalStatus,
            designation,
            department,
            salary,
            image: req.file ? req.file.path.replace(/\\/g, "/") : ""
        });
        await newEmployee.save();

        return res.status(200).json({ success: true, message: "Employee registered successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find()
            .populate('userId', { password: 0 })
            .populate('department');
        return res.status(200).json({ success: true, employees });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        let employee = await Employee.findById(id)
            .populate('userId', { password: 0 })
            .populate('department');
            
        if (!employee) {
            employee = await Employee.findOne({ userId: id })
                .populate('userId', { password: 0 })
                .populate('department');
        }

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }
        return res.status(200).json({ success: true, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, designation, department, salary, maritalStatus } = req.body;

        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        await User.findByIdAndUpdate(employee.userId, { name });

        const updateFields = {
            designation,
            department,
            salary,
            maritalStatus,
            updatedAt: Date.now()
        };

        if (req.file) {
            updateFields.image = req.file.path.replace(/\\/g, "/");
            await User.findByIdAndUpdate(employee.userId, { profileImage: updateFields.image });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(id, updateFields, { new: true });
        return res.status(200).json({ success: true, message: "Employee profile updated successfully", employee: updatedEmployee });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findById(id);
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        await User.findByIdAndDelete(employee.userId);
        await Employee.findByIdAndDelete(id);

        return res.status(200).json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};