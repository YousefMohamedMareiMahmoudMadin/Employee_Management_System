import express from 'express';
import { login } from '../controllers/auth.Controller.js'; 
import { verifyUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', login);
router.get('/verify', verifyUser, (req, res) => {
    return res.status(200).json({ success: true, user: req.user });
});

export default router;