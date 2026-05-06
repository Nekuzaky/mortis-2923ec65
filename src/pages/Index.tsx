import { Link } from "react-router-dom";
import { Brain, TrendingUp, Shield, Eye, Ticket, Gift, Tags, LayoutTemplate, Wand2, Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/SiteLayout";
import Embers from "@/components/Embers";
import hero from "@/assets/hero-cathedral.jpg";
import sigil from "@/assets/raven-sigil.png";

const DASHBOARD_URL = "https://mortisa.nekuzaky.com/";
const SITE_URL = "https://mortis.nekuzaky.com/";

const features = [
  { icon: Brain, title: "Memory", body: "Mortis remembers personal facts and server-wide lore — opt-in, per user, deletable at will." },
  { icon: TrendingUp, title: "Leveling", body: "XP, ranks, leaderboards, and auto-assigned level roles to crown your most devoted." },
  { icon: Shield, title: "Moderation", body: "Warns, kicks, bans, timeouts, purges and channel locks — every act inscribed in the audit trail." },
  { icon: Eye, title: "Auto-Moderation", body: "Filters for spam, links, caps, profanity. Wards rise before a single soul is troubled." },
  { icon: Ticket, title: "Tickets", body: "Private support threads opened by /ticket, managed from the dashboard." },
  { icon: Gift, title: "Giveaways", body: "Conjure prize draws with /giveaway start — duration, prize, automatic winners." },
  { icon: Tags, title: "Reaction Roles", body: "Bind emoji on a message to roles. Members anoint themselves with a touch." },
  { icon: LayoutTemplate, title: "Server Setup Presets", body: "Generate an entire server from minimal, community, gaming or dev presets — preview-first, always safe." },
  { icon: Wand2, title: "Generators & Custom Commands", body: "Tables, todos, polls and trigger/response custom commands for your realm." },
];

const stats = [
  { value: "EU", label: "Swiss Datacenter" },
  { value: "MySQL", label: "Persistent Storage" },
  { value: "30+", label: "Slash Commands" },
  { value: "24/7", label: "Sworn Vigil" },
];

const Index = () => {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hero}
            alt="Gothic cathedral with ravens and candlelight"
            width={1920}
            height={1080}
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
          <div className="absolute inset-0 bg-vignette" />
        </div>
        <Embers count={28} />

        <div className="container relative z-10 grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center py-20">
          <div className="text-center md:text-left">
            <p className="font-display tracking-[0.4em] text-xs text-primary/80 uppercase mb-6 animate-fade-in">
              ✦ The Discord Bot of Memory & Order ✦
            </p>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.95] tracking-wide animate-fade-up">
              <span className="text-gold-gradient candle-glow">Mortis</span>
            </h1>
            <p className="font-serif italic text-2xl md:text-3xl text-foreground/80 mt-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              The keeper of memory, order, and the dead-quiet of a well-run realm.
            </p>
            <p className="font-serif text-lg text-muted-foreground max-w-xl mt-6 mx-auto md:mx-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              Memory, leveling, moderation, tickets, giveaways, reaction roles and one-command server presets — all administered from a sanctum that reads like a forbidden grimoire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center md:justify-start animate-fade-up" style={{ animationDelay: "0.45s" }}>
              <Button size="lg" id="invite" className="font-display tracking-widest uppercase text-xs shadow-candle h-14 px-8" asChild>
                <a href={SITE_URL} target="_blank" rel="noopener noreferrer">Invoke Mortis <ArrowRight className="ml-2 h-4 w-4" /></a>
              </Button>
              <Button size="lg" variant="outline" className="font-display tracking-widest uppercase text-xs h-14 px-8" asChild>
                <Link to="/dashboard">Enter the Sanctum</Link>
              </Button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
              <img
                src={sigil}
                alt="Mortis sigil"
                width={420}
                height={420}
                className="relative w-80 h-80 object-contain candle-glow"
              />
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 font-display text-xs tracking-[0.4em] text-muted-foreground/60 uppercase animate-fade-in">
          Descend ↓
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border/40 bg-card/30 backdrop-blur">
        <div className="container py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-4xl md:text-5xl text-gold-gradient">{s.value}</div>
              <div className="font-serif italic text-muted-foreground mt-2 text-sm tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
        <p className="container pb-8 -mt-2 text-center font-serif italic text-xs text-muted-foreground/70">
          Bound in MySQL on Infomaniak's Swiss datacenter. JSON fallback only when the crypt is unreachable.
        </p>
      </section>

      {/* FEATURES */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <p className="font-display tracking-[0.4em] text-xs text-primary/80 uppercase mb-4">✦ Mortis's Gifts ✦</p>
          <h2 className="font-display text-4xl md:text-6xl text-gold-gradient">Powers of the Bot</h2>
          <p className="font-serif italic text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Nine pillars hold the cathedral. Each may be wielded alone or in concert.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <div
              key={f.title}
              className="group relative p-8 parchment border border-border/60 hover:border-primary/60 transition-all duration-500 hover:shadow-candle animate-fade-up"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="absolute top-0 left-0 w-12 h-px bg-primary/60 group-hover:w-full transition-all duration-700" />
              <f.icon className="h-10 w-10 text-primary mb-6" strokeWidth={1.2} />
              <h3 className="font-display text-2xl text-foreground mb-3 tracking-wide">{f.title}</h3>
              <p className="font-serif text-muted-foreground leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRESETS HIGHLIGHT */}
      <section className="container py-12">
        <div className="gothic-divider"><span className="font-display tracking-[0.4em] text-xs uppercase">Server Setup, in a Single Breath</span></div>
        <div className="grid md:grid-cols-4 gap-4 mt-12">
          {[
            { name: "minimal", roles: 4, cats: 3, chans: 6, desc: "Bare essentials." },
            { name: "community", roles: 8, cats: 4, chans: 17, desc: "General-purpose." },
            { name: "gaming", roles: 12, cats: 5, chans: 18, desc: "LFG, clips, squads." },
            { name: "dev", roles: 15, cats: 5, chans: 24, desc: "Per-language rooms." },
          ].map((p) => (
            <div key={p.name} className="parchment border border-border/60 p-6 hover:border-primary/60 transition-all">
              <h3 className="font-display text-2xl text-primary tracking-widest uppercase">{p.name}</h3>
              <p className="font-serif italic text-muted-foreground text-sm mt-1">{p.desc}</p>
              <dl className="mt-4 grid grid-cols-3 gap-2 font-mono text-xs text-foreground/80">
                <div><dt className="text-muted-foreground">Roles</dt><dd className="text-primary text-lg">{p.roles}</dd></div>
                <div><dt className="text-muted-foreground">Cats</dt><dd className="text-primary text-lg">{p.cats}</dd></div>
                <div><dt className="text-muted-foreground">Chans</dt><dd className="text-primary text-lg">{p.chans}</dd></div>
              </dl>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden mt-12">
        <div className="absolute inset-0 bg-blood-gradient opacity-30" />
        <div className="absolute inset-0 bg-vignette" />
        <Embers count={18} />
        <div className="container relative py-32 text-center">
          <p className="font-display tracking-[0.4em] text-xs text-primary/80 uppercase mb-4">✦ A Final Summons ✦</p>
          <h2 className="font-display text-5xl md:text-7xl text-gold-gradient candle-glow">
            Bind Mortis to Your Realm
          </h2>
          <p className="font-serif italic text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
            Free to invoke. Free to wield. Sworn to keep your halls in solemn order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
            <Button size="lg" className="font-display tracking-widest uppercase text-xs h-14 px-8 shadow-candle" asChild>
              <a href={SITE_URL} target="_blank" rel="noopener noreferrer">Invoke Mortis</a>
            </Button>
            <Button size="lg" variant="outline" className="font-display tracking-widest uppercase text-xs h-14 px-8" asChild>
              <Link to="/commands">Browse the Codex <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Index;
