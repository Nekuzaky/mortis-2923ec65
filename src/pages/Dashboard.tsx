import { Link } from "react-router-dom";
import {
  LayoutDashboard, Settings, TrendingUp, Shield, Eye, Wand2, Tags,
  Ticket, Gift, Brain, Smile, BarChart3, LayoutTemplate, ExternalLink, Lock,
} from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

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

const Dashboard = () => (
  <SiteLayout>
    <PageHeader
      eyebrow="The Sanctum"
      title="Dashboard"
      subtitle="A preview of every panel awaiting you within. Sign in to manage your realms."
    />

    <section className="container py-16">
      <div className="parchment border border-primary/40 p-6 md:p-8 mb-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-candle">
        <div>
          <p className="font-display tracking-[0.4em] text-xs text-primary/80 uppercase mb-2">✦ Live Sanctum ✦</p>
          <h2 className="font-display text-2xl md:text-3xl text-gold-gradient">Manage your realms at mortisa.nekuzaky.com</h2>
          <p className="font-serif italic text-muted-foreground mt-2">
            Discord login required. You need <em>Administrator</em> or <em>Manage Guild</em>, and Mortis must be in the server.
          </p>
        </div>
        <Button size="lg" className="font-display tracking-widest uppercase text-xs shadow-candle h-14 px-8 shrink-0" asChild>
          <a href={SANCTUM_URL} target="_blank" rel="noopener noreferrer">
            Open Sanctum <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>

      <div className="gothic-divider"><span className="font-display tracking-[0.4em] text-xs uppercase">Panels Within</span></div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
        {modules.map((m, i) => (
          <div
            key={m.name}
            className="group relative parchment border border-border/60 hover:border-primary/60 p-6 transition-all duration-500 hover:shadow-candle animate-fade-up"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            <div className="absolute top-3 right-3 opacity-40 group-hover:opacity-100 transition-opacity">
              <Lock className="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <m.icon className="h-8 w-8 text-primary mb-4" strokeWidth={1.2} />
            <h3 className="font-display text-xl text-foreground tracking-wide">{m.name}</h3>
            <p className="font-serif text-sm text-muted-foreground mt-2 leading-relaxed">{m.desc}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="font-serif italic text-muted-foreground mb-6">
          The full sanctum lives outside this site, on the Mortis hosted dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button size="lg" className="font-display tracking-widest uppercase text-xs shadow-candle h-14 px-8" asChild>
            <a href={SANCTUM_URL} target="_blank" rel="noopener noreferrer">Enter the Sanctum</a>
          </Button>
          <Button size="lg" variant="outline" className="font-display tracking-widest uppercase text-xs h-14 px-8" asChild>
            <Link to="/docs">Read the Grimoire</Link>
          </Button>
        </div>
      </div>
    </section>
  </SiteLayout>
);

export default Dashboard;
