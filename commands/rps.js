const allResults = ["rock", "paper", "scissors"]

module.exports = function (msg, _args) {
    let tokens = msg.content.split(" ");
    let command = tokens[0].substring(1);
    if (allResults.includes(command)) {
        let index = Math.floor(Math.random() * allResults.length);
        let result = allResults[index];
        let diff = allResults.indexOf(command) - allResults.indexOf(result);
        if (diff == 0) {
            msg.channel.send(`You played ${command}, and I played ${result} too ! That mean it's a draw 🤝`);
        }
        else if (diff == 1 || diff == -2) {
            msg.channel.send(`You played ${command}, and I played ${result} ! You won ! 🏆`);
        }
        else {
            msg.channel.send(`You played ${command}, but guess what : I played ${result} ! I won ! 💪`);
        }
    } else {
        msg.channel.send(`Last time I checked ${command} was not part of rock paper scissors 🤔`)
    }
};