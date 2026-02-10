import React, { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/authcontext";

/* ===============================
   SummaryCard (UNCHANGED NAME)
================================= */
const SummaryCard = ({ icon, text, number, bgColor }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 shadow-lg text-white ${bgColor}`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 flex items-center gap-5">
        <div className="text-4xl opacity-90">
          {icon}
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-white/80">
            {text}
          </p>
          <p className="text-3xl font-bold mt-1">
            {number}
          </p>
        </div>
      </div>

      {/* Decorative blur */}
      <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
    </div>
  );
};

/* ===============================
   Summary (UNCHANGED NAME)
================================= */
const Summary = () => {
  const { id: paramId } = useParams();
  const { user } = useAuth();
  const [summary, setSummary] = useState({
    salary: 0,
    leaves: 0,
    profileComplete: "Yes",
  });
  
  // Use paramId for admin routes, user._id for employee routes
  const userId = paramId || user?._id;

  useEffect(() => {
    const fetchSummary = async () => {
      if (!userId) return;
      
      try {
        const token = localStorage.getItem("token");

        // If paramId exists, we're viewing someone else's salary (admin view)
        // Otherwise, get our own summary
        const endpoint = paramId 
          ? `http://localhost:5000/api/employee/salary-leaves/${paramId}`
          : "http://localhost:5000/api/employee/summary";

        const res = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          // Both admin and employee views now use the same summary structure
          setSummary(res.data.summary);
        }
      } catch (error) {
        console.error("Employee summary error", error);
      }
    };

    fetchSummary();
  }, [userId, paramId]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-200 mb-6">
        {paramId ? `Salary & Leave Details - ${summary.name || 'Employee'}` : 'Dashboard Overview'}
      </h2>
      
      {paramId && summary.name && (
        <div className="mb-6 bg-gray-800 rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-300">
            <div>
              <span className="text-gray-400">Employee:</span>
              <span className="ml-2 font-medium text-white">{summary.name}</span>
            </div>
            <div>
              <span className="text-gray-400">Department:</span>
              <span className="ml-2 font-medium text-white">{summary.department}</span>
            </div>
            <div>
              <span className="text-gray-400">Employee ID:</span>
              <span className="ml-2 font-medium text-white">{summary.employeeId}</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Current Salary"
          number={`₹ ${summary.salary?.toLocaleString() || '0'}`}
          bgColor="bg-gradient-to-br from-emerald-600 to-emerald-800"
        />

        <SummaryCard
          icon={<FaCalendarAlt />}
          text="Total Leaves Applied"
          number={summary.leaves || 0}
          bgColor="bg-gradient-to-br from-indigo-600 to-indigo-800"
        />

        <SummaryCard
          icon={<FaUser />}
          text="Profile Status"
          number={summary.profileComplete || "Incomplete"}
          bgColor="bg-gradient-to-br from-teal-600 to-teal-800"
        />
      </div>
    </div>
  );
};

export default Summary;
