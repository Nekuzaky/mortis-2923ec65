// Mortis API client. Backend lives at mortisia.nekuzaky.com and owns the
// Discord OAuth flow. The frontend just redirects users to /auth/discord/login
// and reads the session via /auth/me using cookies (credentials: include).

export const API_BASE =
  (import.meta.env.VITE_MORTIS_API as string | undefined) ??
  "https://mortisia.nekuzaky.com";

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
