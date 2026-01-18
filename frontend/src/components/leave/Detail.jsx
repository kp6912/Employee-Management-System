import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /* =========================
     Fetch Leave Detail
  ========================== */
  useEffect(() => {
    const fetchLeave = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/leave/detail/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setLeave(response.data.leave);
        }
      } catch (error) {
        alert("Failed to fetch leave details");
      } finally {
        setLoading(false);
      }
    };

    fetchLeave();
  }, [id]);

  /* =========================
     Approve / Reject Handler
  ========================== */
  const updateStatus = async (status) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/leave/status/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/leaves");
      }
    } catch (error) {
      alert("Failed to update leave status");
    }
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (!leave) return <div className="p-6 text-red-500">Leave not found</div>;

  const employee = leave.employeeId;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employee Leave Details</h2>
        <Link
          to="/admin-dashboard/leaves"
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Back
        </Link>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile */}
        <div className="flex flex-col items-center">
          <img
            src={
              employee?.userId?.profileImage
                ? `http://localhost:5000/uploads/${employee.userId.profileImage}`
                : "https://via.placeholder.com/150?text=No+Image"
            }
            alt="Employee"
            className="w-36 h-36 rounded-full object-cover border-4 border-gray-700 mb-4"
          />

          <h3 className="text-lg font-semibold">
            {employee?.userId?.name}
          </h3>
          <p className="text-gray-400 text-sm">
            {employee?.designation}
          </p>
        </div>

        {/* Personal Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            Personal Information
          </h4>

          <p><span className="text-gray-400">Email:</span> {employee?.userId?.email}</p>
          <p><span className="text-gray-400">Gender:</span> {employee?.gender}</p>
          <p>
            <span className="text-gray-400">Date of Birth:</span>{" "}
            {employee?.dob ? new Date(employee.dob).toLocaleDateString() : "N/A"}
          </p>
          <p><span className="text-gray-400">Marital Status:</span> {employee?.maritalStatus}</p>
        </div>

        {/* Job & Leave Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            Job & Leave Information
          </h4>

          <p><span className="text-gray-400">Employee ID:</span> {employee?.employeeId}</p>
          <p><span className="text-gray-400">Department:</span> {employee?.department?.dep_name}</p>
          <p><span className="text-gray-400">Salary:</span> ₹{employee?.salary}</p>

          <p className="mt-2"><span className="text-gray-400">Leave Type:</span> {leave.leaveType}</p>
          <p><span className="text-gray-400">Start Date:</span> {new Date(leave.startDate).toLocaleDateString()}</p>
          <p><span className="text-gray-400">End Date:</span> {new Date(leave.endDate).toLocaleDateString()}</p>
          <p><span className="text-gray-400">Status:</span> {leave.status}</p>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-4">
            <button
              disabled={leave.status !== "Pending"}
              onClick={() => updateStatus("Approved")}
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 disabled:opacity-50"
            >
              Approve
            </button>

            <button
              disabled={leave.status !== "Pending"}
              onClick={() => updateStatus("Rejected")}
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
