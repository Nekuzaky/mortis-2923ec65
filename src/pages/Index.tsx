import { Link } from "react-router-dom";
import { Shield, Eye, Scroll, Sparkles, Crown, Skull, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import SiteLayout from "@/components/SiteLayout";
import Embers from "@/components/Embers";
import hero from "@/assets/hero-cathedral.jpg";
import sigil from "@/assets/raven-sigil.png";

const features = [
  { icon: Shield, title: "Moderation", body: "Bans, mutes, warns, purges and lockdowns — wielded with surgical precision and full audit trails." },
  { icon: Eye, title: "Auto-Mod Sentinel", body: "AI-watched halls. Spam, raids, slurs and invite floods stilled before a single soul is troubled." },
  { icon: Scroll, title: "Eternal Logs", body: "Every edit, every deletion, every banishment — chronicled in your hidden archive forever." },
  { icon: Sparkles, title: "Custom Incantations", body: "Forge bespoke commands. Conjure embeds, reactions, role assignments — without writing a line of code." },
  { icon: Crown, title: "Reaction Roles", body: "Let visitors anoint themselves with roles by the touch of a sigil. Configurable through the sanctum." },
  { icon: Skull, title: "Welcome Rites", body: "Greet each new soul with bespoke embeds, autoroles, and a voice-channel toll if you so desire." },
];

const stats = [
  { value: "12,400+", label: "Realms Guarded" },
  { value: "3.2M", label: "Souls Watched" },
  { value: "184M", label: "Rites Performed" },
  { value: "99.97%", label: "Uptime Vow" },
];

const testimonials = [
  { quote: "Ravencroft turned our chaotic 4,000-member guild into a solemn cathedral. The sentinel never sleeps.", author: "Lady Ophelia", role: "Founder of the Crimson Choir" },
  { quote: "The most beautiful bot dashboard I have ever beheld. It feels like leafing through a forbidden book.", author: "Brother Caelan", role: "Moderator, Ashen Court" },
  { quote: "We replaced four bots with Ravencroft alone. The custom commands rival anything I've coded myself.", author: "Magister Vex", role: "Tech Lead, Velvet Cabal" },
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
              ✦ A Discord Bot Forged in Shadow ✦
            </p>
            <h1 className="font-display text-6xl md:text-8xl leading-[0.95] tracking-wide animate-fade-up">
              <span className="text-gold-gradient candle-glow">Ravencroft</span>
            </h1>
            <p className="font-serif italic text-2xl md:text-3xl text-foreground/80 mt-6 animate-fade-up" style={{ animationDelay: "0.15s" }}>
              A dark guardian for your Discord realm.
            </p>
            <p className="font-serif text-lg text-muted-foreground max-w-xl mt-6 mx-auto md:mx-0 animate-fade-up" style={{ animationDelay: "0.3s" }}>
              Moderation, auto-mod sentinels, eternal logs and custom incantations — all administered through a dashboard that reads like a forbidden grimoire.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center md:justify-start animate-fade-up" style={{ animationDelay: "0.45s" }}>
              <Button size="lg" id="invite" className="font-display tracking-widest uppercase text-xs shadow-candle h-14 px-8" asChild>
                <a href="#">Invoke the Bot <ArrowRight className="ml-2 h-4 w-4" /></a>
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
                alt="Raven sigil"
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
      </section>

      {/* FEATURES */}
      <section className="container py-24">
        <div className="text-center mb-16">
          <p className="font-display tracking-[0.4em] text-xs text-primary/80 uppercase mb-4">✦ The Order's Gifts ✦</p>
          <h2 className="font-display text-4xl md:text-6xl text-gold-gradient">Powers of the Raven</h2>
          <p className="font-serif italic text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Six pillars hold the cathedral. Each may be wielded alone or in concert.
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

      {/* TESTIMONIALS */}
      <section className="container py-24">
        <div className="gothic-divider"><span className="font-display tracking-[0.4em] text-xs uppercase">Voices from the Cloisters</span></div>

        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {testimonials.map((t, i) => (
            <figure
              key={t.author}
              className="parchment border border-border/60 p-8 relative animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="absolute -top-4 left-6 font-blackletter text-6xl text-primary/40 leading-none">"</div>
              <blockquote className="font-serif italic text-lg text-foreground/90 leading-relaxed pt-4">
                {t.quote}
              </blockquote>
              <figcaption className="mt-6 pt-6 border-t border-border/40">
                <div className="font-display tracking-widest text-sm text-primary uppercase">{t.author}</div>
                <div className="font-serif italic text-sm text-muted-foreground mt-1">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-blood-gradient opacity-30" />
        <div className="absolute inset-0 bg-vignette" />
        <Embers count={18} />
        <div className="container relative py-32 text-center">
          <p className="font-display tracking-[0.4em] text-xs text-primary/80 uppercase mb-4">✦ A Final Summons ✦</p>
          <h2 className="font-display text-5xl md:text-7xl text-gold-gradient candle-glow">
            Bind Ravencroft to Your Realm
          </h2>
          <p className="font-serif italic text-xl text-muted-foreground max-w-2xl mx-auto mt-6">
            Free to invoke. Free to wield. Premium rites available for those who seek deeper magic.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10 justify-center">
            <Button size="lg" className="font-display tracking-widest uppercase text-xs h-14 px-8 shadow-candle" asChild>
              <a href="#">Invoke Ravencroft</a>
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
