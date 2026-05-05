import { useState, useMemo } from "react";
import { Search, Lock, Shield } from "lucide-react";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { commands, categories, CommandCategory } from "@/data/commands";

const Commands = () => {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<CommandCategory | "All">("All");

  const filtered = useMemo(() => {
    return commands.filter((c) => {
      const matchesQuery = `${c.name} ${c.description} ${c.syntax}`.toLowerCase().includes(query.toLowerCase());
      const matchesCat = active === "All" || c.category === active;
      return matchesQuery && matchesCat;
    });
  }, [query, active]);

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The Codex of Incantations"
        title="Commands"
        subtitle="Every rite the Raven knows. Search them, learn them, wield them."
      />

      <section className="container py-16">
        <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center mb-10">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Seek a rite by name or purpose…"
              className="pl-11 h-12 bg-card/60 border-border font-serif italic placeholder:italic placeholder:text-muted-foreground/60"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-12">
          {(["All", ...categories] as const).map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 font-display tracking-widest text-xs uppercase border transition-all ${
                active === c
                  ? "border-primary text-primary bg-primary/10 shadow-candle"
                  : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center font-serif italic text-muted-foreground py-20">
            The grimoire holds no rite by that name.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {filtered.map((cmd) => (
              <article
                key={cmd.name}
                className="group parchment border border-border/60 hover:border-primary/60 p-6 transition-all duration-500 hover:shadow-candle"
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <h3 className="font-mono text-xl text-primary tracking-tight">{cmd.name}</h3>
                  <div className="flex items-center gap-2">
                    {cmd.premium && (
                      <Badge className="bg-accent/20 text-accent border border-accent/40 hover:bg-accent/30 font-display tracking-widest text-[10px] uppercase">
                        <Lock className="h-3 w-3 mr-1" /> Premium
                      </Badge>
                    )}
                    <Badge variant="outline" className="font-display tracking-widest text-[10px] uppercase border-border">
                      {cmd.category}
                    </Badge>
                  </div>
                </div>
                <code className="block font-mono text-sm text-muted-foreground bg-background/50 border border-border/50 px-3 py-2 mb-4 break-all">
                  {cmd.syntax}
                </code>
                <p className="font-serif text-foreground/80 leading-relaxed">{cmd.description}</p>
                {cmd.permission && (
                  <div className="mt-4 pt-4 border-t border-border/40 flex items-center gap-2 text-xs text-muted-foreground font-display tracking-widest uppercase">
                    <Shield className="h-3 w-3" /> Requires: {cmd.permission}
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
};

export default Commands;
