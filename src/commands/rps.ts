import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../Command";

const allResults = ["rock", "paper", "scissors"];

export const rps: Command = {
    data: new SlashCommandBuilder()
        .setName("rps")
        .setDescription("Plays a game of rock paper scissor against the bot")
        .addStringOption(option => option
            .setName("choice")
            .setDescription("Rock paper or scissor")
            .setRequired(true)),
    run: async (interaction) => {
        let choice = interaction.options.getString("choice");
        if (choice && allResults.includes(choice)) {
            // Bot choose at random
            let index = Math.floor(Math.random() * allResults.length);
            // We get the string corresponding to the bot's choice
            let result = allResults[index];
            // We compare user's choice with the random choice
            if (choice === result) {
                interaction.reply(`You played ${choice}, and I played ${result} too ! That mean it's a draw 🤝`);
            } else {
                [["rock", "paper"],
                ["scissor", "rock"],
                ["paper", "scissor"]].forEach(element => {
                    if ([choice, result] == element) {
                        interaction.reply(`You played ${choice}, but guess what : I played ${result} ! I won ! 💪`);
                    }
                });
                interaction.reply(`You played ${choice}, and I played ${result} ! You won ! 🏆`);
            }
        }
    }
}

