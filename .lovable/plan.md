# Ravencroft — Gothic Discord Bot Website

A dark, gothic-aesthetic website for your Discord bot, with a marketing site, commands directory, documentation, pricing, and a real Discord-authenticated dashboard.

> Placeholder bot identity used throughout: **Ravencroft** — "A dark guardian for your realm." You can rename it and rewrite copy/commands anytime after the build.

## Visual Design

Full gothic aesthetic:
- **Palette:** ink black background, candle-gold accents, blood crimson highlights, parchment off-white text, deep violet shadows
- **Typography:** blackletter/gothic display font (Cinzel or UnifrakturCook) for headings; serif body (Cormorant Garamond) for readability
- **Atmosphere:** subtle vignette, faint candle-flicker glow, ornamental dividers, drop caps, arched cards, weathered textures, raven/moon/cathedral motifs
- **Motion:** slow fades, ember particles in the hero, gentle parallax — never bouncy or playful

## Pages & Structure

```text
/                  Landing (hero, features, stats, CTA)
/commands          Searchable command grid with categories
/docs              Setup guides, FAQ, tutorials
/pricing           Free vs Premium tiers
/login             Discord OAuth entry
/dashboard         Server picker + per-server settings (auth-gated)
```

Persistent gothic navbar (logo, links, "Invite", "Login with Discord") and a footer with Discord/GitHub links.

### Landing
Hero with bot name, tagline, "Invite to Discord" + "Open Dashboard" buttons, ember particles. Feature grid (Moderation, Auto-Mod, Logging, Custom Commands, Welcome Gates, Reaction Roles). Animated stats (servers/users/commands ran). Testimonials styled as illuminated manuscript quotes. Final CTA.

### Commands
Search bar + category filter (Moderation, Utility, Fun, Config, Premium). Each command card shows name, syntax, description, required permissions, premium lock if applicable.

### Docs
Sidebar nav: Getting Started, Permissions, Auto-Mod Setup, Logging, Custom Commands, Premium Features, FAQ, Troubleshooting. Markdown-style content with code blocks and callouts.

### Pricing
Two tiers side-by-side:
- **Free** — core moderation, basic auto-mod, 5 custom commands, community support
- **Premium ($4.99/mo)** — unlimited custom commands, advanced auto-mod, full audit logs, music, priority support, premium badge

"Pricing display only" — Stripe checkout can be wired up later.

### Dashboard (authenticated)
- Server picker grid (only servers where the user has Manage Server permission and the bot is present; servers without the bot show an "Invite" button)
- Per-server settings tabs: General, Moderation, Auto-Mod, Welcome, Logging, Custom Commands, Premium
- Settings persist to the database; "Save" / "Reset" controls per tab

## Authentication — Real Discord OAuth

Lovable Cloud's built-in auth does **not** support Discord. To get real Discord login, we'll use Lovable Cloud (Supabase under the hood) and enable Discord as a provider in the Supabase dashboard. After Cloud is enabled I'll give you exact step-by-step instructions:

1. Create a Discord Application at discord.com/developers
2. Add OAuth redirect URL (I'll give you the exact URL)
3. Copy Client ID + Client Secret into Supabase Auth → Providers → Discord
4. Set scopes: `identify`, `email`, `guilds`

The site code calls `signInWithOAuth({ provider: 'discord' })` and stores the Discord access token to fetch the user's guilds for the server picker.

## Data Model (Lovable Cloud)

```text
profiles            id (= auth.users.id), discord_id, username, avatar, created_at
user_roles          id, user_id, role (enum: admin, user)   -- separate table, RLS-safe
guild_settings      id, guild_id, owner_user_id, prefix, language, premium, updated_at
automod_rules       id, guild_id, type, enabled, config (jsonb)
custom_commands     id, guild_id, trigger, response, enabled
welcome_config      id, guild_id, channel_id, message, enabled
log_config          id, guild_id, channel_id, events (jsonb)
```

RLS on every table; users can only read/write settings for guilds they administer. Roles use the `has_role()` security-definer pattern.

## What's In Scope vs Out of Scope

**In scope (this build):**
- All five pages with full gothic design and content
- Discord OAuth login + protected dashboard
- Database schema + RLS for all settings tables
- Working settings forms that save to the database
- Server picker driven by the user's actual Discord guilds

**Out of scope (later, on request):**
- The actual Discord bot process (this is the website + control panel; the bot runtime that reads `guild_settings` and acts in Discord is a separate Node/Python service you'd host elsewhere)
- Stripe checkout for Premium (pricing page is display-only)
- Bot statistics fed from a real bot (stats will be placeholder numbers until the bot reports them)

## Build Order

1. Design system: gothic colors, fonts, tokens in `index.css` + `tailwind.config.ts`
2. Shared layout: navbar, footer, ember-particle background
3. Landing page
4. Commands page (data-driven from a local commands file you can edit)
5. Docs page with sidebar
6. Pricing page
7. Enable Lovable Cloud
8. Database schema + RLS migration
9. Auth pages + Discord OAuth wiring (with setup instructions for you)
10. Dashboard: server picker + settings tabs
11. Polish, mobile responsiveness, 404 page

After approval I'll start with steps 1–6 (the full public site), then guide you through the Discord developer portal setup before wiring auth.

