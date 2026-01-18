import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: "",
    role: "",
    image: null,
  });

  /* ===============================
     Fetch employee + departments
  =============================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, depRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/employee/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          axios.get("http://localhost:5000/api/department", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
        ]);

        if (empRes.data.success) {
          const emp = empRes.data.employee;

          setFormData({
            name: emp.userId?.name || "",
            email: emp.userId?.email || "",
            employeeId: emp.employeeId || "",
            dob: emp.dob?.substring(0, 10) || "",
            gender: emp.gender || "",
            maritalStatus: emp.maritalStatus || "",
            designation: emp.designation || "",
            department: emp.department?._id || "",
            salary: emp.salary || "",
            role: emp.userId?.role || "",
            image: null,
          });

          if (emp.userId?.profileImage) {
            setImagePreview(
              `http://localhost:5000/uploads/${emp.userId.profileImage}`
            );
          }
        }

        if (depRes.data.success) {
          setDepartments(depRes.data.departments);
        }
      } catch (error) {
        alert("Failed to load employee data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* ===============================
     Handlers
  =============================== */
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) data.append(key, value);
    });

    try {
      await axios.put(
        `http://localhost:5000/api/employee/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Employee updated successfully");
      navigate("/admin-dashboard/employees");
    } catch {
      alert("Update failed");
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
      <div className="max-w-5xl mx-auto bg-gray-800 rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-white">
          Edit Employee
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
          encType="multipart/form-data"
        >
          {[
            ["name", "Name"],
            ["email", "Email"],
            ["employeeId", "Employee ID"],
            ["designation", "Designation"],
            ["salary", "Salary"],
          ].map(([name, label]) => (
            <div key={name}>
              <label className="block mb-1 text-sm">{label}</label>
              <input
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          ))}

          <div>
            <label className="block mb-1 text-sm">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
            />
          </div>

          {[
            ["gender", ["Male", "Female"]],
            ["maritalStatus", ["Single", "Married"]],
            ["role", ["admin", "employee"]],
          ].map(([name, options]) => (
            <div key={name}>
              <label className="block mb-1 text-sm capitalize">{name}</label>
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
              >
                <option value="">Select</option>
                {options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <div>
            <label className="block mb-1 text-sm">Department</label>
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2"
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.dep_name}
                </option>
              ))}
            </select>
          </div>

          {/* Image */}
          <div className="col-span-2">
            <label className="block mb-2 text-sm">Profile Image</label>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 rounded-full mb-3 object-cover border border-gray-600"
              />
            )}
            <input
              type="file"
              onChange={handleImageChange}
              className="text-sm text-gray-400"
            />
          </div>

          <button
            type="submit"
            className="col-span-2 bg-blue-600 hover:bg-blue-700 transition py-2 rounded-lg font-medium text-white"
          >
            Update Employee
          </button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
