import { useMemo, useState } from "react";
import {
  LayoutDashboard, Settings, TrendingUp, Shield, Eye, Wand2, Tags, Ticket, Gift,
  Brain, Smile, BarChart3, LayoutTemplate, ExternalLink, Lock, LogOut, AlertTriangle,
  Users, MessageSquare, Activity, Crown, ChevronDown, Search, Plus, Trash2,
  CheckCircle2, XCircle, Clock, Zap, Hash, Mic, Megaphone, FileText, Sparkles,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer,
  XAxis, YAxis, Tooltip, CartesianGrid, Legend,
} from "recharts";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { discordAvatarUrl, guildIconUrl, inviteUrl } from "@/lib/api";
import {
  mockGuilds, memberGrowth, messageActivity, leaderboard, modActions,
  tickets, giveaways, customCommands, reactionRoles, autoModRules,
  memories, channelTypeBreakdown, recentLogs,
} from "@/data/mockDashboard";

// -----------------------------------------------------------------------------
// Module list
// -----------------------------------------------------------------------------
type ModuleKey =
  | "overview" | "settings" | "leveling" | "moderation" | "automod"
  | "commands" | "reactions" | "tickets" | "giveaways" | "memory"
  | "emoji" | "stats" | "setup";

const MODULES: { key: ModuleKey; icon: typeof LayoutDashboard; name: string; desc: string }[] = [
  { key: "overview",   icon: LayoutDashboard, name: "Overview",        desc: "Health, status, recent logs" },
  { key: "settings",   icon: Settings,        name: "Settings",        desc: "Prefix, welcome, modlog" },
  { key: "leveling",   icon: TrendingUp,      name: "Leveling",        desc: "Leaderboard & level roles" },
  { key: "moderation", icon: Shield,          name: "Moderation",      desc: "Warnings & audit trail" },
  { key: "automod",    icon: Eye,             name: "Auto-moderation", desc: "Filters & anti-raid" },
  { key: "commands",   icon: Wand2,           name: "Custom commands", desc: "Triggers & responses" },
  { key: "reactions",  icon: Tags,            name: "Reaction roles",  desc: "Emoji → role" },
  { key: "tickets",    icon: Ticket,          name: "Tickets",         desc: "Support threads" },
  { key: "giveaways",  icon: Gift,            name: "Giveaways",       desc: "Prizes & winners" },
  { key: "memory",     icon: Brain,           name: "Memory",          desc: "Server-wide facts" },
  { key: "emoji",      icon: Smile,           name: "Emoji",           desc: "Custom emoji gallery" },
  { key: "stats",      icon: BarChart3,       name: "Stats",           desc: "Growth & activity" },
  { key: "setup",      icon: LayoutTemplate,  name: "Setup",           desc: "Presets & structure" },
];

// -----------------------------------------------------------------------------
// Bypass / signed-out gate
// -----------------------------------------------------------------------------
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
        <h2 className="font-display text-3xl md:text-4xl text-gold-gradient mb-3">Les portes sont scellées</h2>
        <p className="font-serif italic text-muted-foreground mb-8">
          Prononcez votre nom à travers Discord. Seuls ceux ayant <em>Manage Guild</em> peuvent passer.
        </p>
        <Button size="lg" onClick={onSignIn} className="font-display tracking-widest uppercase text-xs shadow-candle h-14 px-8">
          Se connecter avec Discord
        </Button>
        <div className="mt-8 pt-6 border-t border-border/40">
          <p className="font-serif text-xs text-muted-foreground/60 mb-3 italic">
            Mode démo — explorer le Sanctum sans OAuth.
          </p>
          <Button variant="outline" size="sm" onClick={enableBypass} className="font-display tracking-widest uppercase text-[10px]">
            Entrer en spectre (bypass)
          </Button>
        </div>
      </div>
    </section>
  );
};

// -----------------------------------------------------------------------------
// Reusable bits
// -----------------------------------------------------------------------------
const StatCard = ({ icon: Icon, label, value, hint, accent }: { icon: typeof Users; label: string; value: string; hint?: string; accent?: boolean }) => (
  <div className={`parchment border ${accent ? "border-primary/50" : "border-border/60"} p-5 hover:shadow-candle transition-all duration-500`}>
    <div className="flex items-center justify-between mb-3">
      <Icon className={`h-5 w-5 ${accent ? "text-primary" : "text-muted-foreground"}`} strokeWidth={1.4} />
      {hint && <span className="font-serif text-xs text-muted-foreground italic">{hint}</span>}
    </div>
    <p className="font-display text-3xl text-gold-gradient">{value}</p>
    <p className="font-serif text-xs uppercase tracking-widest text-muted-foreground mt-1">{label}</p>
  </div>
);

const Panel = ({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) => (
  <div className="parchment border border-border/60 p-6">
    <div className="flex items-center justify-between mb-5">
      <h3 className="font-display text-lg tracking-wide text-foreground">{title}</h3>
      {action}
    </div>
    {children}
  </div>
);

// Recharts colors derived from CSS vars (HSL semantic tokens).
const C = {
  primary: "hsl(var(--primary))",
  accent: "hsl(var(--accent))",
  muted: "hsl(var(--muted-foreground))",
  border: "hsl(var(--border))",
};

const tooltipStyle = {
  background: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 4,
  fontFamily: "Cormorant Garamond, serif",
};

// =============================================================================
// Module panels
// =============================================================================

const Overview = ({ guild }: { guild: typeof mockGuilds[number] }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard icon={Users}        label="Membres"   value={guild.memberCount.toLocaleString()} hint={`+${(guild.memberCount - memberGrowth[0].value)} cette sem.`} accent />
      <StatCard icon={Activity}     label="En ligne"  value={guild.onlineCount.toLocaleString()} hint={`${Math.round(guild.onlineCount/guild.memberCount*100)}%`} />
      <StatCard icon={MessageSquare} label="Messages 7j" value={messageActivity.reduce((a,b)=>a+b.value,0).toLocaleString()} />
      <StatCard icon={Crown}        label="Boosts"    value={`${guild.boosts}`} hint={`Tier ${guild.boostTier}`} />
    </div>

    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Panel title="Croissance des membres">
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={memberGrowth}>
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.primary} stopOpacity={0.6} />
                  <stop offset="100%" stopColor={C.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.border} strokeDasharray="3 3" />
              <XAxis dataKey="day" stroke={C.muted} fontSize={12} />
              <YAxis stroke={C.muted} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="value" stroke={C.primary} fill="url(#g1)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </div>
      <Panel title="Status">
        <ul className="space-y-3 font-serif text-sm">
          <li className="flex justify-between"><span className="text-muted-foreground">Bot</span><Badge variant="outline" className="border-primary/60 text-primary">Online</Badge></li>
          <li className="flex justify-between"><span className="text-muted-foreground">Latence</span><span>42 ms</span></li>
          <li className="flex justify-between"><span className="text-muted-foreground">Shard</span><span>0 / 1</span></li>
          <li className="flex justify-between"><span className="text-muted-foreground">Uptime</span><span>14j 6h</span></li>
          <li className="flex justify-between"><span className="text-muted-foreground">Région</span><span>{guild.region}</span></li>
          <li className="flex justify-between"><span className="text-muted-foreground">Salons</span><span>{guild.channels}</span></li>
          <li className="flex justify-between"><span className="text-muted-foreground">Rôles</span><span>{guild.roles}</span></li>
        </ul>
      </Panel>
    </div>

    <Panel title="Journal récent" action={<Badge variant="outline" className="font-mono text-[10px]">LIVE</Badge>}>
      <ul className="divide-y divide-border/40">
        {recentLogs.map((l, i) => (
          <li key={i} className="py-2.5 flex items-start gap-4 font-serif text-sm">
            <span className="text-primary/80 mt-0.5">✦</span>
            <span className="flex-1 text-foreground/90">{l.text}</span>
            <span className="text-muted-foreground italic text-xs">{l.at}</span>
          </li>
        ))}
      </ul>
    </Panel>
  </div>
);

const SettingsPanel = () => {
  const [welcome, setWelcome] = useState(true);
  const [modlog, setModlog] = useState(true);
  const [joinlog, setJoinlog] = useState(false);
  const [prefix, setPrefix] = useState("!");
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <Panel title="Général">
        <div className="space-y-5">
          <div>
            <label className="font-serif text-sm text-muted-foreground">Préfixe des commandes</label>
            <Input value={prefix} onChange={(e) => setPrefix(e.target.value)} className="mt-2 font-mono w-32" />
          </div>
          <div>
            <label className="font-serif text-sm text-muted-foreground">Langue par défaut</label>
            <select className="mt-2 block w-full bg-background border border-border/60 px-3 py-2 font-serif">
              <option>Français</option>
              <option>English</option>
              <option>Español</option>
            </select>
          </div>
          <div>
            <label className="font-serif text-sm text-muted-foreground">Salon de bienvenue</label>
            <select className="mt-2 block w-full bg-background border border-border/60 px-3 py-2 font-serif">
              <option>#welcome</option>
              <option>#general</option>
              <option>#gates</option>
            </select>
          </div>
        </div>
      </Panel>

      <Panel title="Modules">
        <div className="space-y-5">
          {[
            { label: "Message de bienvenue", val: welcome, set: setWelcome },
            { label: "Journal de modération", val: modlog, set: setModlog },
            { label: "Journal d'arrivées",    val: joinlog, set: setJoinlog },
          ].map((row) => (
            <div key={row.label} className="flex items-center justify-between border border-border/40 px-4 py-3">
              <span className="font-serif">{row.label}</span>
              <Switch checked={row.val} onCheckedChange={row.set} />
            </div>
          ))}
        </div>
      </Panel>

      <Panel title="Message de bienvenue">
        <textarea
          rows={6}
          defaultValue="Bienvenue {user} dans {server}. Allume une bougie, lis les règles, et que les corbeaux te guident."
          className="w-full bg-background border border-border/60 p-3 font-serif resize-none"
        />
        <p className="font-serif text-xs text-muted-foreground italic mt-2">
          Variables: {"{user}"}, {"{server}"}, {"{count}"}
        </p>
      </Panel>

      <Panel title="Rôles automatiques">
        <div className="space-y-2">
          {["Initié", "Voyageur", "Membre"].map((r) => (
            <div key={r} className="flex items-center justify-between border border-border/40 px-4 py-2">
              <span className="font-serif">@{r}</span>
              <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" className="mt-3"><Plus className="h-4 w-4 mr-2" /> Ajouter un rôle</Button>
        </div>
      </Panel>
    </div>
  );
};

const Leveling = () => (
  <div className="grid lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2">
      <Panel title="Classement" action={<Badge variant="outline" className="font-mono text-[10px]">TOP 10</Badge>}>
        <div className="divide-y divide-border/40">
          {leaderboard.map((u) => (
            <div key={u.rank} className="py-3 flex items-center gap-4">
              <span className={`font-display text-2xl w-10 ${u.rank <= 3 ? "text-primary" : "text-muted-foreground"}`}>#{u.rank}</span>
              <span className="text-2xl">{u.avatar}</span>
              <div className="flex-1 min-w-0">
                <p className="font-display text-foreground">{u.name}</p>
                <Progress value={(u.xp % 10000) / 100} className="h-1.5 mt-1" />
              </div>
              <div className="text-right">
                <p className="font-display text-primary">Lv. {u.level}</p>
                <p className="font-mono text-xs text-muted-foreground">{u.xp.toLocaleString()} XP</p>
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </div>
    <div className="space-y-6">
      <Panel title="Configuration">
        <div className="space-y-4">
          <div className="flex justify-between items-center"><span className="font-serif text-sm">XP par message</span><Input className="w-20 font-mono" defaultValue="15" /></div>
          <div className="flex justify-between items-center"><span className="font-serif text-sm">Cooldown (sec)</span><Input className="w-20 font-mono" defaultValue="60" /></div>
          <div className="flex justify-between items-center"><span className="font-serif text-sm">Annoncer level-up</span><Switch defaultChecked /></div>
        </div>
      </Panel>
      <Panel title="Rôles de niveau">
        <div className="space-y-2 font-serif text-sm">
          {[{ lv: 5, role: "Initié" }, { lv: 15, role: "Voyageur" }, { lv: 30, role: "Veilleur" }, { lv: 50, role: "Corbeau" }, { lv: 75, role: "Élu" }].map((r) => (
            <div key={r.lv} className="flex justify-between items-center border border-border/40 px-3 py-2">
              <span>Lv. {r.lv}</span>
              <span className="text-primary">@{r.role}</span>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  </div>
);

const Moderation = () => (
  <div className="grid lg:grid-cols-3 gap-6">
    <div className="lg:col-span-2">
      <Panel title="Actions récentes" action={<div className="relative"><Search className="h-4 w-4 absolute left-2 top-2.5 text-muted-foreground" /><Input placeholder="Rechercher…" className="pl-8 w-48 h-9" /></div>}>
        <div className="divide-y divide-border/40">
          {modActions.map((a) => {
            const colors: Record<string, string> = {
              ban:  "text-destructive border-destructive/60",
              kick: "text-accent border-accent/60",
              mute: "text-primary border-primary/60",
              warn: "text-muted-foreground border-border",
            };
            return (
              <div key={a.id} className="py-3 grid grid-cols-12 gap-3 items-center font-serif text-sm">
                <Badge variant="outline" className={`col-span-2 justify-center uppercase font-display tracking-widest text-[10px] ${colors[a.type]}`}>{a.type}</Badge>
                <div className="col-span-3"><p className="text-foreground">{a.target}</p><p className="text-xs text-muted-foreground">par {a.moderator}</p></div>
                <p className="col-span-5 text-muted-foreground italic">{a.reason}</p>
                <p className="col-span-2 text-right text-xs text-muted-foreground">{a.at}</p>
              </div>
            );
          })}
        </div>
      </Panel>
    </div>
    <div className="space-y-6">
      <Panel title="Stats 7j">
        <div className="grid grid-cols-2 gap-3 text-center">
          {[{ k: "Bans", v: 8, c: "text-destructive" }, { k: "Kicks", v: 14, c: "text-accent" }, { k: "Mutes", v: 47, c: "text-primary" }, { k: "Warns", v: 122, c: "text-muted-foreground" }].map((s) => (
            <div key={s.k} className="border border-border/60 p-4">
              <p className={`font-display text-3xl ${s.c}`}>{s.v}</p>
              <p className="font-serif text-xs uppercase tracking-widest text-muted-foreground">{s.k}</p>
            </div>
          ))}
        </div>
      </Panel>
      <Panel title="Action rapide">
        <div className="space-y-3">
          <Input placeholder="@utilisateur" />
          <Input placeholder="Raison" />
          <div className="grid grid-cols-2 gap-2">
            <Button variant="outline" size="sm">Warn</Button>
            <Button variant="outline" size="sm">Mute</Button>
            <Button variant="outline" size="sm">Kick</Button>
            <Button variant="destructive" size="sm">Ban</Button>
          </div>
        </div>
      </Panel>
    </div>
  </div>
);

const AutoMod = () => {
  const [rules, setRules] = useState(autoModRules);
  return (
    <Panel title="Règles d'auto-modération" action={<Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />Nouvelle règle</Button>}>
      <div className="divide-y divide-border/40">
        {rules.map((r, i) => (
          <div key={r.id} className="py-4 flex items-center gap-4">
            <Switch checked={r.enabled} onCheckedChange={(v) => setRules(rules.map((x, j) => j === i ? { ...x, enabled: v } : x))} />
            <div className="flex-1 min-w-0">
              <p className="font-display text-foreground">{r.name}</p>
              <p className="font-serif text-xs text-muted-foreground">Action: <span className="text-primary">{r.action}</span></p>
            </div>
            <div className="text-right">
              <p className="font-mono text-sm">{r.triggers}</p>
              <p className="font-serif text-xs text-muted-foreground italic">déclenchements</p>
            </div>
            <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
          </div>
        ))}
      </div>
    </Panel>
  );
};

const Commands = () => (
  <Panel title="Commandes personnalisées" action={<Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />Créer</Button>}>
    <div className="grid md:grid-cols-2 gap-4">
      {customCommands.map((c) => (
        <div key={c.id} className="border border-border/60 p-4 hover:border-primary/40 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <code className="font-mono text-primary">{c.trigger}</code>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-muted-foreground">{c.uses}×</span>
              <Switch defaultChecked={c.enabled} />
            </div>
          </div>
          <p className="font-serif text-sm text-muted-foreground italic">"{c.response}"</p>
        </div>
      ))}
    </div>
  </Panel>
);

const ReactionRoles = () => (
  <Panel title="Rôles par réaction" action={<Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />Ajouter</Button>}>
    <div className="space-y-3">
      {reactionRoles.map((r) => (
        <div key={r.id} className="flex items-center gap-4 border border-border/40 p-3">
          <span className="text-2xl w-10 text-center">{r.emoji}</span>
          <div className="flex-1">
            <p className="font-serif text-sm">{r.channel} · <em className="text-muted-foreground">"{r.message}"</em></p>
            <p className="font-display text-primary">@{r.role}</p>
          </div>
          <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
    </div>
  </Panel>
);

const Tickets = () => (
  <Panel title="Tickets ouverts" action={<Badge variant="outline" className="font-mono text-[10px]">{tickets.filter(t=>t.status!=="closed").length} actifs</Badge>}>
    <div className="divide-y divide-border/40">
      {tickets.map((t) => {
        const Icon = t.status === "open" ? Clock : t.status === "pending" ? AlertTriangle : CheckCircle2;
        const color = t.status === "open" ? "text-primary" : t.status === "pending" ? "text-accent" : "text-muted-foreground";
        return (
          <div key={t.id} className="py-3 flex items-center gap-4 font-serif text-sm">
            <Icon className={`h-4 w-4 ${color}`} />
            <code className="font-mono text-xs text-muted-foreground w-16">{t.id}</code>
            <div className="flex-1 min-w-0">
              <p className="text-foreground truncate">{t.subject}</p>
              <p className="text-xs text-muted-foreground">par {t.opener} · {t.opened}</p>
            </div>
            {t.assignee && <Badge variant="outline" className="text-xs">@{t.assignee}</Badge>}
            <Button size="sm" variant="ghost">Ouvrir</Button>
          </div>
        );
      })}
    </div>
  </Panel>
);

const Giveaways = () => (
  <div className="grid md:grid-cols-3 gap-5">
    {giveaways.map((g) => (
      <div key={g.id} className="parchment border border-border/60 p-6 hover:border-primary/60 transition-all hover:shadow-candle">
        <Gift className="h-8 w-8 text-primary mb-4" strokeWidth={1.2} />
        <h3 className="font-display text-xl text-foreground mb-2">{g.prize}</h3>
        <p className="font-serif text-xs text-muted-foreground mb-4">{g.channel}</p>
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div><p className="font-display text-lg text-primary">{g.entries}</p><p className="font-serif text-[10px] uppercase tracking-widest text-muted-foreground">Entrées</p></div>
          <div><p className="font-display text-lg text-primary">{g.winners}</p><p className="font-serif text-[10px] uppercase tracking-widest text-muted-foreground">Gagnants</p></div>
          <div><p className="font-display text-lg text-primary">{g.endsIn}</p><p className="font-serif text-[10px] uppercase tracking-widest text-muted-foreground">Reste</p></div>
        </div>
        <Button variant="outline" size="sm" className="w-full">Gérer</Button>
      </div>
    ))}
    <button className="border border-dashed border-border/60 hover:border-primary/60 transition-colors p-6 flex flex-col items-center justify-center min-h-[260px] text-muted-foreground hover:text-primary">
      <Plus className="h-8 w-8 mb-3" strokeWidth={1.2} />
      <span className="font-display tracking-widest text-xs uppercase">Lancer un tirage</span>
    </button>
  </div>
);

const MemoryPanel = () => (
  <Panel title="Mémoire du serveur" action={<Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />Ajouter</Button>}>
    <p className="font-serif italic text-sm text-muted-foreground mb-5">
      Faits que Mortis garde en mémoire pour ce serveur. Utilisés dans les réponses contextuelles.
    </p>
    <div className="space-y-2">
      {memories.map((m) => (
        <div key={m.id} className="grid grid-cols-12 gap-3 border border-border/40 p-3 items-center">
          <code className="col-span-3 font-mono text-primary text-sm">{m.key}</code>
          <p className="col-span-7 font-serif text-sm">{m.value}</p>
          <p className="col-span-1 font-serif text-xs text-muted-foreground italic text-right">{m.updated}</p>
          <Button variant="ghost" size="sm" className="col-span-1"><Trash2 className="h-4 w-4" /></Button>
        </div>
      ))}
    </div>
  </Panel>
);

const EmojiPanel = () => {
  const emojis = ["🦅","🕯️","🜲","🜏","💀","🌑","🪶","⚜️","👻","🔥","🪦","⚰️","🜃","⛧","🩸","🕷️","🌒","🗝️","📜","🪞","⚱️","🜔"];
  return (
    <Panel title="Galerie d'emoji" action={<Button size="sm" variant="outline"><Plus className="h-4 w-4 mr-2" />Importer</Button>}>
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-3">
        {emojis.map((e, i) => (
          <div key={i} className="aspect-square border border-border/60 hover:border-primary/60 flex items-center justify-center text-3xl hover:bg-muted/30 transition-colors cursor-pointer">
            {e}
          </div>
        ))}
      </div>
    </Panel>
  );
};

const Stats = () => (
  <div className="grid lg:grid-cols-2 gap-6">
    <Panel title="Activité messages (7j)">
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={messageActivity}>
          <CartesianGrid stroke={C.border} strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke={C.muted} fontSize={12} />
          <YAxis stroke={C.muted} fontSize={12} />
          <Tooltip contentStyle={tooltipStyle} />
          <Bar dataKey="value" fill={C.primary} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Panel>

    <Panel title="Membres vs en ligne">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={memberGrowth}>
          <CartesianGrid stroke={C.border} strokeDasharray="3 3" />
          <XAxis dataKey="day" stroke={C.muted} fontSize={12} />
          <YAxis stroke={C.muted} fontSize={12} />
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontFamily: "Cormorant Garamond, serif" }} />
          <Area type="monotone" dataKey="value" name="Membres" stroke={C.primary} fill={C.primary} fillOpacity={0.2} />
          <Area type="monotone" dataKey="value2" name="En ligne" stroke={C.accent} fill={C.accent} fillOpacity={0.2} />
        </AreaChart>
      </ResponsiveContainer>
    </Panel>

    <Panel title="Répartition des salons">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={channelTypeBreakdown} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
            {channelTypeBreakdown.map((_, i) => (
              <Cell key={i} fill={i % 2 === 0 ? C.primary : C.accent} fillOpacity={0.4 + (i * 0.12)} />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ fontFamily: "Cormorant Garamond, serif" }} />
        </PieChart>
      </ResponsiveContainer>
    </Panel>

    <Panel title="Top salons (mock)">
      <div className="space-y-3">
        {[
          { c: "#general",   v: 8421, i: Hash },
          { c: "#memes",     v: 6310, i: Hash },
          { c: "#voice-1",   v: 4102, i: Mic },
          { c: "#announces", v: 1840, i: Megaphone },
          { c: "#rules",     v:  421, i: FileText },
        ].map((r) => (
          <div key={r.c} className="flex items-center gap-3">
            <r.i className="h-4 w-4 text-muted-foreground" />
            <span className="font-serif text-sm flex-1">{r.c}</span>
            <Progress value={(r.v / 8421) * 100} className="w-32 h-1.5" />
            <span className="font-mono text-xs text-muted-foreground w-12 text-right">{r.v}</span>
          </div>
        ))}
      </div>
    </Panel>
  </div>
);

const Setup = () => (
  <div className="space-y-6">
    <Panel title="Presets de serveur">
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { name: "Communauté", desc: "Salons généraux, rôles de couleur, modlog", icon: Users },
          { name: "Gaming",     desc: "Vocaux par jeu, LFG, annonces",            icon: Zap },
          { name: "Création",   desc: "Showcase, feedback, ressources",            icon: Sparkles },
        ].map((p) => (
          <div key={p.name} className="border border-border/60 hover:border-primary/60 p-5 transition-all hover:shadow-candle cursor-pointer">
            <p.icon className="h-7 w-7 text-primary mb-3" strokeWidth={1.2} />
            <h4 className="font-display text-lg mb-1">{p.name}</h4>
            <p className="font-serif text-sm text-muted-foreground mb-4">{p.desc}</p>
            <Button variant="outline" size="sm" className="w-full">Appliquer</Button>
          </div>
        ))}
      </div>
    </Panel>
    <Panel title="Zone dangereuse">
      <div className="space-y-3">
        <div className="flex items-center justify-between border border-destructive/30 p-4">
          <div>
            <p className="font-display text-foreground">Purger les messages</p>
            <p className="font-serif text-xs text-muted-foreground">Supprime jusqu'à 100 messages d'un salon.</p>
          </div>
          <Button variant="destructive" size="sm">Purger</Button>
        </div>
        <div className="flex items-center justify-between border border-destructive/30 p-4">
          <div>
            <p className="font-display text-foreground">Réinitialiser la config</p>
            <p className="font-serif text-xs text-muted-foreground">Restaure tous les modules à leur état d'origine.</p>
          </div>
          <Button variant="destructive" size="sm">Réinitialiser</Button>
        </div>
      </div>
    </Panel>
  </div>
);

// =============================================================================
// Dashboard shell
// =============================================================================

const Dashboard = () => {
  const { session, loading, signIn, signOut } = useAuth();
  const [activeGuildId, setActiveGuildId] = useState<string>(mockGuilds[0].id);
  const [activeModule, setActiveModule] = useState<ModuleKey>("overview");

  const guild = useMemo(
    () => mockGuilds.find((g) => g.id === activeGuildId) ?? mockGuilds[0],
    [activeGuildId]
  );

  if (loading) {
    return (
      <SiteLayout>
        <PageHeader eyebrow="Le Sanctum" title="Dashboard" subtitle="Consultation du registre…" />
      </SiteLayout>
    );
  }

  if (!session) {
    return (
      <SiteLayout>
        <PageHeader eyebrow="Le Sanctum" title="Dashboard" subtitle="Connectez-vous pour gouverner vos royaumes." />
        <SignedOut onSignIn={signIn} />
      </SiteLayout>
    );
  }

  const displayName = session.user.global_name || session.user.username;

  const renderModule = () => {
    switch (activeModule) {
      case "overview":   return <Overview guild={guild} />;
      case "settings":   return <SettingsPanel />;
      case "leveling":   return <Leveling />;
      case "moderation": return <Moderation />;
      case "automod":    return <AutoMod />;
      case "commands":   return <Commands />;
      case "reactions":  return <ReactionRoles />;
      case "tickets":    return <Tickets />;
      case "giveaways":  return <Giveaways />;
      case "memory":     return <MemoryPanel />;
      case "emoji":      return <EmojiPanel />;
      case "stats":      return <Stats />;
      case "setup":      return <Setup />;
    }
  };

  const activeMeta = MODULES.find((m) => m.key === activeModule)!;

  return (
    <SiteLayout>
      <section className="container py-10">
        {/* Top bar: identity + guild switcher */}
        <div className="parchment border border-border/60 p-4 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={discordAvatarUrl(session.user, 96)} alt="" width={44} height={44} className="h-11 w-11 rounded-full border border-primary/40" />
            <div>
              <p className="font-display text-foreground">{displayName}</p>
              <p className="font-serif text-xs text-muted-foreground">@{session.user.username}</p>
            </div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="font-display tracking-widest uppercase text-xs">
                {guildIconUrl(session.guilds.find(g => g.id === activeGuildId) ?? session.guilds[0], 32) ? (
                  <img src={guildIconUrl(session.guilds.find(g => g.id === activeGuildId) ?? session.guilds[0], 32)!} alt="" className="h-5 w-5 rounded-full mr-2" />
                ) : (
                  <span className="h-5 w-5 rounded-full bg-primary/20 mr-2 flex items-center justify-center text-[10px]">{guild.name.slice(0,2)}</span>
                )}
                {guild.name}
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64">
              {mockGuilds.map((g) => (
                <DropdownMenuItem key={g.id} onClick={() => setActiveGuildId(g.id)} className="font-serif">
                  <span className="h-5 w-5 rounded-full bg-primary/20 mr-2 flex items-center justify-center text-[10px]">{g.name.slice(0,2)}</span>
                  <span className="flex-1">{g.name}</span>
                  <span className="text-xs text-muted-foreground">{g.memberCount.toLocaleString()}</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem asChild className="font-serif border-t border-border/40 mt-1">
                <a href={inviteUrl()} target="_blank" rel="noopener noreferrer">
                  <Plus className="h-4 w-4 mr-2" /> Ajouter un serveur
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="ghost" onClick={signOut} className="font-display tracking-widest uppercase text-xs">
            <LogOut className="h-4 w-4 mr-2" /> Déconnexion
          </Button>
        </div>

        {/* Main grid: sidebar + module content */}
        <div className="grid lg:grid-cols-[260px_1fr] gap-8">
          <aside className="parchment border border-border/60 p-3 h-fit lg:sticky lg:top-24">
            <p className="font-display tracking-[0.3em] text-[10px] uppercase text-muted-foreground px-3 py-2">Modules</p>
            <nav className="space-y-0.5">
              {MODULES.map((m) => {
                const active = activeModule === m.key;
                return (
                  <button
                    key={m.key}
                    onClick={() => setActiveModule(m.key)}
                    className={`w-full text-left flex items-center gap-3 px-3 py-2 transition-colors font-serif text-sm ${
                      active
                        ? "bg-primary/10 text-primary border-l-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/30 border-l-2 border-transparent"
                    }`}
                  >
                    <m.icon className="h-4 w-4" strokeWidth={1.4} />
                    <span>{m.name}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div>
            <div className="mb-6">
              <p className="font-display tracking-[0.4em] text-[10px] uppercase text-primary/80 mb-2">✦ {guild.name} ✦</p>
              <h1 className="font-display text-4xl text-gold-gradient candle-glow">{activeMeta.name}</h1>
              <p className="font-serif italic text-muted-foreground mt-1">{activeMeta.desc}</p>
            </div>
            {renderModule()}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Dashboard;
