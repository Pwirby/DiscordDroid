import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../Command";

const result = ["tail ! 🪙", "head ! 🗿"];
const verb1 = ["flip", "toss", "throw"];
const verb2 = ["lands", "falls", "rests"];

export const flipcoin: Command = {
    data: new SlashCommandBuilder()
        .setName("flipcoin")
        .setDescription("Flip a coin"),
    run: async (interaction) => {
        const res = Math.floor(Math.random() * result.length);
        const r1 = Math.floor(Math.random() * verb1.length);
        const r2 = Math.floor(Math.random() * verb2.length);
        interaction.reply(`You ${verb1[r1]} a coin, and it ${verb2[r2]} on... ${result[res]}`);
    }
}