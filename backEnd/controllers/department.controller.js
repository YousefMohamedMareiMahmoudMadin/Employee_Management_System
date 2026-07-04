import Department from '../models/Department.js';

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({ success: true, departments });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};

const addDepartment = async (req, res) => {
    try {
        const { name, description } = req.body;
        const existingDept = await Department.findOne({ name });
        if (existingDept) {
            return res.status(400).json({ success: false, error: "Department already exists" });
        }
        const newDepartment = new Department({ name, description });
        await newDepartment.save();
        return res.status(200).json({ success: true, message: "Department added successfully", department: newDepartment });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};

const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);
        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }
        return res.status(200).json({ success: true, department });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};

const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedDept = await Department.findByIdAndUpdate(id, { name, description }, { new: true });
        return res.status(200).json({ success: true, message: "Department updated successfully", department: updatedDept });
    } catch (error) {
        return res.status(500).json({ success: false, error: "Server Error" });
    }
};

export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);
        
        if (!department) {
            return res.status(404).json({ success: false, error: "Department not found" });
        }

        await department.deleteOne();
        return res.status(200).json({ success: true, message: "Department and all associated records deleted successfully" });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};

export { addDepartment, getDepartments, getDepartmentById, updateDepartment };