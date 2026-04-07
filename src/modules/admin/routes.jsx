import { Route } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";
import { AuthPage } from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import DocumentPage from "./pages/DocumentPage";
import FolderPage from "./pages/FolderPage";
import UserPage from "./pages/UserPage";
import AgentManagePage from "./pages/AgentManagePage";
import RoleGuard from "@shared/components/auth/RoleGuard";
import { ROLES } from "@shared/constants/appConst";

export const adminRoutes = (
  <>
    <Route path={ROUTES.ADMIN.AUTH} element={<AuthPage />} />
    <Route
      path={ROUTES.ADMIN.DASHBOARD}
      element={
        <RoleGuard roles={[ROLES.Admin]}>
          <Dashboard />
        </RoleGuard>
      }
    />
    <Route
      path={ROUTES.ADMIN.FOLDERS}
      element={
        <RoleGuard roles={[ROLES.Admin]}>
          <FolderPage />
        </RoleGuard>
      }
    />
    <Route
      path={ROUTES.ADMIN.USERS}
      element={
        <RoleGuard roles={[ROLES.Admin]}>
          <UserPage />
        </RoleGuard>
      }
    />
    <Route
      path={ROUTES.ADMIN.ALL_DOCUMENTS}
      element={
        <RoleGuard roles={[ROLES.Admin]}>
          <DocumentPage />
        </RoleGuard>
      }
    />
    <Route
      path={ROUTES.ADMIN.DOCUMENTS}
      element={
        <RoleGuard roles={[ROLES.Admin]}>
          <DocumentPage />
        </RoleGuard>
      }
    />
    <Route
      path={ROUTES.ADMIN.AI_AGENTS}
      element={
        <RoleGuard roles={[ROLES.Admin]}>
          <AgentManagePage />
        </RoleGuard>
      }
    />
  </>
);
