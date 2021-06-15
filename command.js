const compex = require("./commands/compex.js")
const flipCoin = require("./commands/flipCoin.js")
const hello = require("./commands/hello.js")
const help = require("./commands/help.js")
const mkMeme = require("./commands/mkMeme.js")
const mkDemo = require("./commands/mkDemo.js")
//const upTime = require("./commands/upTime.js")
const rps = require("./commands/rps.js")

const commands = {
    compex,
    flipCoin,
    hello,
    help,
    mkMeme,
    mkDemo,
    //upTime,
    rock: rps,
    paper: rps,
    scissors: rps
}

module.exports = async function (msg) {
    var tokens = msg.content.split(",");
    let command = tokens.shift();
    if (command.charAt(0) === "!") {
        command = command.substring(1);
        if (!(command in commands)) {
            msg.channel.send(`Sorry but "!${command}" is not a valid command, type "!help" to list all available commands 🦧`);
        } else {
            commands[command](msg, tokens);
        }
    }
};
