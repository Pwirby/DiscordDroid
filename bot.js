console.log("Starting the Discord bot at...");

const Discord = require('discord.js');
const client = new Discord.Client();
const commandHandler = require("./command.js");
const startupTime = new Date();
require("dotenv").config();
client.login(process.env.TOKEN);

client.on("ready", () => {
    console.log(`🤗 Logged in as ${client.user.tag} at ${startupTime}!`)
});
client.on('message', commandHandler);