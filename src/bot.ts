import commandHandler from "./command";
import DiscordJS, { Intents } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
    ]
});

export const startupTime = new Date();

console.log("Starting the Discord bot...");
client.on("ready", () => {
    if (client.user) {
        console.log(`🤗 Logged in as ${client.user.tag} at ${startupTime}!`);
    }
});


client.on("messageCreate", commandHandler);

client.login(process.env.TOKEN);