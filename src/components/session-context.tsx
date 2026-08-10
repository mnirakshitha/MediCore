"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { demoAccounts, type Role } from "@/lib/medicore-data";

type User = { name: string; email: string; role: Role };
type SessionContextValue = { user: User; setUser: (user: User) => void; logout: () => void; dark: boolean; toggleDark: () => void };
const fallback = demoAccounts[0];
const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User>({ name: fallback.name, email: fallback.email, role: fallback.role });
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = window.localStorage.getItem("medicore-user");
    const savedTheme = window.localStorage.getItem("medicore-theme");
    if (saved) setUserState(JSON.parse(saved) as User);
    if (savedTheme === "dark") setDark(true);
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    window.localStorage.setItem("medicore-theme", dark ? "dark" : "light");
  }, [dark]);
  const value = useMemo(() => ({
    user,
    setUser: (next: User) => { setUserState(next); window.localStorage.setItem("medicore-user", JSON.stringify(next)); },
    logout: () => { window.localStorage.removeItem("medicore-user"); window.localStorage.removeItem("medicore-token"); setUserState({ name: fallback.name, email: fallback.email, role: fallback.role }); },
    dark,
    toggleDark: () => setDark((value) => !value),
  }), [user, dark]);
  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession() {
  const context = useContext(SessionContext);
  if (!context) throw new Error("useSession must be used within SessionProvider");
  return context;
}
