import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to={ROUTES.AUTH.SIGN_IN} replace />;
  }

  return children;
}
