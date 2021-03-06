import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../Command";

const players = {
    "@Baradoz#0444": [
        "Bangalore ๐จ",
        "Bloodhound ๐ฆ",
        "Gibraltar ๐ก",
        "Lifeline ๐",
        "Pathfinder โ",
        "Rampart ๐ฉ",
        "Wraith ๐ณ",

    ],
    "@Pwirby#3948": [
        "Bangalore ๐จ",
        "Bloodhound ๐ฆ",
        "Caustic โฃ",
        "Crypto ๐",
        "Gibraltar ๐ก",
        "Lifeline ๐",
        "Loba ๐ฐ",
        "Pathfinder โ",
        "Wattson ๐ง",
        "Wraith ๐ณ",
    ]

    ,
    "@Cyriac#6378": [
        "Bangalore ๐จ",
        "Bloodhound ๐ฆ",
        "Caustic โฃ",
        "Crypto ๐",
        "Gibraltar ๐ก",
        "Lifeline ๐",
        "Mirage ๐จโ๐จโ๐ฆโ๐ฆ",
        "Octane ๐โโ๏ธ",
        "Pathfinder โ",
        "Revenant โฐ",
        "Valkyrie ๐",
        "Wraith ๐ณ",
    ]
}
let characters = [
    "Bangalore ๐จ",
    "Bloodhound ๐ฆ",
    "Caustic โฃ",
    "Crypto ๐",
    "Fuse ๐งจ",
    "Gibraltar ๐ก",
    "Horizon ๐ฉโ๐",
    "Lifeline ๐",
    "Loba ๐ฐ",
    "Mirage ๐จโ๐จโ๐ฆโ๐ฆ",
    "Octane ๐โโ๏ธ",
    "Pathfinder โ",
    "Rampart ๐ฉ",
    "Revenant โฐ",
    "Valkyrie ๐",
    "Wattson ๐ง",
    "Wraith ๐ณ",
];

export const compex: Command = {
    data: new SlashCommandBuilder()
        .setName("compex")
        .setDescription("Create a random composition of Apex legends")
        .addNumberOption(option => option
            .setName("players")
            .setDescription("The number of players in the game")
            .setRequired(true)),
    run: async (interaction) => {
        let compo = [];
        let nb = interaction.options.getNumber("players");
        if (nb && nb <= 3) {
            for (; nb > 0; nb--) {
                let rand = Math.floor(Math.random() * characters.length);
                compo.push(characters.splice(rand, 1));
            }
            let replie = "The composition will be made of : ";
            for (let character of compo) {
                replie += character + ", ";
            }
            replie += "good luck !";
            interaction.reply(replie);
        } else {
            interaction.reply("Error: missing an argument for the number of player !compex,number โ");
        }
    }
}