import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const login = async (req, res) => {
    try { 
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        } 

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        } 

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15d" });
        
        return res.status(200).json({ 
            success: true,
            token,
            user: { _id: user._id, name: user.name, role: user.role }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

export { login };