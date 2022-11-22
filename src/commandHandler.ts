import { flipcoin } from "./commands/flipCoin";
import { compex } from "./commands/compex";
import { uptime } from "./commands/upTime";
import { mkmeme } from "./commands/mkMeme";
import { mkdemo } from "./commands/mkDemo";
import { mksoy } from "./commands/mkSoy";
import { hello } from "./commands/hello";
import { help } from "./commands/help";
import { rps } from "./commands/rps";
import { Command } from "./command";
import { Interaction, ChatInputCommandInteraction } from "discord.js";


export const commands: Array<Command> = [
    compex,
    flipcoin,
    hello,
    help,
    uptime,
    mkmeme,
    mkdemo,
    mksoy,
    rps
];

export const commandHandler = async (interaction: Interaction) => {
    if (interaction.isChatInputCommand()) {
        
        for (const Command of commands) {
            if (interaction.commandName === Command.data.name) {
                await Command.run(interaction);
                break;
            }
        }
    }
};