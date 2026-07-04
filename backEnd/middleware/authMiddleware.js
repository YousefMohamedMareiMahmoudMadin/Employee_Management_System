import jwt from 'jsonwebtoken';
import User from '../models/User.js'; 

const verifyUser = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ success: false, error: "Token Not Provided" });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ success: false, error: "Token Not Provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ success: false, error: "Token Not Valid" });
        }

        const user = await User.findById(decoded.id).select('-password');
        if (!user) {
            return res.status(404).json({ success: false, error: "User Not Found" });
        }

        req.user = user;
        next();

    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({ success: false, error: "Invalid or expired token" });
    }
};

export { verifyUser };