import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import { defaultAttendance } from "../middleware/defaultAttendance.js";
import { getAttendance, updateAttendance, getAttendanceReport } from "../controllers/attendance.controller.js";

const router = express.Router();

router.get("/", verifyUser, defaultAttendance, getAttendance);
router.get("/report", verifyUser, getAttendanceReport);
router.put("/update/:employeeId", verifyUser, updateAttendance);

export default router;