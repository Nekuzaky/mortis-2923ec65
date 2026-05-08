import { Link } from "react-router-dom";
import { Check, Heart } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { inviteUrl } from "@/lib/api";

const SITE_URL = inviteUrl();

const freeFeatures = [
  "All modules included — Memory, Leveling, Moderation, Tickets, Giveaways, Reaction Roles",
  "All four server-setup presets (minimal, community, gaming, dev)",
  "Auto-moderation: spam, links, caps, profanity",
  "Custom commands & generators (/table, /todo, /poll)",
  "Web sanctum at mortisa.nekuzaky.com",
  "MySQL persistence on Infomaniak (Switzerland)",
  "No per-server limits, no premium gates",
];

const Pricing = () => (
  <SiteLayout>
    <PageHeader
      eyebrow="Patronage"
      title="Free Forever"
      subtitle="Mortis is free for every realm. Every module, every preset, every command."
    />

    <section className="container py-20">
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 max-w-5xl mx-auto">
        {/* FREE TIER */}
        <div className="parchment border-2 border-primary/60 p-10 shadow-candle relative">
          <div className="absolute top-6 right-6 font-display tracking-widest text-[10px] uppercase text-primary border border-primary/60 px-2 py-1">
            All Souls
          </div>
          <p className="font-display tracking-[0.4em] text-xs text-primary/80 uppercase">✦ The Order ✦</p>
          <h2 className="font-display text-5xl text-gold-gradient mt-3">Free</h2>
          <p className="font-serif italic text-muted-foreground mt-2">No tithes. No tiers. No locked doors.</p>

          <div className="gothic-divider my-8"><span className="text-primary">✦</span></div>

          <ul className="space-y-3">
            {freeFeatures.map((f) => (
              <li key={f} className="flex gap-3 font-serif text-foreground/90">
                <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" strokeWidth={1.5} />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <Button size="lg" className="w-full mt-10 font-display tracking-widest uppercase text-xs h-14 shadow-candle" asChild>
            <a href={SITE_URL} target="_blank" rel="noopener noreferrer">Invoke Mortis</a>
          </Button>
        </div>

        {/* SUPPORT CARD */}
        <div className="parchment border border-border/60 p-10 flex flex-col">
          <Heart className="h-10 w-10 text-accent mb-6" strokeWidth={1.2} />
          <h3 className="font-display text-3xl text-foreground tracking-wide">Support the Order</h3>
          <p className="font-serif italic text-muted-foreground mt-3">
            Mortis is sustained by patrons. If the Raven serves your realm well, a small donation keeps the candles lit and the Swiss servers humming.
          </p>

          <ul className="space-y-2 mt-6 font-serif text-sm text-muted-foreground">
            <li>· Server hosting (Infomaniak, Switzerland)</li>
            <li>· MySQL persistence & backups</li>
            <li>· Continued module development</li>
          </ul>

          <div className="mt-auto pt-8">
            <Button variant="outline" className="w-full font-display tracking-widest uppercase text-xs h-12" asChild>
              <a href={SITE_URL} target="_blank" rel="noopener noreferrer">Visit the Sanctum</a>
            </Button>
            <p className="text-center font-serif italic text-xs text-muted-foreground mt-4">
              Donations are optional and have no effect on features.
            </p>
          </div>
        </div>
      </div>

      <p className="text-center font-serif italic text-muted-foreground mt-16 max-w-xl mx-auto">
        Curious what Mortis can do? Browse <Link to="/commands" className="text-primary underline">the Codex</Link> or open <Link to="/docs" className="text-primary underline">the Grimoire</Link>.
      </p>
    </section>
  </SiteLayout>
);

export default Pricing;
