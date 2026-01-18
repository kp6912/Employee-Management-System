import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { columns , LeaveButtons } from "../../utiles/LeaveController.jsx";
import axios from "axios";

const Table = () => {
  const [leaves ,setLeaves] = useState(null);

  const fetchLeaves = async () =>{
    
    try {
        const response = await axios.get(
          "http://localhost:5000/api/leave",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
      let sno = 1;

      const data = response.data.leaves.map((leave, index) => ({
  sno: index + 1,
  _id: leave._id,
  employeeId: leave.employeeId?.employeeId || "N/A",
  name: leave.employeeId?.userId?.name || "N/A",
  department: leave.employeeId?.department?.dep_name || "N/A",
  leaveType: leave.leaveType,
  days:
    new Date(leave.endDate).getDate() -
    new Date(leave.startDate).getDate() + 1,
  status: leave.status,
  action: <LeaveButtons _id={leave._id} />,
}));


          setLeaves(data);
         
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to load employees");
      }
  }

  useEffect(()=>{
    fetchLeaves()


  },[]);
  return (
    <>{leaves ? (
    <div className="bg-gray-900 p-6 rounded-xl shadow-md">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <h3 className="text-2xl font-bold text-white">
          Manage Leaves
        </h3>

        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-blue-600 transition">
            Pending
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-green-600 transition">
            Approves
          </button>
          <button className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-red-600 transition">
            Reject
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by leave type..."
          className="w-full md:w-1/3 px-4 py-2 rounded-lg
                     bg-gray-800 text-white placeholder-gray-400
                     border border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <DataTable  columns={columns} data={leaves} pagination />
    </div>
    ):<div> Loading ...</div>}</>
  );
};

export default Table;
