import { Interaction } from "discord.js";
import { mkmeme } from "./commands/mkMeme";
import { mkdemo } from "./commands/mkDemo";
import { mksoy } from "./commands/mkSoy";
import { Command } from "./Command";
import { help } from "./commands/help";
import { flipcoin } from "./commands/flipCoin";
import { hello } from "./commands/hello";
import { uptime } from "./commands/upTime";
import { robinbarbes } from "./commands/robinbarbes";
import { rps } from "./commands/rps";
import { compex } from "./commands/compex";


export const commands: Array<Command> = [
    compex,
    flipcoin,
    hello,
    help,
    uptime,
    mkmeme,
    mkdemo,
    mksoy,
    robinbarbes,
    rps
];

export const commandHandler = async (interaction: Interaction) => {
    if (interaction.isCommand()) {
        for (const Command of commands) {
            if (interaction.commandName === Command.data.name) {
                await Command.run(interaction);
                break;
            }
        }
    }
};