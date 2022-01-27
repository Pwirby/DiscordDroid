import { Message } from "discord.js";
import { startupTime } from "./../bot";

export default async function (msg: Message, _args: string[]) {
    let now = new Date();
    let upSince = new Date(now.getTime() - startupTime.getTime());
    let daysUp = Math.floor(upSince.getTime() / 86400000)

    let duration = (daysUp > 0) ? daysUp + "days " : "";
    duration += (upSince.getHours() - 1 > 0) ? (upSince.getHours() - 1) + "h" : "";
    duration += (upSince.getMinutes() > 0) ? upSince.getMinutes() + "m" : "";
    duration += upSince.getSeconds() + "s";

    msg.channel.send(`The last time I started up was ${startupTime}, which mean I have been up for ${duration} ⏳`);
};