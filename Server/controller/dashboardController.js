import Employee from "../models/Employee.js";
import Department from "../models/Department.js";
import Leave from "../models/Leave.js";
const getSummary = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const totalDepartments = await Department.countDocuments();

    const salaryResult = await Employee.aggregate([
      { $group: { _id: null, totalSalary: { $sum: "$salary" } } },
    ]);
    const totalSalary = salaryResult[0]?.totalSalary || 0;

    const employeesAppliedForLeave = await Leave.distinct("employeeId");

    const leaveStatus = await Leave.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const leaveSummary = {
      appliedFor: employeesAppliedForLeave.length,
      approved:
        leaveStatus.find((item) => item._id === "Approved")?.count || 0,
      rejected:
        leaveStatus.find((item) => item._id === "Rejected")?.count || 0,
      pending:
        leaveStatus.find((item) => item._id === "Pending")?.count || 0,
    };

    return res.status(200).json({
      success: true,
      summary: {
        totalEmployees,
        totalDepartments,
        totalSalary,
        leaveSummary,
      },
    });
  } catch (error) {
    console.error("DASHBOARD SUMMARY ERROR:", error);
    return res.status(500).json({
      success: false,
      message: "Dashboard summary server error",
    });
  }
};

export  {getSummary};

