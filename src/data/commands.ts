export type CommandCategory = "Moderation" | "Auto-Mod" | "Utility" | "Fun" | "Config" | "Premium";

export interface BotCommand {
  name: string;
  syntax: string;
  description: string;
  category: CommandCategory;
  permission?: string;
  premium?: boolean;
}

export const commands: BotCommand[] = [
  // Moderation
  { name: "/ban", syntax: "/ban <user> [reason] [days]", description: "Banish a soul from your realm. Optionally purge their messages from the past days.", category: "Moderation", permission: "Ban Members" },
  { name: "/kick", syntax: "/kick <user> [reason]", description: "Cast a member from the hall. They may return only if invited.", category: "Moderation", permission: "Kick Members" },
  { name: "/mute", syntax: "/mute <user> <duration> [reason]", description: "Silence a tongue for a chosen span — minutes, hours, or days.", category: "Moderation", permission: "Moderate Members" },
  { name: "/warn", syntax: "/warn <user> <reason>", description: "Mark a transgression upon a member's record. Three warnings invoke the rite.", category: "Moderation", permission: "Moderate Members" },
  { name: "/purge", syntax: "/purge <count> [user]", description: "Erase up to 100 messages, optionally only from one author.", category: "Moderation", permission: "Manage Messages" },
  { name: "/lockdown", syntax: "/lockdown [channel]", description: "Seal a channel against all but the priesthood.", category: "Moderation", permission: "Manage Channels" },
  { name: "/unban", syntax: "/unban <user_id>", description: "Lift a banishment and restore a wandering soul.", category: "Moderation", permission: "Ban Members" },
  { name: "/case", syntax: "/case <id>", description: "Recall a moderation record by its case number.", category: "Moderation", permission: "Moderate Members" },

  // Auto-Mod
  { name: "/automod toggle", syntax: "/automod toggle <rule>", description: "Enable or disable an automod ward — spam, invites, mentions, caps, links.", category: "Auto-Mod", permission: "Manage Server" },
  { name: "/automod filter", syntax: "/automod filter <add|remove> <word>", description: "Curate the list of forbidden words spoken in your halls.", category: "Auto-Mod", permission: "Manage Server" },
  { name: "/automod raid", syntax: "/automod raid <on|off>", description: "Erect a ward against sudden join-floods and bot raids.", category: "Auto-Mod", permission: "Manage Server", premium: true },
  { name: "/automod sentinel", syntax: "/automod sentinel", description: "Summon AI-powered toxicity detection that learns your realm's tongue.", category: "Auto-Mod", permission: "Manage Server", premium: true },

  // Utility
  { name: "/userinfo", syntax: "/userinfo [user]", description: "Reveal the lineage and sigils of a member.", category: "Utility" },
  { name: "/serverinfo", syntax: "/serverinfo", description: "Display the chronicle of your realm — members, channels, founding date.", category: "Utility" },
  { name: "/avatar", syntax: "/avatar [user]", description: "Display a member's portrait in full size.", category: "Utility" },
  { name: "/poll", syntax: "/poll <question> <options...>", description: "Convene the council and call a vote.", category: "Utility" },
  { name: "/remindme", syntax: "/remindme <duration> <message>", description: "Bind a reminder to your soul. The raven shall return.", category: "Utility" },

  // Fun
  { name: "/fortune", syntax: "/fortune", description: "Read the runes. Receive a gothic prophecy of the day.", category: "Fun" },
  { name: "/8ball", syntax: "/8ball <question>", description: "Consult the obsidian orb. Eight answers, none kind.", category: "Fun" },
  { name: "/raven", syntax: "/raven", description: "Send a raven with a curious morsel of macabre lore.", category: "Fun" },
  { name: "/duel", syntax: "/duel <user>", description: "Challenge a soul to a duel of wits and blades.", category: "Fun" },

  // Config
  { name: "/config prefix", syntax: "/config prefix <symbol>", description: "Choose the legacy prefix for classic commands.", category: "Config", permission: "Manage Server" },
  { name: "/config welcome", syntax: "/config welcome <channel> <message>", description: "Set the rites of welcoming for new arrivals.", category: "Config", permission: "Manage Server" },
  { name: "/config logs", syntax: "/config logs <channel> <events>", description: "Bind a chronicler-channel to record all that passes.", category: "Config", permission: "Manage Server" },
  { name: "/config roles", syntax: "/config roles", description: "Open the rite of reaction roles in the dashboard.", category: "Config", permission: "Manage Server" },

  // Premium
  { name: "/play", syntax: "/play <song or url>", description: "Summon haunting melodies into a voice channel.", category: "Premium", premium: true },
  { name: "/queue", syntax: "/queue", description: "Inspect the procession of songs to come.", category: "Premium", premium: true },
  { name: "/transcribe", syntax: "/transcribe <message>", description: "Translate voice messages into written verse.", category: "Premium", premium: true },
  { name: "/customcmd", syntax: "/customcmd <add|remove|list>", description: "Forge custom incantations unique to your realm. Premium grants unlimited.", category: "Premium", premium: true },
];

export const categories: CommandCategory[] = ["Moderation", "Auto-Mod", "Utility", "Fun", "Config", "Premium"];
