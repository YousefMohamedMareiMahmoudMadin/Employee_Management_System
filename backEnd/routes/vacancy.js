import express from "express";
import { verifyUser } from "../middleware/authMiddleware.js";
import { 
    addVacancy, 
    getMyVacancies, 
    getAdminVacancies, 
    updateVacancyStatus 
} from "../controllers/vacancy.controller.js";

const router = express.Router();

router.get("/", verifyUser, getAdminVacancies);
router.post("/add", verifyUser, addVacancy);
router.patch("/update/:id", verifyUser, updateVacancyStatus);
router.get("/:id", verifyUser, getMyVacancies); 

export default router;