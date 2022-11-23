import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../command";
import { startupTime } from "./../bot.js";

export const uptime: Command = {
    data: new SlashCommandBuilder()
        .setName("uptime")
        .setDescription("Check since when the bot has been up"),
    run: async (interaction) => {
        let now = new Date();
        let upSince = new Date(now.getTime() - startupTime.getTime());
        let daysUp = Math.floor(upSince.getTime() / 86400000)

        let duration = (daysUp > 0) ? daysUp + "days " : "";
        duration += (upSince.getHours() - 1 > 0) ? (upSince.getHours() - 1) + "h" : "";
        duration += (upSince.getMinutes() > 0) ? upSince.getMinutes() + "m" : "";
        duration += upSince.getSeconds() + "s";

        interaction.reply(`The last time I started up was ${startupTime}, which mean I have been up for ${duration} ⏳`);
    }
}