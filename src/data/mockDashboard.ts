// Pure frontend mock data for the Sanctum dashboard. No backend.

export type GuildSummary = {
  id: string;
  name: string;
  memberCount: number;
  onlineCount: number;
  boostTier: number;
  boosts: number;
  channels: number;
  roles: number;
  region: string;
};

export const mockGuilds: GuildSummary[] = [
  { id: "111111111111111111", name: "Crypt of Mortis", memberCount: 12480, onlineCount: 1842, boostTier: 3, boosts: 42, channels: 64, roles: 38, region: "Europe" },
  { id: "222222222222222222", name: "Test Realm", memberCount: 312, onlineCount: 47, boostTier: 1, boosts: 4, channels: 18, roles: 12, region: "US-East" },
];

export type SeriesPoint = { day: string; value: number; value2?: number };

export const memberGrowth: SeriesPoint[] = [
  { day: "Mon", value: 12380, value2: 1700 },
  { day: "Tue", value: 12402, value2: 1750 },
  { day: "Wed", value: 12431, value2: 1810 },
  { day: "Thu", value: 12455, value2: 1788 },
  { day: "Fri", value: 12463, value2: 1840 },
  { day: "Sat", value: 12471, value2: 1902 },
  { day: "Sun", value: 12480, value2: 1842 },
];

export const messageActivity: SeriesPoint[] = [
  { day: "Mon", value: 4210 },
  { day: "Tue", value: 5188 },
  { day: "Wed", value: 6022 },
  { day: "Thu", value: 4877 },
  { day: "Fri", value: 7311 },
  { day: "Sat", value: 9012 },
  { day: "Sun", value: 8421 },
];

export type LeaderboardEntry = { rank: number; name: string; xp: number; level: number; avatar: string };
export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "RavenLord",      xp: 184_220, level: 87, avatar: "🦅" },
  { rank: 2, name: "Mournveil",      xp: 172_400, level: 84, avatar: "🕯️" },
  { rank: 3, name: "Asheroth",       xp: 161_980, level: 81, avatar: "🜲" },
  { rank: 4, name: "Vexharrow",      xp: 142_120, level: 76, avatar: "🜏" },
  { rank: 5, name: "Soulreaper",     xp: 128_840, level: 72, avatar: "💀" },
  { rank: 6, name: "Nightshade",     xp: 119_220, level: 69, avatar: "🌑" },
  { rank: 7, name: "Crowmancer",     xp: 102_330, level: 64, avatar: "🪶" },
  { rank: 8, name: "Hollowbrand",    xp:  88_410, level: 58, avatar: "⚜️" },
  { rank: 9, name: "Wraithling",     xp:  74_220, level: 52, avatar: "👻" },
  { rank: 10, name: "Embermaw",      xp:  61_180, level: 47, avatar: "🔥" },
];

export type ModAction = { id: string; type: "warn" | "mute" | "kick" | "ban"; target: string; moderator: string; reason: string; at: string };
export const modActions: ModAction[] = [
  { id: "a1", type: "ban",  target: "spamb0t#0001",   moderator: "RavenLord",  reason: "Mass DM advertising",        at: "2m ago" },
  { id: "a2", type: "mute", target: "loudmouth",      moderator: "Mournveil",  reason: "Excessive caps in #general", at: "14m ago" },
  { id: "a3", type: "warn", target: "newbie22",       moderator: "AutoMod",    reason: "Link blacklist match",       at: "38m ago" },
  { id: "a4", type: "kick", target: "rage_quit",      moderator: "Asheroth",   reason: "Rule 4 — toxicity",          at: "1h ago" },
  { id: "a5", type: "warn", target: "edgy_lord",      moderator: "AutoMod",    reason: "Profanity filter",           at: "2h ago" },
  { id: "a6", type: "ban",  target: "raidacct_99",    moderator: "AutoMod",    reason: "Anti-raid: account < 1d",    at: "5h ago" },
];

export type Ticket = { id: string; subject: string; opener: string; status: "open" | "pending" | "closed"; assignee?: string; opened: string };
export const tickets: Ticket[] = [
  { id: "T-2041", subject: "Custom role color request",   opener: "Nightshade",  status: "open",    assignee: "RavenLord",  opened: "12m ago" },
  { id: "T-2040", subject: "Report: harassment in DMs",   opener: "Wraithling",  status: "pending", assignee: "Mournveil",  opened: "1h ago" },
  { id: "T-2039", subject: "Booster perk not applied",    opener: "Embermaw",    status: "open",                            opened: "3h ago" },
  { id: "T-2038", subject: "Bug: leveling XP froze",      opener: "Crowmancer",  status: "closed",  assignee: "Asheroth",   opened: "yesterday" },
  { id: "T-2037", subject: "Verification not working",    opener: "Hollowbrand", status: "closed",  assignee: "RavenLord",  opened: "2d ago" },
];

export type Giveaway = { id: string; prize: string; entries: number; winners: number; endsIn: string; channel: string };
export const giveaways: Giveaway[] = [
  { id: "g1", prize: "Discord Nitro (1 month)", entries: 482, winners: 1, endsIn: "2h 14m", channel: "#giveaways" },
  { id: "g2", prize: "Custom role + color",     entries: 311, winners: 3, endsIn: "1d 4h",  channel: "#perks" },
  { id: "g3", prize: "Steam — Elden Ring",      entries: 1204, winners: 1, endsIn: "3d 9h", channel: "#gaming" },
];

export type CustomCommand = { id: string; trigger: string; response: string; uses: number; enabled: boolean };
export const customCommands: CustomCommand[] = [
  { id: "c1", trigger: "/rules",   response: "Read the codex in #rules. Break them and the crows come.", uses: 1284, enabled: true },
  { id: "c2", trigger: "/lore",    response: "Mortis was forged from candle smoke and old ink.",         uses:  942, enabled: true },
  { id: "c3", trigger: "/socials", response: "All links live in #links — tread carefully.",              uses:  611, enabled: true },
  { id: "c4", trigger: "/coffin",  response: "🪦 You have been buried. Rest well.",                      uses:  402, enabled: false },
];

export type ReactionRole = { id: string; channel: string; message: string; emoji: string; role: string };
export const reactionRoles: ReactionRole[] = [
  { id: "r1", channel: "#roles", message: "Pick your path",     emoji: "🦅", role: "Raven" },
  { id: "r2", channel: "#roles", message: "Pick your path",     emoji: "🜲", role: "Ash" },
  { id: "r3", channel: "#roles", message: "Pick your path",     emoji: "🌑", role: "Shade" },
  { id: "r4", channel: "#notifs", message: "Subscribe to pings", emoji: "📣", role: "Announcements" },
  { id: "r5", channel: "#notifs", message: "Subscribe to pings", emoji: "🎮", role: "Gaming" },
];

export type AutoModRule = { id: string; name: string; enabled: boolean; action: string; triggers: number };
export const autoModRules: AutoModRule[] = [
  { id: "m1", name: "Spam burst (5+ msgs / 3s)", enabled: true,  action: "Mute 10m", triggers: 142 },
  { id: "m2", name: "Invite link blacklist",     enabled: true,  action: "Delete + warn", triggers: 87 },
  { id: "m3", name: "Caps lock filter (>70%)",   enabled: true,  action: "Delete", triggers: 311 },
  { id: "m4", name: "Profanity (severe)",        enabled: true,  action: "Delete + warn", triggers: 64 },
  { id: "m5", name: "Anti-raid (account < 1d)",  enabled: false, action: "Kick", triggers: 12 },
  { id: "m6", name: "Mention spam (>5 pings)",   enabled: true,  action: "Mute 30m", triggers: 28 },
];

export type Memory = { id: string; key: string; value: string; updated: string };
export const memories: Memory[] = [
  { id: "k1", key: "owner",         value: "RavenLord",                          updated: "3d ago" },
  { id: "k2", key: "rules_channel", value: "#rules",                             updated: "1w ago" },
  { id: "k3", key: "tone",          value: "gothic, terse, mysterious",          updated: "2w ago" },
  { id: "k4", key: "lore_origin",   value: "Forged in the ashes of a dead realm",updated: "1mo ago" },
];

export const channelTypeBreakdown = [
  { name: "Text",     value: 38 },
  { name: "Voice",    value: 14 },
  { name: "Forum",    value:  6 },
  { name: "Stage",    value:  2 },
  { name: "Announce", value:  4 },
];

export const recentLogs = [
  { at: "just now", text: "AutoMod muted loudmouth (caps filter)" },
  { at: "2m ago",   text: "RavenLord banned spamb0t#0001" },
  { at: "11m ago",  text: "New ticket T-2041 opened by Nightshade" },
  { at: "23m ago",  text: "Giveaway g1 reached 482 entries" },
  { at: "41m ago",  text: "Reaction role granted: Raven → user 8421" },
  { at: "1h ago",   text: "Custom command /rules used 14 times" },
  { at: "2h ago",   text: "Member joined: Wraithling (welcome sent)" },
];
