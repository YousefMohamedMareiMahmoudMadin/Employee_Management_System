import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const changePassword = async (req, res) => {
    try {
        const { userId, oldPassword, newPassword } = req.body;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, error: "User node not found." });
        }
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, error: "Incorrect old password verification." });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await User.findByIdAndUpdate(userId, { password: hashedPassword });
        return res.status(200).json({ success: true, message: "Password updated successfully." });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};