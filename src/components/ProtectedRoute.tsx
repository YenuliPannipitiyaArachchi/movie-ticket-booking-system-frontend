import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { Role } from "../types";
import type { ReactElement } from "react";

export default function ProtectedRoute({ children, role }: { children: ReactElement; role?: Role }) {
  const { isAuthenticated, role: userRole } = useAuth();
  const location = useLocation();
  if (!isAuthenticated) return <Navigate to="/signin" state={{ from: location.pathname }} replace />;
  if (role && userRole !== role) return <Navigate to="/" replace />;
  return children;
}
