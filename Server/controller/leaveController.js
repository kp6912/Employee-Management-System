import Leave from "../models/Leave.js";

/* ===============================
   Add Leave Controller
================================= */
const addLeave = async (req, res) => {
  try {
    const { employeeId, leaveType, startDate, endDate, reason } = req.body;

    if (!employeeId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Find the Employee document that corresponds to the User ID
    const Employee = (await import('../models/Employee.js')).default;
    const employee = await Employee.findOne({ userId: employeeId });
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee record not found",
      });
    }

    const overlappingLeave = await Leave.findOne({
      employeeId: employee._id,
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

    const leave = await Leave.create({
      employeeId: employee._id, // Use Employee ObjectId instead of User ID
      leaveType,
      startDate,
      endDate,
      reason,
      status: "Pending",
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
    const { id } = req.params; // Can be either userId or employeeId

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Employee ID is required",
      });
    }

    // Find the Employee document - try by userId first, then by Employee _id
    const Employee = (await import('../models/Employee.js')).default;
    let employee = await Employee.findOne({ userId: id });
    
    // If not found by userId, try finding by Employee's own _id (for admin access)
    if (!employee) {
      employee = await Employee.findById(id);
    }
    
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee record not found",
      });
    }

    const leaves = await Leave.find({ employeeId: employee._id }).sort({ createdAt: -1 });


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
