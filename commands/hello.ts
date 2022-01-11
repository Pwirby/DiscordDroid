const salutations = [
    "Ahlan ! 🇦🇪",
    "Anyoung ! 🇰🇷",
    "Salut ! 🇫🇷",
    "Hallå ! 🇸🇪",
    "Hallo ! 🇩🇪",
    "Halløj ! 🇩🇰",
    "Halo ! 🇮🇩",
    "Hei ! 🇳🇴",
    "Hey ! 🇬🇧",
    "Hoi ! 🇳🇱",
    "Hola ! 🇪🇸",
    "Konnichiwa ! 🇯🇵",
    "Nǐn hǎo ! 🇨🇳",
    "Olá ! 🇵🇹",
    "Privet ! 🇷🇺",
    "Salve ! 🇮🇹",
    "Yassou ! 🇬🇷",
];

module.exports = function (msg, args) {
    const index = Math.floor(Math.random() * salutations.length);
    msg.channel.send(salutations[index]);
};