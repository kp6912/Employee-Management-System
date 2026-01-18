import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUser,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaCog,
} from "react-icons/fa";
import { useAuth } from "../../context/authcontext";

const Sidebar = () => {
    
    
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition
     ${
       isActive
         ? "bg-teal-600 text-white"
         : "text-gray-300 hover:bg-gray-700 hover:text-white"
     }`;
     const {user} = useAuth()

  return (

    <aside className="w-64 min-h-screen bg-gray-900 text-white fixed border-r border-gray-700">
      {/* Title */}
      <div className="px-6 py-5 border-b border-gray-700">
        <h1 className="text-xl font-bold tracking-wide">Employee MS</h1>
        <p className="text-xs text-gray-400">Employee Panel</p>
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3 space-y-1">
        <NavLink to="/employee-dashboard" className={linkClass}>
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/profile/${user._id}`} className={linkClass}>
          <FaUser />
          <span>My Profile</span>
        </NavLink>

        <NavLink to={`/employee-dashboard/salary/${user._id}`} className={linkClass}>
          <FaMoneyBillWave />
          <span>My Salary</span>
        </NavLink>

        <NavLink to="/employee-dashboard/leaves" className={linkClass}>
          <FaCalendarAlt />
          <span>My Leaves</span>
        </NavLink>

        <NavLink to="/employee-dashboard/setting" className={linkClass}>
          <FaCog />
          <span>Settings</span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
