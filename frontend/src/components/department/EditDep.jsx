import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";

const EditDep = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState({
    dep_name: "",
    description: "",
  });

  const [depLoading, setDepLoading] = useState(false);

  useEffect(() => {
    const fetchDepartment = async () => {
      setDepLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/department/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          setDepartment(response.data.department);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setDepLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/department/${id}`,
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

  if (depLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white">Edit Department</h3>
        <p className="text-gray-400 text-sm">
          Update department details
        </p>
      </div>

      <div className="max-w-2xl bg-gray-800 rounded-xl shadow-md p-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-300">
              Department Name
            </label>
            <input
              type="text"
              name="dep_name"
              value={department.dep_name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-900 text-white border border-gray-700"
              required
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
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Update Department
            </button>

            <Link
              to="/admin-dashboard/departments"
              className="text-gray-400 hover:text-white self-center"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDep;
