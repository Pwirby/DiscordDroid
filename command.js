const compex = require("./commands/compex.js")
const flipCoin = require("./commands/flipCoin.js")
const hello = require("./commands/hello.js")
const help = require("./commands/help.js")
const mkMeme = require("./commands/mkMeme.js")
//const upTime = require("./commands/upTime.js")
const rps = require("./commands/rps.js")

const commands = {
    compex,
    flipCoin,
    hello,
    help,
    mkMeme,
    //upTime,
    rock: rps,
    paper: rps,
    scissors: rps
}

module.exports = async function (msg) {
    let tokens = msg.content.split(",");
    let command = tokens.shift();
    if (command.charAt(0) === "!") {
        command = command.substring(1);
        commands[command](msg, tokens);
    }
};
