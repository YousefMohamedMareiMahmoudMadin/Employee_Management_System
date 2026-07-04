import mongoose from "mongoose";

const salarySchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    basicSalary: {
        type: Number,
        required: true
    },
    allowances: {
        type: Number,
        default: 0
    },
    deductions: {
        type: Number,
        default: 0
    },
    netSalary: {
        type: Number,
        required: true
    },
    payDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Salary = mongoose.model("Salary", salarySchema);
export default Salary;