export type CommandCategory =
  | "Memory"
  | "Leveling"
  | "Moderation"
  | "Configuration"
  | "Tickets"
  | "Giveaways"
  | "Reaction Roles"
  | "Server Setup"
  | "Generators"
  | "Misc";

export interface BotCommand {
  name: string;
  syntax: string;
  description: string;
  category: CommandCategory;
  permission?: string;
  premium?: boolean;
}

export const commands: BotCommand[] = [
  // Memory
  { name: "/remember", syntax: "/remember content:…", description: "Teach Mortis a personal fact about yourself.", category: "Memory" },
  { name: "/memory", syntax: "/memory", description: "Show all your memories.", category: "Memory" },
  { name: "/forget", syntax: "/forget number:N", description: "Delete a specific memory by its number.", category: "Memory" },
  { name: "/remember-server", syntax: "/remember-server content:…", description: "Add a server-wide fact Mortis will remember for everyone.", category: "Memory", permission: "Manage Server" },

  // Leveling
  { name: "/rank", syntax: "/rank [user]", description: "Show XP, level and rank for yourself or another member.", category: "Leveling" },
  { name: "/leaderboard", syntax: "/leaderboard", description: "Display the top 10 members of the server.", category: "Leveling" },
  { name: "/levelrole add", syntax: "/levelrole add level:N role:…", description: "Auto-assign a role when a member reaches a chosen level.", category: "Leveling", permission: "Manage Roles" },

  // Moderation
  { name: "/warn", syntax: "/warn user reason", description: "Issue a warning to a member, recorded in the audit trail.", category: "Moderation", permission: "Moderate Members" },
  { name: "/kick", syntax: "/kick user [reason]", description: "Kick a member from the server.", category: "Moderation", permission: "Kick Members" },
  { name: "/ban", syntax: "/ban user [reason]", description: "Ban a member from the server.", category: "Moderation", permission: "Ban Members" },
  { name: "/unban", syntax: "/unban user_id", description: "Lift a ban and let the member return.", category: "Moderation", permission: "Ban Members" },
  { name: "/timeout", syntax: "/timeout user duration [reason]", description: "Temporarily mute a member.", category: "Moderation", permission: "Moderate Members" },
  { name: "/purge", syntax: "/purge amount:N", description: "Delete the last N messages in the channel.", category: "Moderation", permission: "Manage Messages" },
  { name: "/lock", syntax: "/lock", description: "Lock the current channel.", category: "Moderation", permission: "Manage Channels" },
  { name: "/unlock", syntax: "/unlock", description: "Unlock the current channel.", category: "Moderation", permission: "Manage Channels" },

  // Configuration
  { name: "/config", syntax: "/config", description: "View the current server configuration.", category: "Configuration", permission: "Manage Server" },
  { name: "/setwelcome", syntax: "/setwelcome channel:…", description: "Set the channel for welcome messages.", category: "Configuration", permission: "Manage Server" },
  { name: "/setmodlog", syntax: "/setmodlog channel:…", description: "Set the channel for moderation logs.", category: "Configuration", permission: "Manage Server" },
  { name: "/autorole add", syntax: "/autorole add role:…", description: "Auto-assign a role to every new member on join.", category: "Configuration", permission: "Manage Roles" },

  // Tickets
  { name: "/ticket", syntax: "/ticket", description: "Open a private support ticket.", category: "Tickets" },

  // Giveaways
  { name: "/giveaway start", syntax: "/giveaway start prize duration", description: "Start a giveaway with a prize and duration.", category: "Giveaways", permission: "Manage Server" },

  // Reaction Roles
  { name: "/reactionrole add", syntax: "/reactionrole add msg emoji role", description: "Bind a reaction emoji on a message to a self-assignable role.", category: "Reaction Roles", permission: "Manage Roles" },

  // Server Setup
  { name: "/setup", syntax: "/setup preset:…", description: "Generate a full server from a preset (minimal / community / gaming / dev). Existing same-name items are skipped.", category: "Server Setup", permission: "Administrator" },
  { name: "/setup-preview", syntax: "/setup-preview preset:…", description: "Preview a preset without modifying the server. Always run this first.", category: "Server Setup", permission: "Administrator" },

  // Generators
  { name: "/table", syntax: "/table title columns rows", description: "Generate a formatted Markdown-style data table.", category: "Generators" },
  { name: "/todo", syntax: "/todo title items", description: "Create an interactive todo list with checkboxes.", category: "Generators" },
  { name: "/poll", syntax: "/poll question options", description: "Run a poll with reaction-based voting.", category: "Generators" },

  // Misc
  { name: "/afk", syntax: "/afk reason", description: "Mark yourself as AFK with a reason.", category: "Misc" },
  { name: "/userinfo", syntax: "/userinfo [user]", description: "Show Discord metadata about a member.", category: "Misc" },
  { name: "/serverinfo", syntax: "/serverinfo", description: "Show Discord metadata about the server.", category: "Misc" },
  { name: "/status", syntax: "/status", description: "Display Mortis's health and uptime.", category: "Misc" },
  { name: "/help", syntax: "/help", description: "Open the full command reference.", category: "Misc" },
];

export const categories: CommandCategory[] = [
  "Memory",
  "Leveling",
  "Moderation",
  "Configuration",
  "Tickets",
  "Giveaways",
  "Reaction Roles",
  "Server Setup",
  "Generators",
  "Misc",
];
