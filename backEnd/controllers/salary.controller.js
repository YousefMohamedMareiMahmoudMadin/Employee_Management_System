import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js";

export const addSalary = async (req, res) => {
    try {
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

        if (!employeeId || !basicSalary || !payDate) {
            return res.status(400).json({ success: false, error: "All fields are required" });
        }

        const employeeExists = await Employee.findById(employeeId);
        if (!employeeExists) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }

        const netSalary = Number(basicSalary) + Number(allowances || 0) - Number(deductions || 0);

        const newSalary = new Salary({
            employeeId,
            basicSalary: Number(basicSalary),
            allowances: Number(allowances || 0),
            deductions: Number(deductions || 0),
            netSalary,
            payDate
        });

        await newSalary.save();
        return res.status(200).json({ success: true, message: "Salary added successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getSalaryHistory = async (req, res) => {
    try {
        const { id } = req.params;

        let employee = await Employee.findById(id);
        if (!employee) {
            employee = await Employee.findOne({ userId: id });
        }

        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee profile not found" });
        }

        const history = await Salary.find({ employeeId: employee._id })
            .populate({
                path: 'employeeId',
                populate: { path: 'userId', select: 'name' }
            });

        return res.status(200).json({ success: true, history });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};