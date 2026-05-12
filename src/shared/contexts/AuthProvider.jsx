import { useState, useEffect, useCallback } from "react";
import { authStorage } from "@shared/stores/authStore";
import { setCurrentUser } from "@shared/api/authApi";
import { setAuthToken, clearAuth } from "@shared/api/http";
import { AuthContext } from "@shared/contexts/AuthContext";
import { ROUTES } from "@shared/constants/routes";
import { getMySubscription } from "@client/api/paymentApi";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("currentUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setTokenState] = useState(() => {
    return authStorage.getToken();
  });

  const [subscription, setSubscription] = useState(null);

  const refreshSubscription = useCallback(async () => {
    if (!token) return;
    try {
      const res = await getMySubscription();
      if (res.success) {
        setSubscription(res.result);
      }
    } catch (error) {
      console.error("Failed to fetch subscription:", error);
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      refreshSubscription();
    } else {
      setSubscription(null);
    }
  }, [token, refreshSubscription]);

  const login = async (accessToken, refreshToken, rememberMe = true) => {
    authStorage.setTokens(accessToken, refreshToken, rememberMe);
    setAuthToken(accessToken);
    setTokenState(accessToken);
    await setCurrentUser().then((res) => {
      setUser(res);
    });
    // refreshSubscription will be triggered by token change
  };

  const logout = (isAdmin = false) => {
    window.location.href = isAdmin ? ROUTES.ADMIN.AUTH : ROUTES.AUTH.SIGN_IN;
    clearAuth();
    setUser(null);
    setTokenState(null);
    setSubscription(null);
  };

  const updateUser = (updatedData) => {
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("currentUser", JSON.stringify(newUser));
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        subscription,
        login,
        logout,
        updateUser,
        refreshSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
