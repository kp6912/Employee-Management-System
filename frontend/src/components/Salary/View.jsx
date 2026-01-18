import React, { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-200 mb-6">
        Dashboard Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryCard
          icon={<FaMoneyBillWave />}
          text="Latest Salary"
          number={`₹ ${summary.salary}`}
          bgColor="bg-gradient-to-br from-emerald-600 to-emerald-800"
        />

        <SummaryCard
          icon={<FaCalendarAlt />}
          text="Leaves Taken"
          number={summary.leaves}
          bgColor="bg-gradient-to-br from-indigo-600 to-indigo-800"
        />

        <SummaryCard
          icon={<FaUser />}
          text="Profile Status"
          number={summary.profileComplete}
          bgColor="bg-gradient-to-br from-teal-600 to-teal-800"
        />
      </div>
    </div>
  );
};

export default Summary;
