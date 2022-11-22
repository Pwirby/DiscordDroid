import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../command";

const salutations = [
    "Ahlan ! 🇦🇪",
    "Anyoung ! 🇰🇷",
    "Hallå ! 🇸🇪",
    "Hallo ! 🇩🇪",
    "Halløj ! 🇩🇰",
    "Halo ! 🇮🇩",
    "Hei ! 🇳🇴",
    "Hey ! 🇬🇧",
    "Hoi ! 🇳🇱",
    "Hola ! 🇪🇸",
    "Konnichiwa ! 🇯🇵",
    "Nǐn hǎo ! 🇨🇳",
    "Olá ! 🇵🇹",
    "Privet ! 🇷🇺",
    "Salut ! 🇫🇷",
    "Beuchour une foé ! 🇧🇪",
    "Salve ! 🇮🇹",
    "Yassou ! 🇬🇷",
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