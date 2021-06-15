const fs = require('fs');
const request = require('request').defaults({ encoding: null });
const { createCanvas, loadImage } = require('canvas');

const working = [
    "Give me a second, I'm on it 🥵",
    "Awesome, I'm almost there 👨‍🎨"
];

const replieFail = [
    "Sorry, there was an issue loading the picture, are you sure that <URL> is valid ? 😰",
    "Something went wrong, I could not get that picture, are you sure that <URL> is valid ? 😖",
    "Oopsie, I did not manage to grab that picture, are you sure that <URL> is valid ? 🤥"
];

const replieSuccess = [
    "Hot from the CPU ! 🥧",
    "The icing on the JPEG ! 🍰"
];

module.exports = async function (msg, args) {
    // Si la commande a le bon nombre d'arguments
    if (args.length > 1 && args.length <= 3) {
        // Take the URL from < url >
        let url = args[0].slice(1, args[0].length);
        // On charge l'image
        request.get(url, function (err, _res, body) {
            if (err == null) {
                //process exif here
                loadImage(body).then((image) => {
                    // Si on y arrive on crée un canvas 2D de la taille de l'image
                    const canvas = createCanvas(image.width, image.height);
                    const context = canvas.getContext('2d');
                    // On y met l'image
                    context.drawImage(image, 0, 0, image.width, image.height);
                    // On met la police de la taille du plus petit entre le quart de la hauteur ou la place que prends le texte en largeur
                    var fontSize = Math.min(image.height / 4, (image.width / args[1].length) * 2);

                    context.font = `${fontSize}px Impact`;
                    context.textAlign = 'center';

                    context.textBaseline = 'top';
                    context.fillStyle = 'white';

                    context.strokeStyle = 'black';
                    context.lineWidth = fontSize / 25;

                    context.strokeText(args[1], image.width / 2, 0);
                    context.fillText(args[1], image.width / 2, 0);

                    if (args.length > 2) {
                        fontSize = Math.min(image.height / 4, (image.width / args[2].length) * 2);

                        context.font = `${fontSize}px Impact`;
                        context.textBaseline = 'bottom';
                        context.lineWidth = fontSize / 25;

                        context.strokeText(args[2], image.width / 2, image.height);
                        context.fillText(args[2], image.width / 2, image.height);
                    }
                    const buffer = canvas.toBuffer('image/png');
                    fs.writeFileSync('./image.png', buffer);
                    let w = Math.floor(Math.random() * working.length);
                    msg.channel.send(working[w]);
                    let index = Math.floor(Math.random() * replieSuccess.length);
                    msg.channel.send(`✨ ${replieSuccess[index]} ✨`, { files: ["./image.png"] });
                },
                    // Si on arrive pas a la charger on envoie un message d'erreur
                    (reason) => {
                        msg.channel.send(reason);
                    })
            }
            else {
                let index = Math.floor(Math.random() * replieFail.length);
                msg.channel.send(replieFail[index]);
            }
        });
    } else {
        msg.channel.send("Error: bad arguments for !mkMeme(,<picture url>,top text,bottom text) ❌");
    }

};