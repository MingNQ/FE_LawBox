import { useAuth } from "@shared/hooks/useAuth";
import { parseJwt } from "@shared/utils/jwt";
import { Navigate } from "react-router-dom";
import { ROLE_CLAIM } from "@shared/constants/appConst";

export default function RoleGuard({ roles, children }) {
  const { token } = useAuth();
  const payload = parseJwt(token);

  if (!token) {
    return <Navigate />;
  }

  if (!roles.includes(payload[ROLE_CLAIM])) {
    return <Navigate to="/" />;
  }

  return children;
}
