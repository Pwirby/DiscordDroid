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
                loadImage(body).then((image) => {
                    // Si on y arrive on crée un canvas 2D de la taille de l'image
                    var borderSize = image.width / 9;
                    var totalHeight = image.height + borderSize * 4;
                    var totalWidth = image.width + 2 * borderSize;

                    const canvas = createCanvas(totalWidth, totalHeight);
                    const context = canvas.getContext('2d');
                    context.fillStyle = 'black';
                    context.fillRect(0, 0, totalWidth, totalHeight);

                    context.strokeStyle = 'white';
                    context.lineWidth = 6;
                    context.strokeRect(borderSize, borderSize, image.width, image.height);

                    context.drawImage(image, borderSize, borderSize, image.width, image.height);
                    //TODO: find good sontSize ratio
                    // Writing the title
                    var fontSize = Math.min(totalWidth / 8, (image.width / args[1].length) * 2);

                    context.font = `${fontSize}px Times New Roman`;
                    context.textAlign = 'center';
                    context.textBaseline = 'middle';
                    context.fillStyle = 'white';
                    context.fillText(args[1], totalWidth / 2, image.height + 2 * borderSize);

                    // Writing description
                    fontSize = Math.min(totalWidth / 18, (image.width / args[1].length));
                    context.font = `${fontSize}px Times New Roman`;
                    context.fillText(args[2], totalWidth / 2, totalHeight - borderSize);

                    // Save the image before sending it
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
        msg.channel.send("Error: bad arguments for !mkDemo(,<picture url>,title,description) ❌");
    }

};