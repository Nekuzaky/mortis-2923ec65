import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import { ScrollText, AlertTriangle } from "lucide-react";

interface Section {
  id: string;
  title: string;
  body: JSX.Element;
}

const code = (s: string) => <code className="font-mono text-primary">{s}</code>;

const sections: Section[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    body: (
      <>
        <p className="drop-cap">
          Welcome, traveler. Binding Mortis to your realm is the work of a single breath. Use the <em>Invoke Mortis</em> button on any page and choose the server you would consecrate. You must hold the <em>Manage Server</em> or <em>Administrator</em> permission within that realm.
        </p>
        <p className="mt-4">After the binding, open <a href="https://mortisa.nekuzaky.com/" className="text-primary underline" target="_blank" rel="noopener noreferrer">the Sanctum</a> to begin configuration. Mortis must be granted <em>View Channel</em> at minimum, plus permissions for the modules you intend to use.</p>
      </>
    ),
  },
  {
    id: "memory",
    title: "Memory",
    body: (
      <>
        <p>Mortis remembers facts you choose to share — nothing more.</p>
        <ul className="list-disc list-inside mt-4 space-y-2 marker:text-primary">
          <li>{code("/remember content:…")} — store a personal fact about yourself.</li>
          <li>{code("/memory")} — list everything Mortis knows of you.</li>
          <li>{code("/forget number:N")} — erase a specific memory.</li>
          <li>{code("/remember-server content:…")} — admins add a server-wide fact.</li>
        </ul>
        <p className="mt-4">Server-wide memories appear in the Sanctum's <em>Memory</em> panel and can be edited or deleted there.</p>
      </>
    ),
  },
  {
    id: "leveling",
    title: "Leveling",
    body: (
      <>
        <p>Reward presence with XP, ranks, and roles.</p>
        <ul className="list-disc list-inside mt-4 space-y-2 marker:text-primary">
          <li>{code("/rank [user]")} — show XP, level and rank.</li>
          <li>{code("/leaderboard")} — top 10 of the server.</li>
          <li>{code("/levelrole add level:N role:…")} — auto-assign a role at level N.</li>
        </ul>
        <p className="mt-4">All XP, ranks and role bindings are managed from the Sanctum's <em>Leveling</em> panel.</p>
      </>
    ),
  },
  {
    id: "moderation",
    title: "Moderation",
    body: (
      <>
        <p>Standard moderation, with every action written to the audit trail.</p>
        <ul className="list-disc list-inside mt-4 space-y-2 marker:text-primary">
          <li>{code("/warn user reason")} — record a warning.</li>
          <li>{code("/kick")} {code("/ban")} {code("/unban")} {code("/timeout")} — standard actions.</li>
          <li>{code("/purge amount:N")} — delete the last N messages.</li>
          <li>{code("/lock")} {code("/unlock")} — seal or open a channel.</li>
        </ul>
        <p className="mt-4">Bind a moderation log channel with {code("/setmodlog channel:…")} to chronicle every act.</p>
      </>
    ),
  },
  {
    id: "automod",
    title: "Auto-Moderation",
    body: (
      <>
        <p>Wards are toggled in the Sanctum's <em>Auto-moderation</em> panel:</p>
        <ul className="list-disc list-inside mt-4 space-y-2 marker:text-primary">
          <li>Spam filter</li>
          <li>Link filter</li>
          <li>Caps filter</li>
          <li>Profanity filter</li>
        </ul>
        <p className="mt-4">Each ward can warn, timeout, or remove the offending message.</p>
      </>
    ),
  },
  {
    id: "configuration",
    title: "Configuration",
    body: (
      <>
        <p>Set the basics either in chat or via the Sanctum.</p>
        <ul className="list-disc list-inside mt-4 space-y-2 marker:text-primary">
          <li>{code("/config")} — view the full server configuration.</li>
          <li>{code("/setwelcome channel:…")} — welcome message channel.</li>
          <li>{code("/setmodlog channel:…")} — moderation log channel.</li>
          <li>{code("/autorole add role:…")} — role given to every new member.</li>
        </ul>
      </>
    ),
  },
  {
    id: "tickets-giveaways-roles",
    title: "Tickets · Giveaways · Reaction Roles",
    body: (
      <>
        <p>Three modules, three rites:</p>
        <ul className="list-disc list-inside mt-4 space-y-2 marker:text-primary">
          <li>{code("/ticket")} — open a private support thread.</li>
          <li>{code("/giveaway start prize duration")} — host a draw with automatic winners.</li>
          <li>{code("/reactionrole add msg emoji role")} — bind an emoji on a message to a self-assignable role.</li>
        </ul>
        <p className="mt-4">All three have their own panels in the Sanctum for editing, listing, and ending in-flight events.</p>
      </>
    ),
  },
  {
    id: "server-setup",
    title: "Server Setup",
    body: (
      <>
        <p>Generate an entire Discord server in seconds. Pick a preset or build custom. <strong>Always preview first</strong> with {code("dryrun:true")} (or {code("/setup-preview")}).</p>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left font-serif border border-border/60">
            <thead className="bg-card/60 font-display tracking-widest text-xs uppercase">
              <tr>
                <th className="p-3 border-b border-border/60">Preset</th>
                <th className="p-3 border-b border-border/60">Roles</th>
                <th className="p-3 border-b border-border/60">Categories</th>
                <th className="p-3 border-b border-border/60">Channels</th>
                <th className="p-3 border-b border-border/60">For</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-border/30"><td className="p-3 text-primary">minimal</td><td className="p-3">4</td><td className="p-3">3</td><td className="p-3">6</td><td className="p-3 italic text-muted-foreground">Bare essentials.</td></tr>
              <tr className="border-b border-border/30"><td className="p-3 text-primary">community</td><td className="p-3">8</td><td className="p-3">4</td><td className="p-3">17</td><td className="p-3 italic text-muted-foreground">General-purpose.</td></tr>
              <tr className="border-b border-border/30"><td className="p-3 text-primary">gaming</td><td className="p-3">12</td><td className="p-3">5</td><td className="p-3">18</td><td className="p-3 italic text-muted-foreground">LFG, clips, squads.</td></tr>
              <tr><td className="p-3 text-primary">dev</td><td className="p-3">15</td><td className="p-3">5</td><td className="p-3">24</td><td className="p-3 italic text-muted-foreground">Per-language rooms.</td></tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4">Existing roles or channels with the same name are <strong>skipped</strong> — re-running a preset is safe and idempotent.</p>
      </>
    ),
  },
  {
    id: "purge",
    title: "Purge — Dangerous",
    body: (
      <>
        <div className="border-l-4 border-accent bg-accent/10 p-5 flex gap-4 items-start">
          <AlertTriangle className="h-6 w-6 text-accent shrink-0 mt-0.5" />
          <div>
            <h4 className="font-display text-xl text-accent tracking-wide mb-2">Irreversible.</h4>
            <p className="font-serif">The Purge button in the Sanctum deletes <strong>every non-default role, category, and channel</strong> in the server. It requires typed confirmation. Once invoked, it cannot be undone.</p>
          </div>
        </div>
        <p className="mt-6">Reserved for full server resets — typically before applying a preset to a freshly emptied realm.</p>
      </>
    ),
  },
  {
    id: "generators",
    title: "Generators",
    body: (
      <>
        <p>Quick utilities that compose tidy embeds:</p>
        <ul className="list-disc list-inside mt-4 space-y-2 marker:text-primary">
          <li>{code("/table title columns rows")} — formatted data table.</li>
          <li>{code("/todo title items")} — interactive checklist.</li>
          <li>{code("/poll question options")} — reaction-based poll.</li>
        </ul>
      </>
    ),
  },
  {
    id: "data-privacy",
    title: "Data & Privacy",
    body: (
      <>
        <p>All per-server settings, memories, levels, logs, tickets, giveaways, snapshots, warnings, custom commands and reaction roles are stored in <strong>MySQL on Infomaniak's European (Swiss) datacenter</strong>. JSON fallback is used only if the database is unreachable.</p>
        <p className="mt-4">We never store message content beyond what is needed for logs or memory — both of which you explicitly opt into. Snapshots keep public Discord metadata (guild, member names, roles, channels) to power the dashboard. <strong>No DMs, no emails, no tokens.</strong></p>
      </>
    ),
  },
  {
    id: "faq",
    title: "FAQ",
    body: (
      <div className="space-y-6">
        <div>
          <h4 className="font-display text-xl text-primary mb-2">The bot shows offline in Discord</h4>
          <p>Check <a href="https://mortisia.nekuzaky.com/api/health" className="text-primary underline" target="_blank" rel="noopener noreferrer">mortisia.nekuzaky.com/api/health</a> — if the {code("discord")} field is {code("Mortis#1940")}, the bot is connected. If you can't see it in your server, confirm it's still in the server and has <em>View Channel</em> permission.</p>
        </div>
        <div>
          <h4 className="font-display text-xl text-primary mb-2">I can't see my servers in the dashboard</h4>
          <p>You need <em>Administrator</em> or <em>Manage Guild</em> on the server <strong>and</strong> Mortis must be in that server. If you just added the bot, give it ten seconds, then refresh.</p>
        </div>
        <div>
          <h4 className="font-display text-xl text-primary mb-2">Where is my data?</h4>
          <p>MySQL on Infomaniak (Switzerland), with JSON fallback only if the database is unreachable. See <em>Data & Privacy</em> above.</p>
        </div>
      </div>
    ),
  },
];

const Docs = () => {
  const [active, setActive] = useState(sections[0].id);
  const current = sections.find((s) => s.id === active) ?? sections[0];

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="The Grimoire"
        title="Documentation"
        subtitle="Pages from the Order's eldest tome — modules, presets, and the deeper rites."
      />

      <section className="container py-16">
        <div className="grid md:grid-cols-[260px_1fr] gap-12">
          <aside className="md:sticky md:top-28 self-start">
            <div className="flex items-center gap-2 mb-4 font-display tracking-widest text-xs uppercase text-primary">
              <ScrollText className="h-4 w-4" /> Contents
            </div>
            <nav className="flex flex-col">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActive(s.id)}
                  className={`text-left px-4 py-3 font-display tracking-wide text-sm uppercase border-l-2 transition-all ${
                    active === s.id
                      ? "border-primary text-primary bg-primary/5"
                      : "border-border text-muted-foreground hover:text-foreground hover:border-primary/50"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </nav>
          </aside>

          <article className="parchment border border-border/60 p-8 md:p-12 min-h-[60vh]">
            <h2 className="font-display text-4xl md:text-5xl text-gold-gradient mb-2">{current.title}</h2>
            <div className="gothic-divider"><span className="text-primary text-2xl">✦</span></div>
            <div className="font-serif text-lg leading-relaxed text-foreground/90 space-y-4 max-w-prose">
              {current.body}
            </div>
          </article>
        </div>
      </section>
    </SiteLayout>
  );
};

export default Docs;
