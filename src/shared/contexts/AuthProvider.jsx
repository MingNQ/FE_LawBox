import { useState } from "react";
import { authStorage } from "@shared/stores/authStore";
import { setCurrentUser } from "@shared/api/authApi";
import { setAuthToken, clearAuth } from "@shared/api/http";
import { AuthContext } from "@shared/contexts/AuthContext";
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
    await setCurrentUser().then((res) => {
      setUser(res);
    });
  };

  const logout = (isAdmin = false) => {
    window.location.href = isAdmin ? ROUTES.ADMIN.AUTH : ROUTES.AUTH.SIGN_IN;
    clearAuth();
    setUser(null);
    setTokenState(null);
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
