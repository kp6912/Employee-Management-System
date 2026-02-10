import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authcontext";
import { useParams } from "react-router-dom";


const List = () => {
  const { id: empId } = useParams(); // Route uses :id parameter
  const { user } = useAuth();
  const [leaves, setLeaves] = useState([]);
  const [search, setSearch] = useState("");
  
  const id = user && (user.role === "admin" ? empId : user._id);

  // Fetch leaves for the logged-in user
  const fetchLeaves = async () => {
    if(!id) return;
    
    try {
      const res = await axios.get(
        `http://localhost:5000/api/leave/user/${id}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (res.data.success) {
        setLeaves(res.data.leaves);
      }
    } catch (error) {
      console.error("FETCH LEAVES ERROR:", error);
      if (error.response) {
        console.error('Error response:', error.response.data);
      }
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, [id]);

  // Filter leaves by search
  const filteredLeaves = leaves.filter((leave) =>
    leave.leaveType.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">
          {user?.role === "admin" ? "Employee Leaves" : "My Leaves"}
        </h3>
        {user?.role !== "admin" && (
          <Link
            to="/employee-dashboard/add-leave"
            className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            + Add New Leave
          </Link>
        )}
        {user?.role === "admin" && (
          <Link
            to="/admin-dashboard/employees"
            className="px-5 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition"
          >
            Back to Employees
          </Link>
        )}
      </div>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by leave type..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-700 text-white">
          <thead className="bg-gray-900">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Leave Type</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Start Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium">End Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Reason</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredLeaves.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                  No leave requests found
                </td>
              </tr>
            ) : (
              filteredLeaves.map((leave) => (
                <tr key={leave._id}>
                  <td className="px-6 py-4">{leave.leaveType}</td>
                  <td className="px-6 py-4">{new Date(leave.startDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{new Date(leave.endDate).toLocaleDateString()}</td>
                  <td className="px-6 py-4">{leave.reason}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        leave.status === "Approved"
                          ? "bg-green-600 text-white"
                          : leave.status === "Rejected"
                          ? "bg-red-600 text-white"
                          : "bg-yellow-600 text-white"
                      }`}
                    >
                      {leave.status || "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default List;
