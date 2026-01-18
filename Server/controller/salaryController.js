import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js"

const addSalary = async (req, res) => {
  try {
    const {
      employeeId,
      basicSalary,
      allowances,
      deductions,
      month,
      year
    } = req.body;

    if (!employeeId || !basicSalary || !month || !year) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing",
      });
    }

    const netSalary =
      Number(basicSalary) +
      Number(allowances || 0) -
      Number(deductions || 0);

    const existingSalary = await Salary.findOne({
      employeeId,
      month,
      year,
    });

    if (existingSalary) {
      return res.status(409).json({
        success: false,
        message: "Salary already added for this employee for the selected month",
      });
    }

    const salary = await Salary.create({
      employeeId,
      basicSalary,
      allowances,
      deductions,
      netSalary,
      month,
      year,
    });

    return res.status(201).json({
      success: true,
      message: "Salary added successfully",
      salary,
    });
  } catch (error) {
    console.error("Add Salary Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const getAllSalaries = async (req, res) => {
  try {
    const {id} = req.params;
    let salaries = await Salary.find()
      .populate("employeeId")
      .sort({ createdAt: -1 });
      if(!salaries || salaries.length <1){
        const employee = await Employee.findOne({userId:id});
        salaries = await Salary.find({employeeId :employee._id}).populate("employeeId")
      .sort({ createdAt: -1 });

      }

    return res.status(200).json({
      success: true,
      salaries,
    });
  } catch (error) {
    console.error("Get All Salaries Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { addSalary, getAllSalaries };
