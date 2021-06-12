module.exports = async function (msg, _args) {
    let upSince = startupTime - Date();
    msg.channel.send(`The last time I started up was ${startupTime}, which mean I have been up for ${upSince} ⏳`)
};