import { Route } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";
import { HomePage } from "./pages/HomePage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ConversationPage from "./pages/chat/ConversationPage";
import LegalSearchPage from "./pages/LegalSearchPage";

export const clientRoutes = (
  <>
    <Route path={ROUTES.HOME} element={<HomePage />} />
    <Route path={ROUTES.AUTH.SIGN_IN} element={<SignInPage />} />
    <Route path={ROUTES.AUTH.SIGN_UP} element={<SignUpPage />} />
    <Route path={ROUTES.CHAT} element={<ConversationPage />} />
    <Route path={ROUTES.CHAT_DETAIL} element={<ConversationPage />} />
    <Route path={ROUTES.LEGAL_SEARCH} element={<LegalSearchPage />} />
  </>
);
