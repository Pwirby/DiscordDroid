const compex = require("./commands/compex.ts");
const flipcoin = require("./commands/flipCoin.ts");
const hello = require("./commands/hello.ts");
const help = require("./commands/help.ts");
const mkmeme = require("./commands/mkMeme.ts");
const mkdemo = require("./commands/mkDemo.ts");
const mksoy = require("./commands/mkSoy.ts");
const uptime = require("./commands/upTime.ts");
const rps = require("./commands/rps.ts");

const commands = {
    compex,
    flipcoin,
    hello,
    help,
    mkmeme,
    mkdemo,
    mksoy,
    uptime,
    rock: rps,
    paper: rps,
    scissors: rps
};

module.exports = async function (msg) {
    let tokens = msg.content.split(",");
    let command = tokens.shift();
    if (command.charAt(0) === "!") {
        let fixed_command = command.substring(1).trim().toLowerCase();
        if (!(fixed_command in commands)) {
            msg.channel.send(`Sorry but "${command}" is not a valid command, type "!help" to list all available commands 🦧`);
        } else {
            commands[fixed_command](msg, tokens);
        }
    }
};
