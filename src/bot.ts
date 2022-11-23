import { Client, IntentsBitField } from "discord.js";
import json from "./config.json" assert { type: "json" };
import { commandHandler } from "./commandHandler.js";

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.DirectMessages,
  ],
});

export const startupTime = new Date();

console.log("Starting the Discord bot...");
client.on("ready", () => {
  if (client.user) {
    console.log(`🤗 Logged in as ${client.user.tag} at ${startupTime}!`);

    const guild = client.guilds.cache.get(json.guildId);
    let commands;
    if (guild) {
      commands = guild.commands;
    } else {
      commands = client.application?.commands;
    }

    commands?.create;
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  await commandHandler(interaction);
});

client.login(json.token);
