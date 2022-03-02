import { Message } from "discord.js";

const allResults = ["rock", "paper", "scissors"];

export default function (msg: Message, args: string[], command: string) {
    if (allResults.includes(command)) {
        // Bot choose at random
        let index = Math.floor(Math.random() * allResults.length);
        // We get the string corresponding to the bot's choice
        let result = allResults[index];
        // We compare user's choice with the random choice
        if (command === result) {
            msg.channel.send(`You played ${command}, and I played ${result} too ! That mean it's a draw 🤝`);
        } else {
            [["rock", "paper"],
            ["scissor", "rock"],
            ["paper", "scissor"]].forEach(element => {
                if ([command, result] == element) {
                    msg.channel.send(`You played ${command}, but guess what : I played ${result} ! I won ! 💪`);
                }
            });
            msg.channel.send(`You played ${command}, and I played ${result} ! You won ! 🏆`);
        }
    }
};

