import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addEmployee,
  upload,
  getEmployees,
  getEmployee,
  updateEmployee,
  fetchEmployeeById,
  getEmployeeSummary
} from "../controller/employeeController.js";

const router = express.Router();

router.post(
  "/add",
  authMiddleware,
  upload.single("image"),
  addEmployee
);

router.get("/", authMiddleware, getEmployees);

router.get("/summary", authMiddleware, getEmployeeSummary);
router.get("/department/:id", authMiddleware, fetchEmployeeById);

router.get("/:id", authMiddleware, getEmployee);
router.put("/:id", authMiddleware, upload.single("image"), updateEmployee);


export default router;
