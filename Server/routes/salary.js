import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addSalary, getAllSalaries } from "../controller/salaryController.js";

const router = express.Router();

// Add salary
router.post("/add", authMiddleware, addSalary);

// Get all salaries
router.get("/", authMiddleware, getAllSalaries);

export default router;
