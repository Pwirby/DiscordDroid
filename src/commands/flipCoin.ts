import { Message } from "discord.js";

const result = ["tail ! 🪙", "head ! 🗿"];
const verb1 = ["flip", "toss", "throw"];
const verb2 = ["lands", "falls", "rests"];

export default function (msg: Message, _args: string) {
    const res = Math.floor(Math.random() * result.length);
    const r1 = Math.floor(Math.random() * verb1.length);
    const r2 = Math.floor(Math.random() * verb2.length);
    msg.channel.send(`You ${verb1[r1]} a coin, and it ${verb2[r2]} on... ${result[res]}`);
};