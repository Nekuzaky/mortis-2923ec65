import { Link } from "react-router-dom";
import {
  LayoutDashboard, Settings, TrendingUp, Shield, Eye, Wand2, Tags,
  Ticket, Gift, Brain, Smile, BarChart3, LayoutTemplate, ExternalLink, Lock, LogOut, AlertTriangle,
} from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { discordAvatarUrl, guildIconUrl } from "@/lib/api";

const SANCTUM_URL = "https://mortisa.nekuzaky.com/";

const modules = [
  { icon: LayoutDashboard, name: "Overview", desc: "Health, bot status, recent logs." },
  { icon: Settings, name: "Settings", desc: "Prefix, welcome, modlog, join log." },
  { icon: TrendingUp, name: "Leveling", desc: "Leaderboard, level roles." },
  { icon: Shield, name: "Moderation", desc: "Warnings audit trail." },
  { icon: Eye, name: "Auto-moderation", desc: "Spam, links, caps, profanity filters." },
  { icon: Wand2, name: "Custom commands", desc: "Trigger / response." },
  { icon: Tags, name: "Reaction roles", desc: "Message → emoji → role." },
  { icon: Ticket, name: "Tickets", desc: "Support threads." },
  { icon: Gift, name: "Giveaways", desc: "Prizes & winners." },
  { icon: Brain, name: "Memory", desc: "Server-wide facts Mortis remembers." },
  { icon: Smile, name: "Emoji", desc: "Custom emoji gallery." },
  { icon: BarChart3, name: "Stats", desc: "Members, boost, channel counts." },
  { icon: LayoutTemplate, name: "Setup", desc: "Presets, custom structure, purge." },
];

const SignedOut = ({ onSignIn }: { onSignIn: () => void }) => {
  const enableBypass = () => {
    localStorage.setItem("mortis_bypass", "1");
    window.location.reload();
  };
  return (
    <section className="container py-16">
      <div className="parchment border border-primary/40 p-10 md:p-14 text-center shadow-candle max-w-2xl mx-auto">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-full border border-primary/40 mb-6 animate-candle-flicker">
          <Lock className="h-7 w-7 text-primary" strokeWidth={1.2} />
        </div>
        <h2 className="font-display text-3xl md:text-4xl text-gold-gradient mb-3">The doors are sealed</h2>
        <p className="font-serif italic text-muted-foreground mb-8">
          Speak your name through Discord. Only those with <em>Manage Guild</em> may pass.
        </p>
        <Button size="lg" onClick={onSignIn} className="font-display tracking-widest uppercase text-xs shadow-candle h-14 px-8">
          Sign in with Discord
        </Button>
        <p className="font-serif text-xs text-muted-foreground/70 mt-6">
          You'll be returned here after the rite.
        </p>
        <div className="mt-8 pt-6 border-t border-border/40">
          <p className="font-serif text-xs text-muted-foreground/60 mb-3 italic">
            Dev bypass — preview the Sanctum without OAuth.
          </p>
          <Button variant="outline" size="sm" onClick={enableBypass} className="font-display tracking-widest uppercase text-[10px]">
            Enter as ghost (bypass)
          </Button>
        </div>
      </div>
    </section>
  );
};

const Loading = () => (
  <section className="container py-32 text-center">
    <p className="font-display tracking-[0.4em] text-xs text-primary uppercase animate-candle-flicker">
      ✦ Consulting the registry ✦
    </p>
  </section>
);

const Dashboard = () => {
  const { session, loading, signIn, signOut } = useAuth();

  if (loading) {
    return (
      <SiteLayout>
        <PageHeader eyebrow="The Sanctum" title="Dashboard" subtitle="Awaiting your sigil." />
        <Loading />
      </SiteLayout>
    );
  }

  if (!session) {
    return (
      <SiteLayout>
        <PageHeader
          eyebrow="The Sanctum"
          title="Dashboard"
          subtitle="A preview of every panel awaiting you within. Sign in to manage your realms."
        />
        <SignedOut onSignIn={signIn} />
      </SiteLayout>
    );
  }

  const manageable = session.guilds.filter((g) => g.manageable);
  const displayName = session.user.global_name || session.user.username;

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The Sanctum"
        title={`Welcome, ${displayName}`}
        subtitle="Choose a realm to govern, or open the live Sanctum."
      />

      <section className="container py-12">
        {/* Identity / logout bar */}
        <div className="parchment border border-border/60 p-5 mb-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={discordAvatarUrl(session.user, 96)}
              alt=""
              width={48}
              height={48}
              className="h-12 w-12 rounded-full border border-primary/40"
            />
            <div>
              <p className="font-display text-lg text-foreground">{displayName}</p>
              <p className="font-serif text-sm text-muted-foreground">@{session.user.username}</p>
            </div>
          </div>
          <Button variant="ghost" onClick={signOut} className="font-display tracking-widest uppercase text-xs">
            <LogOut className="h-4 w-4 mr-2" /> Sign out
          </Button>
        </div>

        {/* Realms */}
        <div className="gothic-divider"><span className="font-display tracking-[0.4em] text-xs uppercase">Your Realms</span></div>

        {manageable.length === 0 ? (
          <div className="parchment border border-accent/40 p-8 mt-10 text-center max-w-2xl mx-auto">
            <AlertTriangle className="h-8 w-8 text-accent mx-auto mb-3" strokeWidth={1.2} />
            <h3 className="font-display text-xl text-gold-gradient mb-2">No manageable realms</h3>
            <p className="font-serif italic text-muted-foreground">
              You need <em>Administrator</em> or <em>Manage Guild</em> in a server, and Mortis must be present there.
            </p>
            <Button asChild className="mt-6 font-display tracking-widest uppercase text-xs shadow-candle">
              <a href={inviteUrl()} target="_blank" rel="noopener noreferrer">Invoke Mortis</a>
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {manageable.map((g, i) => {
              const icon = guildIconUrl(g, 128);
              const initials = g.name.slice(0, 2).toUpperCase();
              return (
                <a
                  key={g.id}
                  href={`${SANCTUM_URL}guild/${g.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group parchment border border-border/60 hover:border-primary/60 p-5 transition-all duration-500 hover:shadow-candle animate-fade-up flex items-center gap-4"
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  {icon ? (
                    <img src={icon} alt="" width={56} height={56} className="h-14 w-14 rounded-full border border-primary/30" />
                  ) : (
                    <div className="h-14 w-14 rounded-full border border-primary/30 flex items-center justify-center font-display text-primary">
                      {initials}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-lg truncate group-hover:text-primary transition-colors">{g.name}</p>
                    <p className="font-serif text-xs text-muted-foreground">
                      {g.hasMortis === false ? "Mortis not present — invite first" : "Manage Guild ✓"}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              );
            })}
          </div>
        )}

        {/* Modules preview */}
        <div className="gothic-divider mt-20"><span className="font-display tracking-[0.4em] text-xs uppercase">Panels Within</span></div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {modules.map((m, i) => (
            <div
              key={m.name}
              className="group relative parchment border border-border/60 hover:border-primary/60 p-6 transition-all duration-500 hover:shadow-candle animate-fade-up"
              style={{ animationDelay: `${i * 0.03}s` }}
            >
              <m.icon className="h-8 w-8 text-primary mb-4" strokeWidth={1.2} />
              <h3 className="font-display text-xl text-foreground tracking-wide">{m.name}</h3>
              <p className="font-serif text-sm text-muted-foreground mt-2 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button size="lg" className="font-display tracking-widest uppercase text-xs shadow-candle h-14 px-8" asChild>
            <a href={SANCTUM_URL} target="_blank" rel="noopener noreferrer">
              Enter the Sanctum <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Dashboard;
