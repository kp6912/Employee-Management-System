import Leave from "../models/Leave.js";

/* ===============================
   Add Leave Controller
================================= */
const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    // Validate required fields
    if (!userId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check for overlapping leave
    const overlappingLeave = await Leave.findOne({
      userId: userId,
      $or: [
        { startDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
        { endDate: { $lte: new Date(endDate), $gte: new Date(startDate) } },
      ],
    });

    if (overlappingLeave) {
      return res.status(409).json({
        success: false,
        message: "You already have a leave overlapping with this date range",
      });
    }

    // Create leave
    const leave = await Leave.create({
      userId,
      leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending", // default status
    });

    return res.status(201).json({
      success: true,
      message: "Leave applied successfully",
      leave,
    });
  } catch (error) {
    console.error("Add Leave Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

/* ===============================
   Get All Leaves for an Employee
================================= */
const getLeave = async (req, res) => {
  try {
    const { id } = req.params; // employee userId

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    const leaves = await Leave.find({ employeeId: id }).sort({ createdAt: -1 });


    return res.status(200).json({
      success: true,
      leaves,
    });
  } catch (error) {
    console.error("GET EMPLOYEE LEAVES ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: "userId", select: "name" },        // Employee → User → name
        { path: "department", select: "dep_name" } // Employee → Department → dep_name
      ]
    });

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    console.error("GET EMPLOYEE LEAVES ERROR:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
const getLeaveDetail = async (req, res) => {
  try {
    const { id } = req.params; // leave ID

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Leave ID is required",
      });
    }

    // Populate employee → user & department
    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: [
        { path: "userId", select: "name email profileImage" },
        { path: "department", select: "dep_name" },
      ],
    });

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    return res.status(200).json({
      success: true,
      leave,
    });
  } catch (error) {
    console.error("GET LEAVE DETAIL ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
} 



/* ===============================
   Update Leave Status (Approve / Reject)
================================= */
const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;

    const leave = await Leave.findByIdAndUpdate(
      id,
      { status: req.body.status },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({
        success: false,
        message: "Leave not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Leave status updated successfully",
      leave,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      success: false,
      message: "Leave update server error",
    });
  }
};


export { updateLeave };



export { addLeave, getLeave,getLeaves,getLeaveDetail };
