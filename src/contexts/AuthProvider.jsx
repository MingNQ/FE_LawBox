import { useState } from "react";
import { authStorage } from "../stores/authStore";
import { setCurrentUser, setToken } from "../api/authApi";
import { clearAuth } from "../api/http";
import { AuthContext } from "./AuthContext";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setAuthToken] = useState(() => {
    return authStorage.getToken();
  });

  const login = async (accessToken, refreshToken) => {
    setAuthToken(accessToken);
    setToken({ accessToken, refreshToken });
    setCurrentUser().then((res) => {
      setUser(res);
    });
  };

  const logout = () => {
    clearAuth();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}   
