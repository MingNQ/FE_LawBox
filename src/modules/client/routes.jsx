import { Route } from "react-router-dom";
import { ROUTES } from "@shared/constants/routes";
import { HomePage } from "./pages/home/HomePage";
import SignInPage from "./pages/auth/SignInPage";
import SignUpPage from "./pages/auth/SignUpPage";
import ConversationPage from "./pages/chat/ConversationPage";
import LegalSearchPage from "./pages/legal-search/LegalSearchPage";
import { AboutUsPage } from "./pages/info/AboutUsPage";
import { TermsOfUsePage } from "./pages/info/TermsOfUsePage";
import { PrivacyPolicyPage } from "./pages/info/PrivacyPolicyPage";
import { PricingPage } from "./pages/pricing/PricingPage";
import { PaymentResultPage } from "./pages/payment/PaymentResultPage";
import DocumentDetailPage from "./pages/legal-search/DocumentDetailPage";
import FavoriteDocumentsPage from "./pages/legal-search/FavoriteDocumentsPage";

export const clientRoutes = (
  <>
    <Route path={ROUTES.HOME} element={<HomePage />} />
    <Route path={ROUTES.AUTH.SIGN_IN} element={<SignInPage />} />
    <Route path={ROUTES.AUTH.SIGN_UP} element={<SignUpPage />} />
    <Route path={ROUTES.CHAT} element={<ConversationPage />} />
    <Route path={ROUTES.CHAT_DETAIL} element={<ConversationPage />} />
    <Route path={ROUTES.LEGAL_SEARCH} element={<LegalSearchPage />} />
    <Route path={ROUTES.DOCUMENT_DETAIL} element={<DocumentDetailPage />} />
    <Route path={ROUTES.FAVORITES} element={<FavoriteDocumentsPage />} />
    <Route path={ROUTES.PRICING} element={<PricingPage />} />
    <Route path={ROUTES.PAYMENT_RESULT} element={<PaymentResultPage />} />
    <Route path={ROUTES.ABOUT_US} element={<AboutUsPage />} />
    <Route path={ROUTES.TERMS_OF_USE} element={<TermsOfUsePage />} />
    <Route path={ROUTES.PRIVACY_POLICY} element={<PrivacyPolicyPage />} />
  </>
);
