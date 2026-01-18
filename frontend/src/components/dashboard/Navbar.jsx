import React from "react";
import { useAuth } from "../../context/authcontext";
import { FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const { user, logout } = useAuth(); // make sure logout is defined in your context

  return (
    <header className="w-full h-16 bg-teal-600 border-b border-teal-700 flex items-center justify-between px-6 shadow-md fixed top-0 left-0 z-50">

      {/* Left: Welcome Text */}
      <div>
        <h2 className="text-sm text-teal-200">Welcome back,</h2>
        <p className="text-lg font-semibold text-white">{user?.name}</p>
      </div>

      {/* Right: Logout Button */}
      <button
        onClick={logout}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-teal-300 rounded-lg hover:bg-teal-700 transition"
      >
        <FaSignOutAlt />
        Logout
      </button>
    </header>
  );
};

export default Navbar;
