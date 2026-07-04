import Vacancy from "../models/Vacancy.js";
import Employee from "../models/Employee.js";

export const addVacancy = async (req, res) => {
    try {
        const { userId, employeeId, vacancyType, startDate, endDate, reason } = req.body;
        
       
        const targetId = userId || employeeId;
        
        if (!targetId) {
            return res.status(400).json({ success: false, error: "Employee identifier is required." });
        }

        const employee = await Employee.findOne({ userId: targetId });
        
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee node not found." });
        }

        const newVacancy = new Vacancy({
            employeeId: employee._id,
            vacancyType,
            startDate,
            endDate,
            reason,
            status: "Pending" 
        });

        await newVacancy.save();
        return res.status(200).json({ success: true, message: "Vacancy request logged successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getMyVacancies = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findOne({ userId: id });
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee identity not found." });
        }
        const vacancies = await Vacancy.find({ employeeId: employee._id });
        return res.status(200).json({ success: true, vacancies });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getAdminVacancies = async (req, res) => {
    try {
        const vacancies = await Vacancy.find()
            .populate({
                path: 'employeeId',
                populate: [
                    { path: 'userId', select: 'name' },
                    { path: 'department', select: 'name' }
                ]
            });
        return res.status(200).json({ success: true, vacancies });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const updateVacancyStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ success: false, error: "Invalid status deployment." });
        }
        await Vacancy.findByIdAndUpdate(id, { status });
        return res.status(200).json({ success: true, message: `Vacancy successfully updated to ${status}.` });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};