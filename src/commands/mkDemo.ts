import { working, replieFail, replieSuccess } from "./replies";
import { Message, MessageEmbed } from "discord.js";
import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';

const request = require('request').defaults({ encoding: null });

export default async function (msg: Message, args: string[]) {
    // Si la commande a le bon nombre d'arguments
    if (args.length > 1 && args.length <= 3) {

        // Take the URL from < url >
        let url = args[0].slice(1, args[0].length - 1);
        // On charge l'image
        request.get(url, function (err: string, _res: any, body: Buffer) {
            if (err == null) {
                loadImage(body)
                    .then(image => {
                        // On envoi un premier message pour assurer qu'on travaille
                        let w = Math.floor(Math.random() * working.length);
                        msg.channel.send(working[w]);

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
                        context.textAlign = 'center';
                        context.textBaseline = 'middle';
                        context.fillStyle = 'white';


                        //TODO: find good fontSize ratio
                        // Writing the title
                        let text = args[1].trim().replace(/\s{2,}/g, ' ');
                        var fontSize = Math.min(totalWidth / 8, (image.width / text.length) * 2);

                        context.font = `${fontSize}px Times New Roman`;
                        context.fillText(text, totalWidth / 2, image.height + 2 * borderSize);

                        // Writing description
                        text = args[2].trim().replace(/\s{2,}/g, ' ');
                        fontSize = Math.min(totalWidth / 18, (image.width / text.length));

                        context.font = `${fontSize}px Times New Roman`;
                        context.fillText(text, totalWidth / 2, totalHeight - borderSize);

                        // Save the image before sending it
                        const buffer = canvas.toBuffer('image/png');
                        let time = new Date().toUTCString();
                        let name = `${msg.author}${time}.png`;
                        let path = `./results/${name}`;
                        fs.writeFileSync(path, buffer);

                        let index = Math.floor(Math.random() * replieSuccess.length);
                        msg.channel.send({ files: [path] })
                            .then(() => msg.channel.send(replieSuccess[index]));
                    })
                    .catch(err => {
                        let index = Math.floor(Math.random() * replieFail.length);
                        msg.channel.send(replieFail[index]);
                    });
            } else {
                let index = Math.floor(Math.random() * replieFail.length);
                msg.channel.send(`✨ ${replieFail[index]} ✨`);
            }
        });
    } else {
        msg.channel.send("Error: bad arguments for !mkDemo,<picture url>,title,description ❌");
    }

};