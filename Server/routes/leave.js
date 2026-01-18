import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { addLeave,getLeave,getLeaves,getLeaveDetail,updateLeave } from "../controller/leaveController.js";

const router = express.Router();

// Add salary
router.post("/add", authMiddleware, addLeave);
router.get("/user/:id",authMiddleware, getLeave);
router.get("/detail/:id",authMiddleware, getLeaveDetail);
router.get("/",authMiddleware,getLeaves);
router.put("/status/:id",authMiddleware, updateLeave);



export default router;
