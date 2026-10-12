import axios, { AxiosError } from "axios";

export const TOKEN_KEY = "mtb_token";

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080/api" });

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Expired / invalid token -> back to sign-in
api.interceptors.response.use(
  (res) => res,
  (err: AxiosError) => {
    if (err.response?.status === 401 && !window.location.pathname.startsWith("/signin")) {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("mtb_user");
      window.location.href = "/signin";
    }
    return Promise.reject(err);
  }
);

export function errorMessage(e: unknown): string {
  const err = e as AxiosError<{ message?: string; error?: string }>;
  return err.response?.data?.message ?? err.response?.data?.error ?? (err.response ? `Request failed (${err.response.status})` : "Cannot reach the server. Check that the backend is running.");
}

export default api;
