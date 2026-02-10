import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/authcontext.jsx";



const Setting = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [setting, setSetting] = useState({
    userId: user._id || "",
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSetting((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);

  if (setting.newPassword !== setting.confirmPassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const response = await axios.put(
      "http://localhost:5000/api/setting/change-password",
      {
        oldPassword: setting.oldPassword,
        newPassword: setting.newPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.data.success) {
      setSuccess("Password updated successfully!");
      // Clear form
      setSetting({
        userId: user._id || "",
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      // Navigate based on user role
      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/employee-dashboard");
        }
      }, 1500);
    }
  } catch (error) {
    setError(error.response?.data?.error || "Password update failed");
  }
};



  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 shadow-xl rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-white">Change Password</h2>

      {error && <p className="text-red-400 mb-2">{error}</p>}
      {success && <p className="text-green-400 mb-2">{success}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          name="oldPassword"
          placeholder="Old Password"
          value={setting.oldPassword}
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="newPassword"
          placeholder="New Password"
          value={setting.newPassword}
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={setting.confirmPassword}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-gray-700 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default Setting;
