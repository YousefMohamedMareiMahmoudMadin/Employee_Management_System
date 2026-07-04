import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import { getDashboardSummary } from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/summary", verifyUser, getDashboardSummary);

export default router;