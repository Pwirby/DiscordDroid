import { working, replieFail, replieSuccess } from "./replies";
import { Message, MessageEmbed, MessageAttachment } from "discord.js";
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
            if (err == null && body != null) {
                //process exif here
                loadImage(body)
                    .then((image) => {
                        // On envoi un premier message pour assurer qu'on travaille
                        let w = Math.floor(Math.random() * working.length);
                        msg.channel.send(working[w]);

                        // Si on y arrive on crée un canvas 2D de la taille de l'image
                        const canvas = createCanvas(image.width, image.height);
                        const context = canvas.getContext('2d');

                        // On y met l'image
                        context.drawImage(image, 0, 0, image.width, image.height);

                        // Paramètres pour que le texte s'affiche correctement
                        context.textAlign = 'center';
                        context.fillStyle = 'white';
                        context.strokeStyle = 'black';

                        //TODO Trouver une bonne façon de calculer la taille de police
                        // On met la police de la taille du plus petit entre le quart de la hauteur ou la place que prends le texte en largeur
                        let text = args[1].trim().replace(/\s{2,}/g, ' ');
                        var fontSize = Math.min(image.height / 4, (image.width / text.length) * 2);

                        context.font = `${fontSize}px Impact`;
                        context.lineWidth = fontSize / 25;
                        context.textBaseline = 'top';

                        // On écris le texte du haut
                        context.strokeText(text, image.width / 2, 0);
                        // On dessine le contour du texte du haut
                        context.fillText(text, image.width / 2, 0);

                        if (args.length > 2) {
                            text = args[2].trim().replace(/\s{2,}/g, ' ');
                            fontSize = Math.min(image.height / 4, (image.width / text.length) * 2);

                            context.font = `${fontSize}px Impact`;
                            context.lineWidth = fontSize / 25;
                            context.textBaseline = 'bottom';

                            // On écris le texte du bas
                            context.strokeText(text, image.width / 2, image.height);
                            // On dessine le contour du texte du bas
                            context.fillText(text, image.width / 2, image.height);
                        }
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
                        msg.channel.send(`✨ ${replieFail[index]} ✨`);
                    });
            } else {
                let index = Math.floor(Math.random() * replieFail.length);
                msg.channel.send(replieFail[index]);
            }
        });
    } else {
        msg.channel.send("Error: bad arguments for !mkMeme,<picture url>,top text,bottom text ❌");
    }

};