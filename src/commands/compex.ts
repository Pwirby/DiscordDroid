import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../Command";

const players = {
    "@Baradoz#0444": [
        "Bangalore 💨",
        "Bloodhound 🦅",
        "Gibraltar 🛡",
        "Lifeline 💉",
        "Pathfinder ⚓",
        "Rampart 💩",
        "Wraith 🕳",

    ],
    "@Pwirby#3948": [
        "Bangalore 💨",
        "Bloodhound 🦅",
        "Caustic ☣",
        "Crypto 🚁",
        "Gibraltar 🛡",
        "Lifeline 💉",
        "Loba 💰",
        "Pathfinder ⚓",
        "Wattson 🚧",
        "Wraith 🕳",
    ]

    ,
    "@Cyriac#6378": [
        "Bangalore 💨",
        "Bloodhound 🦅",
        "Caustic ☣",
        "Crypto 🚁",
        "Gibraltar 🛡",
        "Lifeline 💉",
        "Mirage 👨‍👨‍👦‍👦",
        "Octane 🏃‍♂️",
        "Pathfinder ⚓",
        "Revenant ⚰",
        "Valkyrie 🚀",
        "Wraith 🕳",
    ]
}
let characters = [
    "Bangalore 💨",
    "Bloodhound 🦅",
    "Caustic ☣",
    "Crypto 🚁",
    "Fuse 🧨",
    "Gibraltar 🛡",
    "Horizon 👩‍🚀",
    "Lifeline 💉",
    "Loba 💰",
    "Mirage 👨‍👨‍👦‍👦",
    "Octane 🏃‍♂️",
    "Pathfinder ⚓",
    "Rampart 💩",
    "Revenant ⚰",
    "Valkyrie 🚀",
    "Wattson 🚧",
    "Wraith 🕳",
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
            interaction.reply("Error: missing an argument for the number of player !compex,number ❌");
        }
    }
}