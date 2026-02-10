import React, { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import SummaryCard from "../dashboard/SummaryCard";
import axios from "axios";

const Summary = () => {
  const [summary, setSummary] = useState({
    salary: 0,
    leaves: 0,
    profileComplete: "Yes",
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          "http://localhost:5000/api/employee/summary",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          setSummary(res.data.summary);
        }
      } catch (error) {
        console.error("Employee summary error", error);
      }
    };

    fetchSummary();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Current Salary"
          number={`₹ ${summary.salary?.toLocaleString() || '0'}`}
          bgColor="bg-emerald-600"
        />

        <SummaryCard
          icon={<FaCalendarAlt />}
          text="Total Leaves Applied"
          number={summary.leaves || 0}
          bgColor="bg-indigo-600"
        />

        <SummaryCard
          icon={<FaUser />}
          text="Profile Status"
          number={summary.profileComplete || "Incomplete"}
          bgColor="bg-teal-700"
        />
      </div>
      
      {summary.department && (
        <div className="mt-6 bg-gray-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Employee Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
            <div>
              <span className="text-gray-400">Department:</span>
              <span className="ml-2 font-medium">{summary.department}</span>
            </div>
            {summary.employeeId && (
              <div>
                <span className="text-gray-400">Employee ID:</span>
                <span className="ml-2 font-medium">{summary.employeeId}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Summary;
