import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authcontext";
import axios from "axios";

const Add = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      "http://localhost:5000/api/leave/add",
      {
        userId: user._id,         // Send the logged-in employee ID
        leaveType: formData.leaveType,
        startDate: formData.startDate,
        endDate: formData.endDate,
        reason: formData.reason,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      alert("Leave applied successfully");
      navigate("/employee-dashboard/leaves");
    }
  } catch (error) {
    console.error("ADD LEAVE ERROR:", error);
    alert("Failed to apply leave");
  }
};


  return (
    <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Apply for Leave</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Leave Type
          </label>
          <select
            name="leaveType"
            value={formData.leaveType}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700"
          >
            <option value="">Select leave type</option>
            <option value="Sick">Sick Leave</option>
            <option value="Casual">Casual Leave</option>
            <option value="Paid">Paid Leave</option>
            <option value="Unpaid">Unpaid Leave</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Start Date
          </label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            End Date
          </label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Reason
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            rows="4"
            required
            className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-5 py-2 rounded-lg bg-gray-600 text-white"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white"
          >
            Submit Leave
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
