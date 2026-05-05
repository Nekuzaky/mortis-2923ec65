import { useState } from "react";
import SiteLayout from "@/components/SiteLayout";
import PageHeader from "@/components/PageHeader";
import { ScrollText } from "lucide-react";

interface Section {
  id: string;
  title: string;
  body: JSX.Element;
}

const sections: Section[] = [
  {
    id: "getting-started",
    title: "Getting Started",
    body: (
      <>
        <p className="drop-cap">
          Welcome, traveler. Binding Ravencroft to your realm is the work of a single breath. Click <em>Invoke the Bot</em> on any page and select the server you would consecrate. You must hold the <em>Manage Server</em> permission within that realm. Grant the recommended permissions when prompted — withhold none, lest some rites refuse to answer.
        </p>
        <p className="mt-4">After the binding, the Raven shall greet your halls with a brief sigil. From there, open the <em>Sanctum</em> (your dashboard) to begin the configuration.</p>
      </>
    ),
  },
  {
    id: "permissions",
    title: "Permissions & Roles",
    body: (
      <>
        <p>Ravencroft requires the following permissions to function in full:</p>
        <ul className="list-disc list-inside mt-4 space-y-2 marker:text-primary">
          <li><strong>Manage Roles</strong> — to apply mutes, reaction roles, and welcome rites</li>
          <li><strong>Ban / Kick / Moderate Members</strong> — for the rites of banishment</li>
          <li><strong>Manage Channels</strong> — for lockdowns and channel-bound logs</li>
          <li><strong>View Audit Log</strong> — to enrich its chronicles</li>
          <li><strong>Send Messages, Embed Links, Add Reactions</strong> — the basic tongue</li>
        </ul>
        <p className="mt-4">Place the Ravencroft role <em>above</em> any role it must moderate. Discord's hierarchy is absolute.</p>
      </>
    ),
  },
  {
    id: "automod",
    title: "Auto-Mod Setup",
    body: (
      <>
        <p>The sentinel watches without rest. Open <em>Sanctum → Auto-Mod</em> and toggle the wards you require:</p>
        <ul className="list-disc list-inside mt-4 space-y-2 marker:text-primary">
          <li><strong>Spam Ward</strong> — silences members posting more than X messages in Y seconds</li>
          <li><strong>Invite Ward</strong> — strikes invite links from foreign realms</li>
          <li><strong>Mention Storm</strong> — quells mass-pings before they wake the sleeping</li>
          <li><strong>Caps Ward</strong> — for those who shout in unbroken capital</li>
          <li><strong>Sentinel AI</strong> <em>(Premium)</em> — semantic toxicity detection</li>
        </ul>
        <p className="mt-4">For each rule, set the punishment: <em>Warn</em>, <em>Mute (X minutes)</em>, <em>Kick</em>, or <em>Ban</em>. Tiered punishments by repeat offenses are configured separately.</p>
      </>
    ),
  },
  {
    id: "logging",
    title: "Logging",
    body: (
      <>
        <p>Every shadow leaves a mark. Bind a chronicler-channel via <code className="font-mono text-primary">/config logs #channel</code> or through the Sanctum, then choose the events to record:</p>
        <ul className="list-disc list-inside mt-4 space-y-2 marker:text-primary">
          <li>Message edits and deletions (with previous content preserved)</li>
          <li>Member joins, leaves, bans, kicks</li>
          <li>Role and channel changes</li>
          <li>Voice channel entries and exits</li>
          <li>Moderation case events (warns, mutes)</li>
        </ul>
        <p className="mt-4">Logs are stored in your private archive for ninety days on the Free tier; eternal on Premium.</p>
      </>
    ),
  },
  {
    id: "custom-commands",
    title: "Custom Commands",
    body: (
      <>
        <p>Forge incantations unique to your realm. Open <em>Sanctum → Custom Commands → New</em>, then provide:</p>
        <ul className="list-disc list-inside mt-4 space-y-2 marker:text-primary">
          <li><strong>Trigger</strong> — the slash name (e.g. <code className="font-mono text-primary">/lore</code>)</li>
          <li><strong>Response</strong> — plain text, embed, or random list</li>
          <li><strong>Variables</strong> — <code className="font-mono text-primary">{`{user}`}</code>, <code className="font-mono text-primary">{`{server}`}</code>, <code className="font-mono text-primary">{`{count}`}</code></li>
          <li><strong>Restrictions</strong> — limit by role or channel</li>
        </ul>
        <p className="mt-4">Free realms may forge five. Premium realms may forge without limit.</p>
      </>
    ),
  },
  {
    id: "premium",
    title: "Premium Features",
    body: (
      <>
        <p>Patrons of the Order receive deeper magic:</p>
        <ul className="list-disc list-inside mt-4 space-y-2 marker:text-primary">
          <li>Sentinel AI auto-mod</li>
          <li>Anti-raid wards with verification gates</li>
          <li>Eternal log retention</li>
          <li>Music playback in voice channels</li>
          <li>Unlimited custom commands</li>
          <li>Priority answer from the Order's keepers</li>
          <li>A Patron sigil beside your server's name</li>
        </ul>
        <p className="mt-4">See <em>Patronage</em> for current tithes.</p>
      </>
    ),
  },
  {
    id: "faq",
    title: "FAQ",
    body: (
      <div className="space-y-6">
        <div>
          <h4 className="font-display text-xl text-primary mb-2">Will Ravencroft go offline?</h4>
          <p>The Order vows 99.97% uptime. Should the Raven ever fall silent, status updates appear in the Coven Discord.</p>
        </div>
        <div>
          <h4 className="font-display text-xl text-primary mb-2">Is my data safe?</h4>
          <p>Only the bare minimum is stored — guild IDs, your settings, and (briefly) recent audit context. We never read message content beyond what auto-mod requires.</p>
        </div>
        <div>
          <h4 className="font-display text-xl text-primary mb-2">Can I remove Ravencroft?</h4>
          <p>Of course. Banish the Raven from your server and all settings are purged within thirty days. Or sooner, by request.</p>
        </div>
        <div>
          <h4 className="font-display text-xl text-primary mb-2">Where do I report a bug?</h4>
          <p>The Coven Discord welcomes all heralds. A link awaits in the footer.</p>
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
        subtitle="Pages from the Order's eldest tome — setup, permissions, and the deeper rites."
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
