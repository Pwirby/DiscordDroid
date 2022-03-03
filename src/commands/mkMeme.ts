import { working, failed, success, replie } from "./replies";
import { createCanvas, loadImage } from 'canvas';
import { Message } from 'discord.js';
import fetch from 'node-fetch';
import fs from 'fs';

const request = require('request').defaults({ encoding: null });

export default async function (msg: Message, args: string[]) {
    // Check we have the good number of arguments
    if (args.length > 1 && args.length <= 3) {

        // Take the URL from < url > by removing first and last character
        let url = args[0].slice(1, args[0].length - 1);
        // On charge l'image
        request.get(url, async (err: string, _res: any, body: Buffer) => {
            loadImage(body)
                .then(image => {
                    // Send a first message to ensure user we are working
                    msg.channel.send(replie(working));

                    // Create a 2D canvas the size of the image
                    const canvas = createCanvas(image.width, image.height);
                    const context = canvas.getContext('2d');

                    // Draw the picture
                    context.drawImage(image, 0, 0, image.width, image.height);

                    // Text parameters
                    context.textAlign = 'center';
                    context.fillStyle = 'white';
                    context.strokeStyle = 'black';

                    //TODO Trouver une bonne façon de calculer la taille de police
                    // Remove extra spaces
                    let text = args[1].trim().replace(/\s{2,}/g, ' ');
                    // Calculate the font size 
                    var fontSize = Math.min(image.height / 4, (image.width / text.length) * 2);

                    context.font = `${fontSize}px Impact`;
                    context.lineWidth = fontSize / 25;
                    context.textBaseline = 'top';

                    // Write the bottom text
                    context.strokeText(text, image.width / 2, 0);
                    // Draw the bottom text outlines
                    context.fillText(text, image.width / 2, 0);

                    if (args.length > 2) {
                        // Remove extra spaces
                        text = args[2].trim().replace(/\s{2,}/g, ' ');
                        // Calculate the font size 
                        fontSize = Math.min(image.height / 4, (image.width / text.length) * 2);

                        context.font = `${fontSize}px Impact`;
                        context.lineWidth = fontSize / 25;
                        context.textBaseline = 'bottom';

                        // Write the bottom text
                        context.strokeText(text, image.width / 2, image.height);
                        // Draw the bottom text outlines
                        context.fillText(text, image.width / 2, image.height);
                    }
                    // Save the image before sending it
                    const buffer = canvas.toBuffer('image/png');
                    let time = new Date().toUTCString();
                    let name = `${msg.member?.user.tag}${time}.png`;
                    let path = `./results/${name}`;
                    fs.writeFileSync(path, buffer);

                    msg.channel.send({ files: [path] })
                        .then(() => msg.channel.send(`✨ ${replie(success)} ✨`));

                })
                .catch(err => {
                    console.log(err);
                    // Inform the user that the request failed
                    msg.channel.send(replie(failed));
                })
        });
    } else {
        msg.channel.send("Error: bad arguments for !mkMeme,<picture url>,top text,bottom text (optionnal) ❌");
    }

};