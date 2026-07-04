import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import { addSalary, getSalaryHistory } from "../controllers/salary.controller.js";

const router = express.Router();

router.post("/add", verifyUser, addSalary);
router.get("/:id", verifyUser, getSalaryHistory);

export default router;