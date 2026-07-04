import mongoose from "mongoose";

const vacancySchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },
    vacancyType: {
        type: String,
        enum: ["Sick vacancy", "Casual vacancy", "Annual vacancy"],
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    reason: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Vacancy = mongoose.model("Vacancy", vacancySchema);
export default Vacancy;