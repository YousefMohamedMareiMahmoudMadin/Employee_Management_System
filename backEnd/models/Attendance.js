import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    status: {
        type: String,
        enum: ["Present", "Absent", "Sick", "Vacancy", null],
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;