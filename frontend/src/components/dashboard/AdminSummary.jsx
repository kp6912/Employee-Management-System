import { useEffect, useState } from "react";
import axios from "axios";
import SummaryCard from "./SummaryCard";
import { FaUser, FaBuilding, FaCalendarAlt, FaRegCalendarCheck } from "react-icons/fa";


const AdminSummary = () => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/dashboard/summary",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (res.data.success) {
          setSummary(res.data.summary);
        }
      } catch (error) {
        console.error("FETCH SUMMARY ERROR:", error);
      }
    };

    fetchSummary();
  }, []);
  if(!summary){
    return <div> Loading...</div>
  }

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Dashboard Header */}
      <h3 className="text-2xl font-bold text-white mb-6">
        Dashboard Overview
      </h3>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <SummaryCard icon={<FaUser />} text="Total Employees" number={summary.totalEmployees} />
        <SummaryCard icon={<FaBuilding />} text="Departments" number={summary.totalDepartments} bgColor="bg-teal-600" />
        <SummaryCard icon={<FaCalendarAlt />} text="Monthly Salary" number={summary.totalSalary} bgColor="bg-teal-500" />
      </div>

      {/* Leave Details Header */}
      <h3 className="text-2xl font-bold text-white mb-6">
        Leave Details
      </h3>

      {/* Leave Detail Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <SummaryCard text="Leave Applied" number={summary.leaveSummary.appliedfor} icon={<FaRegCalendarCheck />} bgColor="bg-teal-600" />
        <SummaryCard text="Leave Pending" number={summary.leaveSummary.pending} icon={<FaRegCalendarCheck />} bgColor="bg-teal-500" />
        <SummaryCard text="Leave Approved" number={summary.leaveSummary.approved} icon={<FaRegCalendarCheck />} bgColor="bg-teal-700" />
        <SummaryCard text="Leave Rejected" number={summary.leaveSummary.rejected} icon={<FaRegCalendarCheck />} bgColor="bg-red-600" />
      </div>
    </div>
  );
};

export default AdminSummary;
