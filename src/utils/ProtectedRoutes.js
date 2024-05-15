import React from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
function ProtectedRoutes({ children }) {
  let { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoutes;
