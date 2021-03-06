import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../Command";

const salutations = [
    "Ahlan ! ๐ฆ๐ช",
    "Anyoung ! ๐ฐ๐ท",
    "Hallรฅ ! ๐ธ๐ช",
    "Hallo ! ๐ฉ๐ช",
    "Hallรธj ! ๐ฉ๐ฐ",
    "Halo ! ๐ฎ๐ฉ",
    "Hei ! ๐ณ๐ด",
    "Hey ! ๐ฌ๐ง",
    "Hoi ! ๐ณ๐ฑ",
    "Hola ! ๐ช๐ธ",
    "Konnichiwa ! ๐ฏ๐ต",
    "Nวn hวo ! ๐จ๐ณ",
    "Olรก ! ๐ต๐น",
    "Privet ! ๐ท๐บ",
    "Salut ! ๐ซ๐ท",
    "Beuchour une foรฉ ! ๐ง๐ช",
    "Salve ! ๐ฎ๐น",
    "Yassou ! ๐ฌ๐ท",
];
export const hello: Command = {
    data: new SlashCommandBuilder()
        .setName("hello")
        .setDescription("Says hello in a random language"),
    run: async (interaction) => {
        const index = Math.floor(Math.random() * salutations.length);
        interaction.reply(salutations[index]);
    }
}