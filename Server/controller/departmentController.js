import mongoose from "mongoose";
import Department from "../models/Department.js";

/* ================= GET ALL ================= */
const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server failed" });
  }
};

/* ================= ADD ================= */
const addDepartment = async (req, res) => {
  try {
    const { dep_name, description } = req.body;

    const newDep = await Department.create({
      dep_name,
      description,
    });

    return res.status(201).json({
      success: true,
      department: newDep,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server failed" });
  }
};

/* ================= GET BY ID ================= */
const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    // ✅ CRITICAL
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid department ID" });
    }

    const department = await Department.findById(id);

    if (!department) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server failed" });
  }
};

/* ================= UPDATE ================= */
const updateDep = async (req, res) => {
  try {
    const { id } = req.params;
    const { dep_name, description } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid department ID" });
    }

    const updatedep = await Department.findByIdAndUpdate(
      id,
      { dep_name, description },
      { new: true }
    );

    if (!updatedep) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department: updatedep });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server failed" });
  }
};

/* ================= DELETE ================= */
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid department ID" });
    }

    const deletedep = await Department.findByIdAndDelete(id);

    if (!deletedep) {
      return res
        .status(404)
        .json({ success: false, error: "Department not found" });
    }

    return res.status(200).json({ success: true, department: deletedep });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: "Server failed" });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDep,
  deleteDepartment,
};
