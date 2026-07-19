import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Blocks unauthenticated visitors from viewing citizen/admin pages.
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
