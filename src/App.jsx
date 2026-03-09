import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/admin/AuthPage";
import { HomePage } from "./pages/client/HomePage";
import Dashboard from "./pages/admin/Dashboard";
import ConversationPage from "./pages/client/chat/ConversationPage";
import SignInPage from "./pages/client/auth/SignInPage";
import SignUpPage from "./pages/client/auth/SignUpPage";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.AUTH.SIGN_IN} element={<SignInPage />} />
      <Route path={ROUTES.AUTH.SIGN_UP} element={<SignUpPage />} />
      <Route path={ROUTES.CHAT} element={<ConversationPage />} />
      <Route path={ROUTES.CHAT_DETAIL} element={<ConversationPage />} />
      <Route path={ROUTES.ADMIN.AUTH} element={<AuthPage />} />
      <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
    </Routes>
  );
}

export default App;
