# Mortis — Real Bot Content Integration

Replace the placeholder "Ravencroft" identity with the real **Mortis** bot, populate every page with the actual commands, dashboard modules, server-setup presets, and FAQ you provided, and keep the existing gothic aesthetic.

## Branding Changes (global)

- Rename **Ravencroft → Mortis** everywhere: navbar, footer, page copy, `<title>`, meta description, OG/Twitter tags in `index.html`.
- New tagline: *"The keeper of memory, order, and the dead-quiet of a well-run realm."*
- Footer Discord/GitHub links → `https://mortis.nekuzaky.com/` and `https://mortisa.nekuzaky.com/`.
- Health endpoint reference: `mortisia.nekuzaky.com/api/health`.

## Page-by-Page Updates

### Landing (`/`)
- Hero: "Mortis" wordmark, new tagline, two CTAs — **Invoke Mortis** (Discord invite — placeholder until you give the link) + **Open Sanctum** (`/dashboard`).
- Feature grid rewritten to match real modules: Memory, Leveling, Moderation, Auto-Mod, Tickets, Giveaways, Reaction Roles, Server Setup Presets, Generators (table/todo/poll), Custom Commands.
- Stats strip: pulls from `/api/health` later; for now static placeholders (Servers, Members watched, Memories kept, Uptime).
- Footnote on data residency: *"Bound in MySQL on Infomaniak's Swiss datacenter."*

### Commands (`/commands`)
Rewrite `src/data/commands.ts` to the real Mortis command set, grouped into the categories you listed:
- **Memory** — `/remember`, `/memory`, `/forget`, `/remember-server`
- **Leveling** — `/rank`, `/leaderboard`, `/levelrole add`
- **Moderation** — `/warn`, `/kick`, `/ban`, `/unban`, `/timeout`, `/purge`, `/lock`, `/unlock`
- **Configuration** — `/config`, `/setwelcome`, `/setmodlog`, `/autorole add`
- **Tickets / Giveaways / Reaction Roles** — `/ticket`, `/giveaway start`, `/reactionrole add`
- **Server Setup** — `/setup`, `/setup-preview`
- **Generators** — `/table`, `/todo`, `/poll`
- **Misc** — `/afk`, `/userinfo`, `/serverinfo`, `/status`, `/help`

The category list, filter chips, and search already work — they'll just consume the new data. Permission labels added where applicable.

### Docs / Grimoire (`/docs`)
Restructured sidebar to mirror real content:
1. Getting Started (invite + first-run)
2. Memory module
3. Leveling & level roles
4. Moderation & audit trail
5. Auto-moderation filters
6. Configuration (welcome, modlog, autorole)
7. Tickets, Giveaways, Reaction Roles
8. **Server Setup** — full preset table (minimal / community / gaming / dev with role/category/channel counts), dryrun guidance, idempotency note ("re-running is safe")
9. **Purge** — bold danger callout, typed-confirmation warning, irreversible
10. Generators (table / todo / poll)
11. Data & Privacy (MySQL on Infomaniak Switzerland, JSON fallback, no DMs/tokens stored)
12. FAQ — the three Q&As verbatim (offline check, missing servers, data location)

### Pricing / Patronage (`/pricing`)
Mortis is currently free with no premium tier mentioned in your content. Two options — defaulting to **(a)** unless you say otherwise:
- **(a)** Replace pricing with a single "Free Forever" panel + a "Support the Order" donation/Ko-fi-style placeholder card.
- **(b)** Keep Free vs Premium $4.99/mo as previously planned (display only).

### Dashboard preview section (still public, no auth yet)
A new `/dashboard` route renders a **read-only mockup** of the real sidebar modules you listed (Overview, Settings, Leveling, Moderation, Auto-mod, Custom commands, Reaction roles, Tickets, Giveaways, Memory, Emoji, Stats, Setup) with gothic styling and "Sign in to manage" overlay. No DB writes — your existing dashboard at `mortisa.nekuzaky.com` stays the source of truth. A prominent button links out to it.

## Out of Scope (this round)

- Discord OAuth wiring — your real dashboard already lives at `mortisa.nekuzaky.com`, so the Lovable site stays a marketing/docs front. Say the word and I'll add OAuth + a native panel later.
- Live `/api/health` fetch — easy to add once you confirm CORS is open on `mortisia.nekuzaky.com`.
- Stripe / payments.

## Technical Notes

- Files touched: `index.html`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`, `src/pages/Index.tsx`, `src/pages/Commands.tsx` (no logic change), `src/pages/Docs.tsx`, `src/pages/Pricing.tsx` (new or rewritten), `src/data/commands.ts` (full rewrite), `src/App.tsx` (add `/dashboard` route + Pricing route if missing), `src/pages/Dashboard.tsx` (new mock).
- Asset `raven-sigil.png` reused as the Mortis sigil; hero cathedral image kept.
- Design system (`src/index.css`, `tailwind.config.ts`) untouched — gothic palette + Cinzel/UnifrakturCook/Cormorant remain.

## Open Questions

1. Discord **invite URL** for the "Invoke Mortis" button? (Until provided I'll wire it to `https://mortis.nekuzaky.com/` as a fallback.)
2. Pricing page — option (a) Free + Donation, or (b) keep Free/Premium tiers?
3. Should the new `/dashboard` route on this site be just a marketing preview that links out to `mortisa.nekuzaky.com`, or do you eventually want the real panel rebuilt here?
