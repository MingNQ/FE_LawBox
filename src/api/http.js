import axios from "axios";
import { authStorage } from "../stores/authStore";

const baseApiUrl = "https://localhost:7142/api/v1";
let isRefreshing = false;
let failedQueue = [];

export const http = axios.create({
  baseURL: baseApiUrl,
});

export function setAuthToken(token) {
  http.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export function clearAuth() {
  delete http.defaults.headers.common["Authorization"];
  authStorage.clear();
}

export function initAuth() {
  const token = authStorage.getToken();
  if (token) {
    setAuthToken(token);
  }
}

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return http(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = authStorage.getRefreshToken();

        if (!refreshToken) {
          clearAuth();
          return Promise.reject(error);
        }

        const res = await axios.post(baseApiUrl + "/tokens/refresh", {
          token: authStorage.getToken(),
          refreshToken: refreshToken,
        });

        const newToken = res.data.token;
        const newRefreshToken = res.data.refreshToken;

        const rememberMe = localStorage.getItem("rememberMe") === "true";

        authStorage.setTokens(newToken, newRefreshToken, rememberMe);

        setAuthToken(newToken);
        processQueue(null, newToken);

        return http(originalRequest);
      } catch (err) {
        processQueue(err, null); // clear state + redirect login
        clearAuth();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
