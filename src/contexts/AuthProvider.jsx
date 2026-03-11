import { useState } from "react";
import { authStorage } from "../stores/authStore";
import { setCurrentUser } from "../api/authApi";
import { setAuthToken, clearAuth } from "../api/http";
import { AuthContext } from "./AuthContext";
import { ROUTES } from "../constants/routes";

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
