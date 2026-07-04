import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

export const defaultAttendance = async (req, res, next) => {
    try {
        const todayStr = new Date().toISOString().split("T")[0];
        const existingAttendance = await Attendance.findOne({ date: todayStr });

        if (!existingAttendance) {
            const employees = await Employee.find({});
            if (employees.length > 0) {
                const defaultRecords = employees.map(emp => ({
                    date: todayStr,
                    employeeId: emp._id,
                    status: null
                }));
                await Attendance.insertMany(defaultRecords);
            }
        }
        next();
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};