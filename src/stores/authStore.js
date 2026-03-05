const TOKEN_KEY = "token";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_KEY = "currentUser";

const getStorage = () => {
  return localStorage.getItem("rememberMe") === "true"
    ? localStorage
    : sessionStorage;
};

export const authStorage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
  },

  getRefreshToken() {
    return (
      localStorage.getItem(REFRESH_TOKEN_KEY) ||
      sessionStorage.getItem(REFRESH_TOKEN_KEY)
    );
  },

  getCurrentUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
  },

  setTokens(token, refreshToken, rememberMe) {
    localStorage.setItem("rememberMe", rememberMe ? "true" : "false");

    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem(TOKEN_KEY, token);
    storage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },

  clear() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem("rememberMe");

    sessionStorage.clear();
  },
};
