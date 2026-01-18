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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <SummaryCard
        icon={<FaMoneyBillWave />}
        text="Latest Salary"
        number={`₹ ${summary.salary}`}
        bgColor="bg-emerald-600"
      />

      <SummaryCard
        icon={<FaCalendarAlt />}
        text="Leaves Taken"
        number={summary.leaves}
        bgColor="bg-indigo-600"
      />

      <SummaryCard
        icon={<FaUser />}
        text="Profile Status"
        number={summary.profileComplete}
        bgColor="bg-teal-700"
      />
    </div>
  );
};

export default Summary;
