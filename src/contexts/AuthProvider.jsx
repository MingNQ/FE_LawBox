import { useState } from "react";
import { authStorage } from "../stores/authStore";
import { setCurrentUser } from "../api/authApi";
import { setAuthToken, clearAuth } from "../api/http";
import { AuthContext } from "./AuthContext";

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
