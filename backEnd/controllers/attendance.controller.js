import Attendance from "../models/Attendance.js";
import Employee from "../models/Employee.js";

export const getAttendance = async (req, res) => {
    try {
        const { date } = req.query;
        
        const targetDateStr = date || new Date().toISOString().split("T")[0];
        
      
        const startOfDay = new Date(targetDateStr);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(targetDateStr);
        endOfDay.setHours(23, 59, 59, 999);

       
        const attendance = await Attendance.find({
            date: {
                $gte: startOfDay,
                $lte: endOfDay
            }
        })
        .populate({
            path: "employeeId",
            populate: [
                { path: "userId", select: "name" },
                { path: "department", select: "name" }
            ]
        });

       
        if (attendance.length === 0) {
            const employees = await Employee.find().populate("userId department");
            const fallbackAttendance = employees.map(emp => ({
                _id: emp._id, 
                employeeId: emp,
                status: "Not Marked",
                date: targetDateStr
            }));
            return res.status(200).json({ success: true, attendance: fallbackAttendance });
        }

        return res.status(200).json({ success: true, attendance });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const updateAttendance = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { status, date } = req.body;
        const targetDateStr = date || new Date().toISOString().split("T")[0];

        const startOfDay = new Date(targetDateStr);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(targetDateStr);
        endOfDay.setHours(23, 59, 59, 999);

        
        const updatedRecord = await Attendance.findOneAndUpdate(
            { 
                employeeId, 
                date: { $gte: startOfDay, $lte: endOfDay } 
            },
            { status, date: startOfDay },
            { returnDocument: 'after', upsert: true }
        );

        return res.status(200).json({ success: true, record: updatedRecord });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export const getAttendanceReport = async (req, res) => {
    try {
        const { date, limit = 50, skip = 0 } = req.query;
        let queryFilter = {};

        if (date) {
            const startOfDay = new Date(date);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(date);
            endOfDay.setHours(23, 59, 59, 999);
            queryFilter.date = { $gte: startOfDay, $lte: endOfDay };
        }

        const attendanceData = await Attendance.find(queryFilter)
            .populate({
                path: "employeeId",
                populate: [
                    { path: "userId", select: "name" },
                    { path: "department", select: "name" }
                ]
            })
            .sort({ date: -1 })
            .limit(Number(limit))
            .skip(Number(skip));

        const groupData = attendanceData.reduce((result, record) => {
            
            let recordDate = "";
            if (record.date instanceof Date) {
                const year = record.date.getFullYear();
                const month = String(record.date.getMonth() + 1).padStart(2, '0');
                const day = String(record.date.getDate()).padStart(2, '0');
                recordDate = `${year}-${month}-${day}`;
            } else {
                recordDate = record.date;
            }

            if (!result[recordDate]) {
                result[recordDate] = [];
            }
            
            result[recordDate].push({
                employeeId: record.employeeId?.employeeId || "N/A",
                name: record.employeeId?.userId?.name || "N/A",
                department: record.employeeId?.department?.name || "N/A",
                status: record.status || "Not Marked"
            });
            return result;
        }, {});

        return res.status(200).json({ success: true, groupData });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};