import mongoose from "mongoose";

const salarySchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true
    },

    basicSalary: {
      type: Number,
      required: true
    },

    allowances: {
      type: Number,
      default: 0
    },

    deductions: {
      type: Number,
      default: 0
    },

    netSalary: {
      type: Number,
      required: true
    },

    month: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    paymentDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Salary", salarySchema);
