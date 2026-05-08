// Mortis API client. Backend lives at mortisia.nekuzaky.com and owns the
// Discord OAuth flow. The frontend just redirects users to /auth/discord/login
// and reads the session via /auth/me using cookies (credentials: include).

export const API_BASE =
  (import.meta.env.VITE_MORTIS_API as string | undefined) ??
  "https://mortisia.nekuzaky.com";

export const DISCORD_CLIENT_ID = "1494081259172003990";

/**
 * Recommended permissions bitfield for Mortis.
 * Includes: view/send/manage messages, kick/ban/timeout, manage channels/roles/nicknames/webhooks/emojis,
 * view audit log, add reactions, embed links, attach files, read history, external emojis, voice mute/deafen/move.
 * Excludes Administrator (8) on purpose.
 */
export const MORTIS_PERMISSIONS = "1101659570230";

export function inviteUrl(guildId?: string) {
  const url = new URL("https://discord.com/oauth2/authorize");
  url.searchParams.set("client_id", DISCORD_CLIENT_ID);
  url.searchParams.set("scope", "bot applications.commands");
  url.searchParams.set("permissions", MORTIS_PERMISSIONS);
  if (guildId) {
    url.searchParams.set("guild_id", guildId);
    url.searchParams.set("disable_guild_select", "true");
  }
  return url.toString();
}

export type BotStats = {
  guilds: number;
  users: number;
  commands?: number;
  shards?: number;
  uptime?: number;
};

export const stats = {
  get: () => apiFetch<BotStats>("/stats"),
};

export type DiscordUser = {
  id: string;
  username: string;
  global_name?: string | null;
  avatar: string | null;
  discriminator?: string;
};

export type ManagedGuild = {
  id: string;
  name: string;
  icon: string | null;
  /** User has Manage Guild / Administrator in this guild */
  manageable: boolean;
  /** Mortis is present in this guild */
  hasMortis?: boolean;
};

export type Session = {
  user: DiscordUser;
  guilds: ManagedGuild[];
};

export async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    credentials: "include",
    headers: { Accept: "application/json", ...(init.headers ?? {}) },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`${res.status} ${res.statusText}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export const auth = {
  /** Send the user to the API which will 302 to Discord. */
  loginUrl(returnTo: string = window.location.origin + "/dashboard") {
    const url = new URL(`${API_BASE}/auth/discord/login`);
    url.searchParams.set("redirect", returnTo);
    return url.toString();
  },
  me: () => apiFetch<Session>("/auth/me"),
  logout: () => apiFetch<{ ok: true }>("/auth/logout", { method: "POST" }),
};

export function discordAvatarUrl(u: DiscordUser, size = 64) {
  if (u.avatar) {
    return `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=${size}`;
  }
  const idx = Number((BigInt(u.id) >> 22n) % 6n);
  return `https://cdn.discordapp.com/embed/avatars/${idx}.png`;
}

export function guildIconUrl(g: ManagedGuild, size = 64) {
  if (!g.icon) return null;
  return `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=${size}`;
}
