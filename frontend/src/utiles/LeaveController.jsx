import React from "react";
import { useNavigate } from "react-router-dom";

export const columns = [
  {
    name: "Emp ID",
    selector: (row) => row.employeeId || "N/A",
    width: "120px",
  },
  {
    name: "Name",
    selector: (row) => row.name || "N/A",
    width: "120px",
  },
  {
    name: "Department",
    selector: (row) => row.department || "N/A",
    width: "150px",
  },
  {
    name: "Leave Type",
    selector: (row) => row.leaveType || "N/A",
    width: "120px",
  },
  {
    name: "Days",
    selector: (row) => row.days || 0,
    width: "80px",
  },
  {
    name: "Status",
    selector: (row) => row.status || "Pending",
    width: "120px",
  },
  {
    name: "Action",
    selector: (row) => row.action,
      // this is supported in RDT
    width: "70px",
  },
];


/* ================================
   Action Buttons for Table
================================= */
export const LeaveButtons = ({ _id }) => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/admin-dashboard/leaves/${id}`);
  };

  return (
    <button
      className="px-4 py-1 bg-teal-500 rounded text-white hover:bg-teal-600"
      onClick={() => handleView(_id)}
    >
      View
    </button>
  );
};

/* ================================
   DataTable Columns
================================= */
