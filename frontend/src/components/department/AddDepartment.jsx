import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/department/add",
        department,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white">Add Department</h3>
        <p className="text-gray-400 text-sm">
          Create a new department for your organization
        </p>
      </div>

      <div className="max-w-2xl bg-gray-800 rounded-xl shadow-md p-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Department Name
            </label>
            <input
              name="dep_name"
              value={department.dep_name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Description
            </label>
            <textarea
              name="description"
              value={department.description}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700 resize-none"
            />
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg">
              Add Department
            </button>
            <Link
              to="/admin-dashboard/departments"
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDepartment;
