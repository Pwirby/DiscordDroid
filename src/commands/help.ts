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
                + "    •/compex   →   create a random composition of Apex Legends 🔮\n"
                + "    •/flipCoin →   do a coin flip 🪙\n"
                + "    •/help     →   shows you all commands available and what they do (you just typed it) 👨‍🏫\n"
                + "    •/hello    →   makes me say '*Hi*' in a random language, try it ! 💬\n"
                + "    •/mkDemo   →   create a Demotivation Poster from up to 3 arguments; picture URL, top text, bottom text 🎨\n"
                + "    •/mkMeme   →   create a Standard Meme from up to 3 arguments; picture URL,top text, bottom text 🖼\n"
                + "    •/mkSoy    →   create a Meme with Soyjacks pointing to your picture 🍶\n"
                + "    •/upTime   →   check how long have I been up ⏳\n"
                + "    •/rock     ⤼\n"
                + "    •/paper    →   provoke me in a rock, paper, scissors duel! **✊/✋/✌**\n"
                + "    •/scissors ⤻",
            ephemeral: true
        }
        );
    }
}