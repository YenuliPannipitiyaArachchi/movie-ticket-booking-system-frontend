import { createContext, useContext, useState, type ReactNode } from "react";
import { TOKEN_KEY } from "../api/client";
import type { AuthResponse, Role } from "../types";

interface AuthState { token: string | null; role: Role | null; name: string | null; isAuthenticated: boolean; login: (r: AuthResponse) => void; logout: () => void }
const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem(TOKEN_KEY));
  const [user, setUser] = useState<{ role: Role; name: string } | null>(() => {
    const s = localStorage.getItem("mtb_user");
    return s ? JSON.parse(s) : null;
  });

  const login = (r: AuthResponse) => {
    const u = { role: (r.role ?? "CUSTOMER") as Role, name: r.name ?? r.email ?? "Guest" };
    localStorage.setItem(TOKEN_KEY, r.token);
    localStorage.setItem("mtb_user", JSON.stringify(u));
    setToken(r.token);
    setUser(u);
  };
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("mtb_user");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, role: user?.role ?? null, name: user?.name ?? null, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
