import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

departmentSchema.pre("deleteOne", { document: true, query: false }, async function () {
    try {
        const Employee = mongoose.model("Employee");
        const Vacancy = mongoose.model("Vacancy");
        const Salary = mongoose.model("Salary");

        const employees = await Employee.find({ department: this._id });
        const employeeIds = employees.map(emp => emp._id);

        await Employee.deleteMany({ department: this._id });
        await Vacancy.deleteMany({ employeeId: { $in: employeeIds } });
        await Salary.deleteMany({ employeeId: { $in: employeeIds } });

    } catch (error) {
        throw error;
    }
});

const Department = mongoose.model("Department", departmentSchema);
export default Department;