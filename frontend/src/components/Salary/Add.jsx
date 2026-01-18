import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employee: "",
    basicSalary: "",
    allowances: "",
    deductions: "",
    month: "",
    year: "",
  });

  /* ===============================
     Fetch Employees
  =============================== */
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employee", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (res.data.success) {
          setEmployees(res.data.employees);
        }
      } catch (error) {
        alert("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  /* ===============================
     Handlers
  =============================== */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    employeeId: formData.employee,
    basicSalary: Number(formData.basicSalary),
    allowances: Number(formData.allowances || 0),
    deductions: Number(formData.deductions || 0),
    month: formData.month,
    year: Number(formData.year),
  };

  try {
    await axios.post(
      "http://localhost:5000/api/salary/add",
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    alert("Salary added successfully");
    navigate("/admin-dashboard/employees");
  } catch (error) {
    console.error(error.response?.data);
    alert(error.response?.data?.message || "Failed to add salary");
  }
};


  if (loading) {
    return <div className="p-6 text-gray-300">Loading...</div>;
  }

  /* ===============================
     UI
  =============================== */
  return (
    <div className="min-h-screen bg-gray-900 p-6 text-gray-200">
      <div className="max-w-4xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Add Salary
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* Employee */}
          <div className="col-span-2">
            <label className="block mb-1 text-sm">Employee</label>
            <select
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
            >
              <option value="">Select Employee</option>
              {employees.map((emp) => (
                <option key={emp._id} value={emp._id}>
                  {emp.employeeId} - {emp.userId?.name}
                </option>
              ))}
            </select>
          </div>

          {/* Salary Fields */}
          <div>
            <label className="block mb-1 text-sm">Basic Salary</label>
            <input
              type="number"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Allowances</label>
            <input
              type="number"
              name="allowances"
              value={formData.allowances}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Deductions</label>
            <input
              type="number"
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Month</label>
            <select
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
            >
              <option value="">Select Month</option>
              {[
                "January","February","March","April","May","June",
                "July","August","September","October","November","December"
              ].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="col-span-2 bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-medium text-white"
          >
            Save Salary
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
