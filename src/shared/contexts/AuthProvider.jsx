import { useState } from "react";
import { authStorage } from "@shared/stores/authStore";
import { setCurrentUser } from "@shared/api/authApi";
import { setAuthToken, clearAuth } from "@shared/api/http";
import { AuthContext } from "./AuthContext";
import { ROUTES } from "@shared/constants/routes";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setTokenState] = useState(() => {
    return authStorage.getToken();
  });

  const login = async (accessToken, refreshToken, rememberMe = true) => {
    authStorage.setTokens(accessToken, refreshToken, rememberMe);
    setAuthToken(accessToken);
    setTokenState(accessToken);
    setCurrentUser().then((res) => {
      setUser(res);
    });
  };

  const logout = () => {
    window.location.href = ROUTES.AUTH.SIGN_IN;
    clearAuth();
    setUser(null);
    setTokenState(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
