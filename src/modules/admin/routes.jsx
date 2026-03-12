import { Route } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";
import { AuthPage } from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";

export const adminRoutes = (
  <>
    <Route path={ROUTES.ADMIN.AUTH} element={<AuthPage />} />
    <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
  </>
);
