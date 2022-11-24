import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../command";

const allResults = ["rock", "paper", "scissors"];

export const rps: Command = {
  data: new SlashCommandBuilder()
    .setName("rps")
    .setDescription("Plays a game of rock paper scissor against the bot")
    .addStringOption((option) =>
      option
        .setName("choice")
        .setDescription("Rock paper or scissor")
        .setRequired(true)
    ),
  run: async (interaction) => {
    let answered = false;
    let choice = interaction.options.getString("choice", true).toLowerCase();

    if (choice && allResults.includes(choice)) {
      // Bot choose at random
      let index = Math.floor(Math.random() * allResults.length);
      // We get the string corresponding to the bot's choice
      let result = allResults[index];
      // We compare user's choice with the random choice
      [
        ["rock", "paper"],
        ["scissor", "rock"],
        ["paper", "scissor"],
      ].forEach((element) => {
        if (element[0] === choice && element[1] === result && !answered) {
          interaction.reply(
            `You played ${choice}, but guess what : I played ${result} ! I won ! 💪`
          );
          answered = true;
        }
      });
      if (choice === result && !answered) {
        interaction.reply(
          `You played ${choice}, and I played ${result} too ! That mean it's a draw 🤝`
        );
        answered = true;
      } else if (!answered) {
        interaction.reply(
          `You played ${choice}, and I played ${result} ! You won ! 🏆`
        );
        answered = true;
      }
    } else {
      interaction.reply({
        content: `You can only choose between rock, paper & scissor !`,
        ephemeral: true,
      });
    }
  },
};
