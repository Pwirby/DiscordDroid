import { Base, BaseCommandInteraction, Client, Message } from "discord.js";
import compex from "./commands/compex";
import flipcoin from "./commands/flipCoin";
import hello from "./commands/hello";
import help from "./commands/help";
import mkmeme from "./commands/mkMeme";
import mkdemo from "./commands/mkDemo";
import mksoy from "./commands/mkSoy";
import uptime from "./commands/upTime";
import rps from "./commands/rps";

const commands: Record<string, Function> = {
    compex,
    flipcoin,
    hello,
    help,
    mkmeme,
    mkdemo,
    mksoy,
    uptime,
    rock: rps,
    paper: rps,
    scissors: rps
};

export default async function (msg: Message) {
    // Arguments are separated with ','
    let args: string[] = msg.content.split(",");
    // Command is the first argument
    let command: string | undefined = args.shift();
    if (command && command.charAt(0) === "!") {
        // Remove the '!', spaces from the command and set it to lower case
        let fixed_command: string = command.substring(1).trim().toLowerCase();
        // Check if the command received is valid
        if (!(fixed_command in commands)) {
            msg.channel.send(`Sorry but "${command}" is not a valid command, type "!help" to list all available commands 🦧`);
        } else {
            // Execute the command
            commands[fixed_command](msg, args);
        }
    }
};
