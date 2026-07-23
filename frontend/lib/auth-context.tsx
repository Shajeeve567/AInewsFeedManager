"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getStoredUser, setStoredUser, clearToken, setToken, login as apiLogin } from "./api";

interface AuthState {
  user: { id: string; email: string } | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  oauthLogin: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthState>({
  user: null,
  loading: true,
  login: async () => {},
  oauthLogin: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);
    setLoading(false);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiLogin(email, password);
    setToken(res.token);
    const payload = JSON.parse(atob(res.token.split(".")[1]));
    const u = { id: payload.userId, email: payload.email };
    setStoredUser(u);
    setUser(u);
  }, []);

  const oauthLogin = useCallback((token: string) => {
    setToken(token);
    const payload = JSON.parse(atob(token.split(".")[1]));
    const u = { id: payload.userId, email: payload.email };
    setStoredUser(u);
    setUser(u);
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, oauthLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
