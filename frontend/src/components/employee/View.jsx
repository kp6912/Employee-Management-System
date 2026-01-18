import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setEmployee(response.data.employee);
        }
      } catch (error) {
        alert("Failed to fetch employee details");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return <div className="p-6 text-white">Loading...</div>;
  }

  if (!employee) {
    return <div className="p-6 text-red-500">Employee not found</div>;
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Employee Details</h2>
        <Link
          to="/admin-dashboard/employees"
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600 transition"
        >
          Back
        </Link>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center">
          {employee.userId?.profileImage ? (
            <img
              src={`http://localhost:5000/uploads/${employee.userId.profileImage}`}
              alt="Employee"
              className="w-36 h-36 rounded-full object-cover border-4 border-gray-700 mb-4"
            />
          ) : (
            <div className="w-36 h-36 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 mb-4">
              No Image
            </div>
          )}

          <h3 className="text-lg font-semibold">
            {employee.userId?.name}
          </h3>
          <p className="text-gray-400 text-sm">
            {employee.designation}
          </p>
        </div>

        {/* Personal Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            Personal Information
          </h4>

          <p><span className="text-gray-400">Email:</span> {employee.userId?.email}</p>
          <p><span className="text-gray-400">Gender:</span> {employee.gender}</p>
          <p><span className="text-gray-400">Date of Birth:</span> {employee.dob}</p>
          <p><span className="text-gray-400">Marital Status:</span> {employee.maritalStatus}</p>
        </div>

        {/* Job Info */}
        <div>
          <h4 className="text-lg font-semibold mb-4 border-b border-gray-700 pb-2">
            Job Information
          </h4>

          <p><span className="text-gray-400">Employee ID:</span> {employee.employeeId}</p>
          <p><span className="text-gray-400">Department:</span> {employee.department?.dep_name}</p>
          <p><span className="text-gray-400">Designation:</span> {employee.designation}</p>
          <p><span className="text-gray-400">Salary:</span> ₹{employee.salary}</p>
        </div>
      </div>
    </div>
  );
};

export default View;
