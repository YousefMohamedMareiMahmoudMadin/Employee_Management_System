import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Vacancy from "../models/Vacancy.js";

export const getDashboardSummary = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments();
        const totalDepartments = await Department.countDocuments();

        const totalSalariesGroup = await Employee.aggregate([
            { $group: { _id: null, total: { $sum: "$salary" } } }
        ]);
        const totalSalary = totalSalariesGroup.length > 0 ? totalSalariesGroup[0].total : 0;

        const appliedEmployees = await Vacancy.distinct("employeeId");

        const vacancyStats = await Vacancy.aggregate([
            { $group: { _id: "$status", count: { $sum: 1 } } }
        ]);

        const vacancySummary = {
            appliedCount: appliedEmployees.length,
            approved: vacancyStats.find(v => v._id === "Approved")?.count || 0,
            pending: vacancyStats.find(v => v._id === "Pending")?.count || 0,
            rejected: vacancyStats.find(v => v._id === "Rejected")?.count || 0,
        };

        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            totalSalary,
            vacancySummary
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};