import { Message } from "discord.js";

const allResults = ["rock", "paper", "scissors"];

export default function (msg: Message, _args: string[]) {
    let tokens = msg.content.split(" ");
    let command = tokens[0].substring(1);
    if (allResults.includes(command)) {
        // Bot choose at random
        let index = Math.floor(Math.random() * allResults.length);
        // We get the string corresponding to the bot's choice
        let result = allResults[index];
        // We compare user's choice with the random choice
        let diff = allResults.indexOf(command) - index;
        switch (diff) {
            case 0:
                // Both have the same index, they are the same
                msg.channel.send(`You played ${command}, and I played ${result} too ! That mean it's a draw 🤝`);
                break;

            case 1:
            case -2:
                msg.channel.send(`You played ${command}, and I played ${result} ! You won ! 🏆`);
                break;

            default:
                msg.channel.send(`You played ${command}, but guess what : I played ${result} ! I won ! 💪`);
                break;
        }
    }
};