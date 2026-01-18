import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getSummary } from "../controller/dashboardController.js";


const router = express.Router();

// Add salary
//router.post("/add", authMiddleware, addSalary);

// Get all salaries
router.get("/summary", authMiddleware, getSummary);

export default router;
