import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import SiteLayout from "@/components/SiteLayout";

const AuthCallback = () => {
  const { refresh } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await refresh();
      navigate("/dashboard", { replace: true });
    })();
  }, [refresh, navigate]);

  return (
    <SiteLayout>
      <div className="container py-32 text-center">
        <p className="font-display tracking-[0.4em] text-xs text-primary uppercase mb-4 animate-candle-flicker">
          ✦ Binding the rite ✦
        </p>
        <h1 className="font-display text-3xl text-gold-gradient">Returning from Discord…</h1>
        <p className="font-serif italic text-muted-foreground mt-4">
          One moment while Mortis confirms your sigil.
        </p>
      </div>
    </SiteLayout>
  );
};

export default AuthCallback;
