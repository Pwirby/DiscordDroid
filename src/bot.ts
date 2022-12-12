import "dotenv/config";
import { Client, IntentsBitField } from "discord.js";
import { commandHandler, commands } from "./commandHandler.js";
import fs from "fs";
import path from "path";

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
client.on("ready", async () => {
  if (client.user) {
    console.log(`🤗 Logged in as ${client.user.tag} at ${startupTime}!`);

    const guild = client.guilds.cache.get(process.env.GUILD_ID!);
    let commands;
    commands = client.application?.commands;
    if (guild) {
      // commands = guild.commands;
    }

    commands?.create;
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  await commandHandler(interaction);
});

client.login(process.env.DISCORD_TOKEN!);
