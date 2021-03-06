import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../Command";

export const help: Command = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("Show all commands "),
    run: async (interaction) => {
        interaction.reply({
            content:
                "Here is the list of all the commands :\n"
                + "    โข/compex   โ   create a random composition of Apex Legends ๐ฎ\n"
                + "    โข/flipCoin โ   do a coin flip ๐ช\n"
                + "    โข/help     โ   shows you all commands available and what they do (you just typed it) ๐จโ๐ซ\n"
                + "    โข/hello    โ   makes me say '*Hi*' in a random language, try it ! ๐ฌ\n"
                + "    โข/mkDemo   โ   create a Demotivation Poster from up to 3 arguments; picture URL, top text, bottom text ๐จ\n"
                + "    โข/mkMeme   โ   create a Standard Meme from up to 3 arguments; picture URL,top text, bottom text ๐ผ\n"
                + "    โข/mkSoy    โ   create a Meme with Soyjacks pointing to your picture ๐ถ\n"
                + "    โข/upTime   โ   check how long have I been up โณ\n"
                + "    โข/rock     โคผ\n"
                + "    โข/paper    โ   provoke me in a rock, paper, scissors duel! **โ/โ/โ**\n"
                + "    โข/scissors โคป",
            ephemeral: true
        }
        );
    }
}