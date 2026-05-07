import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { auth, type Session } from "@/lib/api";

type AuthState = {
  session: Session | null;
  loading: boolean;
  error: string | null;
  signIn: () => void;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthCtx = createContext<AuthState | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      // Dev bypass — skip backend OAuth and use a fake session.
      if (typeof window !== "undefined" && localStorage.getItem("mortis_bypass") === "1") {
        setSession({
          user: {
            id: "000000000000000000",
            username: "necromancer",
            global_name: "Necromancer (bypass)",
            avatar: null,
          },
          guilds: [
            { id: "111111111111111111", name: "Crypt of Mortis", icon: null, manageable: true, hasMortis: true },
            { id: "222222222222222222", name: "Test Realm", icon: null, manageable: true, hasMortis: true },
          ],
        });
        setError(null);
        return;
      }
      const s = await auth.me();
      setSession(s);
      setError(null);
    } catch {
      setSession(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const signIn = useCallback(() => {
    // Dev bypass: ?bypass=1 in URL or stored flag → fake session, no Discord.
    const params = new URLSearchParams(window.location.search);
    if (params.get("bypass") === "1" || localStorage.getItem("mortis_bypass") === "1") {
      localStorage.setItem("mortis_bypass", "1");
      refresh();
      return;
    }
    window.location.href = auth.loginUrl();
  }, [refresh]);

  const signOut = useCallback(async () => {
    try {
      await auth.logout();
    } catch (e) {
      setError((e as Error).message);
    }
    setSession(null);
  }, []);

  return (
    <AuthCtx.Provider value={{ session, loading, error, signIn, signOut, refresh }}>
      {children}
    </AuthCtx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
