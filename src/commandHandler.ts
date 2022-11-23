import { flipcoin } from "./commands/flipCoin.js";
import { compex } from "./commands/compex.js";
import { uptime } from "./commands/upTime.js";
import { mkmeme } from "./commands/mkMeme.js";
import { mkdemo } from "./commands/mkDemo.js";
import { mksoy } from "./commands/mkSoy.js";
import { hello } from "./commands/hello.js";
import { help } from "./commands/help.js";
import { rps } from "./commands/rps.js";
import { Command } from "./command";
import { Interaction } from "discord.js";

export const commands: Array<Command> = [
  compex,
  flipcoin,
  hello,
  help,
  uptime,
  mkdemo,
  mkmeme,
  mksoy,
  rps,
];
const allCommands = new Map<String, Command>();
commands.forEach((e) => allCommands.set(e.data.name, e));

export const commandHandler = async (interaction: Interaction) => {
  if (!interaction.isChatInputCommand()) return;
  await allCommands.get(interaction.commandName)?.run(interaction);
};
