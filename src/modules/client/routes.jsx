import { Route } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";
import { HomePage } from "./pages/HomePage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ConversationPage from "./pages/chat/ConversationPage";
import LegalSearchPage from "./pages/LegalSearchPage";
import { AboutUsPage } from "./pages/AboutUsPage";
import { TermsOfUsePage } from "./pages/TermsOfUsePage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";

export const clientRoutes = (
  <>
    <Route path={ROUTES.HOME} element={<HomePage />} />
    <Route path={ROUTES.AUTH.SIGN_IN} element={<SignInPage />} />
    <Route path={ROUTES.AUTH.SIGN_UP} element={<SignUpPage />} />
    <Route path={ROUTES.CHAT} element={<ConversationPage />} />
    <Route path={ROUTES.CHAT_DETAIL} element={<ConversationPage />} />
    <Route path={ROUTES.LEGAL_SEARCH} element={<LegalSearchPage />} />
    <Route path={ROUTES.ABOUT_US} element={<AboutUsPage />} />
    <Route path={ROUTES.TERMS_OF_USE} element={<TermsOfUsePage />} />
    <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
  </>
);
