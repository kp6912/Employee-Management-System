import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { fetchDepartments } from "../../utiles/EmployeeHelper.jsx";

const Add = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [departments ,setDepartments] = useState([]);

  useEffect(()=>{
    const getDepartments = async () =>{
    const departments = await fetchDepartments();
    setDepartments(departments);
    };
    getDepartments();

  },[]);

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
    password: "",
    role: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prevData) =>({ ...prevData, image: files[0] }));
    } else {
      setFormData( (prevData )=>({ ...prevData, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Use FormData for file upload support
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/employee/add",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        navigate("/admin-dashboard/employees");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to add employee");
    } finally {
      setLoading(false);
    }
  };

  // Shared Tailwind classes for the "Dark Theme" look
  const labelStyle = "block text-sm font-medium text-gray-300 mb-1";
  const inputStyle = "w-full bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-500";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-4xl bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-6">Add Employee</h2>
        
        {error && <p className="text-red-500 bg-red-100/10 p-2 rounded mb-4 text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className={labelStyle}>Name</label>
              <input type="text" name="name" placeholder="Insert Name" className={inputStyle} onChange={handleChange} required />
            </div>

            {/* Email */}
            <div>
              <label className={labelStyle}>Email</label>
              <input type="email" name="email" placeholder="Insert Email" className={inputStyle} onChange={handleChange} required />
            </div>

            {/* Employee ID */}
            <div>
              <label className={labelStyle}>Employee ID</label>
              <input type="text" name="employeeId" placeholder="Employee ID" className={inputStyle} onChange={handleChange} required />
            </div>

            {/* Date of Birth */}
            <div>
              <label className={labelStyle}>Date of Birth</label>
              <input type="date" name="dob" className={inputStyle} onChange={handleChange} required />
            </div>

            {/* Gender */}
            <div>
              <label className={labelStyle}>Gender</label>
              <select name="gender" className={inputStyle} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Marital Status */}
            <div>
              <label className={labelStyle}>Marital Status</label>
              <select name="maritalStatus" className={inputStyle} onChange={handleChange} required>
                <option value="">Select Status</option>
                <option value="single">Single</option>
                <option value="married">Married</option>
              </select>
            </div>

            {/* Designation */}
            <div>
              <label className={labelStyle}>Designation</label>
              <input type="text" name="designation" placeholder="Designation" className={inputStyle} onChange={handleChange} required />
            </div>

            {/* Department */}
            <div>
  <label className={labelStyle}>Department</label>
  <select
    name="department"
    className={inputStyle}
    onChange={handleChange}
    required
  >
    <option value="">Select Department</option>
    {departments?.map((dep) => (
      <option key={dep._id} value={dep._id}>
        {dep.dep_name}
      </option>
    ))}
  </select>
</div>


            {/* Salary */}
            <div>
              <label className={labelStyle}>Salary</label>
              <input type="number" name="salary" placeholder="Salary" className={inputStyle} onChange={handleChange} required />
            </div>

            {/* Password */}
            <div>
              <label className={labelStyle}>Password</label>
              <input type="password" name="password" placeholder="******" className={inputStyle} onChange={handleChange} required />
            </div>

            {/* Role */}
            <div>
              <label className={labelStyle}>Role</label>
              <select name="role" className={inputStyle} onChange={handleChange} required>
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            {/* Upload Image */}
            <div>
              <label className={labelStyle}>Upload Image</label>
              <input type="file" name="image" accept="image/*" className={inputStyle} onChange={handleChange} />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 rounded shadow-md transition duration-200 disabled:opacity-50"
          >
            {loading ? "Processing..." : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;