import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Blocks anyone who isn't logged in AND an admin from reaching /admin.
// Unauthenticated users go to /login; logged-in citizens get bounced to their own dashboard.
const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "admin") {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

export default AdminRoute;
