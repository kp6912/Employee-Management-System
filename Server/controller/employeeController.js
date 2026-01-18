import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";
import fs from "fs";

/* ===============================
   Ensure upload directory exists
================================= */

const uploadDir = path.join("public", "uploads");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

/* ===============================
   Multer configuration
================================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

/* ===============================
   Add Employee Controller
================================= */

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      password,
      role,
    } = req.body;

    /* Validate required fields */
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and password are required",
      });
    }

    /* Check if user already exists */
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        success: false,
        error: "User already registered",
      });
    }

    /* Hash password */
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    /* Create User */
    const newUser = new User({
      name,
      email,
      password: hashPassword,
      role,
      profileImage: req.file ? req.file.filename : "",
    });

    const savedUser = await newUser.save();

    /* Create Employee */
    const newEmployee = new Employee({
      userId: savedUser._id,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
    });

    await newEmployee.save();

    return res.status(201).json({
      success: true,
      message: "Employee created successfully",
    });
  } catch (error) {
    console.error("ADD EMPLOYEE ERROR:", error);
    return res.status(500).json({
      success: false,
      error: "Server error in adding employee",
    });
  }
};

/* ===============================
   Get All Employees
================================= */

const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({})
      .populate("userId", "-password")
      .populate("department", "dep_name");

    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error("FETCH EMPLOYEES ERROR:", error);
    res.status(500).json({
      success: false,
      error: "Server error in fetching employees",
    });
  }
};


const getEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    let employee = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      employee = await Employee.findById(id)
        .populate("userId", "-password")
        .populate("department");

      if (!employee) {
        employee = await Employee.findOne({ userId: id })
          .populate("userId", "-password")
          .populate("department");
      }
    }

    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    console.error("FETCH EMPLOYEE ERROR:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};


const updateEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      employeeId,
      dob,
      gender,
      maritalStatus,
      designation,
      department,
      salary,
      role,
    } = req.body;

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        error: "Employee not found",
      });
    }

    // Update employee fields
    employee.employeeId = employeeId;
    employee.dob = dob;
    employee.gender = gender;
    employee.maritalStatus = maritalStatus;
    employee.designation = designation;
    employee.department = department;
    employee.salary = salary;

    await employee.save();

    // Update user
    const user = await User.findById(employee.userId);
    if (user) {
      user.name = name;
      user.email = email;
      user.role = role;

      if (req.file) {
        user.profileImage = req.file.filename;
      }

      await user.save();
    }

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
    });
  } catch (error) {
    console.error("UPDATE EMPLOYEE ERROR:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
};
const fetchEmployeeById = async (req,res)=>{
  const {id}= req.params;
  try {
    const employees = await Employee.find({department:id})
      
    res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error("FETCH EMPLOYEE ERROR:", error);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }


}


const getEmployeeSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();

    res.status(200).json({
      success: true,
      summary: {
        salary: 0,
        leaves: 0,
        profileComplete: "Yes",
        totalEmployees,
      },
    });
  } catch (error) {
    console.error("SUMMARY FETCH ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Summary fetch failed",
    });
  }
};






export {addEmployee, upload ,getEmployees,getEmployee,updateEmployee,fetchEmployeeById,getEmployeeSummary}
