import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@shared/contexts/AuthProvider";
import { FavoriteProvider } from "@shared/contexts/FavoriteProvider";
import { initAuth } from "@shared/api/http";
import { ToastProvider } from "@shared/contexts/ToastProvider.jsx";
import { ThemeProvider } from "@shared/contexts/ThemeProvider.jsx";
import { LanguageProvider } from "@shared/contexts/LanguageProvider.jsx";

initAuth();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <ToastProvider>
              <FavoriteProvider>
                <App />
              </FavoriteProvider>
            </ToastProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
