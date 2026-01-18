import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaBuilding,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCog,
} from "react-icons/fa";

const AdminSidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
     ${
       isActive
         ? "bg-teal-600 text-white"
         : "text-gray-300 hover:bg-gray-700 hover:text-white"
     }`;

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white fixed border border-teal-600">




      {/* Logo / Title */}
      <div className="px-6 py-5 border-b border-gray-700">
        <h1 className="text-xl font-bold tracking-wide">Employee MS</h1>
        <p className="text-xs text-gray-400">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3 space-y-1">
        <NavLink to="/admin-dashboard" className={linkClass}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin-dashboard/employees" className={linkClass}>
          <FaUsers />
          <span>Employees</span>
        </NavLink>

        <NavLink to="/admin-dashboard/departments" className={linkClass}>
          <FaBuilding />
          <span>Departments</span>
        </NavLink>

        <NavLink to="/admin-dashboard/leaves" className={linkClass}>
          <FaCalendarAlt />
          <span>Leaves</span>
        </NavLink>

        <NavLink to="/admin-dashboard/salary/add" className={linkClass}>
          <FaMoneyBillWave />
          <span>Salary</span>
        </NavLink>

        <NavLink to="/admin-dashboard/setting" className={linkClass}>
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
