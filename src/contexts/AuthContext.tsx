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
    window.location.href = auth.loginUrl();
  }, []);

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
