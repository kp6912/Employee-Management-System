import React from "react";
import { Navigate } from "react-router-dom"; // ⚠ Must import Navigate
import { useAuth } from "../context/authcontext";

const RoleBaseRoutes = ({ children, requiredRole }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading....</div>;
  }

  // User exists but role is not authorized
  if (!requiredRole.includes(user?.role)) {
    return <Navigate to="/unauthorize" />; // ⚠ Must return!
  }

  // If user exists and is authorized, render children; otherwise redirect to login
  return user ? children : <Navigate to="/login" />;
};

export default RoleBaseRoutes;
