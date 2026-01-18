import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import EmployeeButtons from "../../utiles/EmployeeHelper.jsx";
import { columns } from "../../utiles/EmployeeHelper.jsx";

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5000/api/employee",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          let sno = 1;
          const data = response.data.employees.map((emp) => ({
            _id: emp._id,
            sno: sno++,
            name: emp.userId?.name || "N/A",
            email: emp.userId?.email || "N/A",
            employeeId: emp.employeeId,
            department: emp.department?.dep_name || "N/A",
            profileImage: emp.userId?.profilImage ? (
              <img
                src={`http://localhost:5000/${emp.userId.profilImage}`}
                alt="profile"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              "N/A"
            ),
            dob: emp.dob ? new Date(emp.dob).toDateString() : "N/A",
            salary: emp.salary,
            action: <EmployeeButtons _id={emp._id} />,
          }));

          setEmployees(data);
          setFilteredEmployees(data);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        alert("Failed to load employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // ✅ WORKING FILTER FUNCTION
  const handleFilter = (e) => {
    const value = e.target.value.toLowerCase();

    const filteredData = employees.filter(
      (emp) =>
        emp.name.toLowerCase().includes(value) ||
        emp.email.toLowerCase().includes(value) ||
        emp.department.toLowerCase().includes(value) ||
        emp.employeeId.toLowerCase().includes(value)
    );

    setFilteredEmployees(filteredData);
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white">Manage Employees</h3>
        <p className="text-gray-400 text-sm">
          View, search, and manage all employees
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search employee..."
          onChange={handleFilter}
          className="w-full md:w-1/3 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <Link
          to="/admin-dashboard/add-employee"
          className="inline-flex items-center justify-center px-5 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
        >
          + Add New Employee
        </Link>
      </div>

      {/* Table */}
      <div className="bg-gray-800 rounded-xl shadow-md p-4">
        <DataTable
          columns={columns}
          data={filteredEmployees}
          pagination
          responsive
          highlightOnHover
          progressPending={loading}
          customStyles={{
            table: { style: { backgroundColor: "transparent" } },
            headRow: {
              style: {
                backgroundColor: "#1f2937",
                borderBottom: "1px solid #374151",
              },
            },
            headCells: {
              style: {
                color: "#e5e7eb",
                fontSize: "13px",
                fontWeight: "600",
                textTransform: "uppercase",
              },
            },
            rows: {
              style: {
                backgroundColor: "#1f2937",
                color: "#d1d5db",
                borderBottom: "1px solid #374151",
                minHeight: "52px",
              },
              highlightOnHoverStyle: {
                backgroundColor: "#374151",
                color: "#ffffff",
              },
            },
            pagination: {
              style: {
                backgroundColor: "#1f2937",
                color: "#9ca3af",
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default List;
