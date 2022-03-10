import { Client, Intents } from "discord.js";
import { commandHandler } from "./commandHandler";
import { token, guildId } from './config.json';

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.DIRECT_MESSAGES
    ]
});

export const startupTime = new Date();

console.log("Starting the Discord bot...");
client.on("ready", () => {
    if (client.user) {
        console.log(`🤗 Logged in as ${client.user.tag} at ${startupTime}!`);

        const guild = client.guilds.cache.get(guildId);
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
    if (!interaction.isCommand()) return;
    await commandHandler(interaction);
});

client.login(token);