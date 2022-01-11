console.log("Starting the Discord bot...");

require("dotenv").config();
const Discord = require('discord.js');
const client = new Discord.Client();
const commandHandler = require("./command.ts");
client.login(process.env.TOKEN);

globalThis.startupTime = new Date();

client.on("ready", () => {
    console.log(`🤗 Logged in as ${client.user.tag} at ${global.startupTime}!`);
});
client.on('message', commandHandler);