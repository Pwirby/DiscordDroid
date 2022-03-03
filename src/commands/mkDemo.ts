import { replieWorking, replieFailed, replieSuccess } from "./replies";
import { createCanvas, Image, loadImage } from 'canvas';
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
                    msg.channel.send(replieWorking());

                    // Create a 2D canvas a bit bigger than the size of the image
                    const borderSize = image.width / 9;
                    const totalHeight = image.height + borderSize * 4;
                    const totalWidth = image.width + 2 * borderSize;

                    const canvas = createCanvas(totalWidth, totalHeight);
                    const context = canvas.getContext('2d');

                    // Draw a black backround
                    context.fillStyle = 'black';
                    context.fillRect(0, 0, canvas.width, canvas.height);

                    // Draw the white frame around the image
                    context.strokeStyle = 'white';
                    context.lineWidth = 6;
                    context.strokeRect(borderSize, borderSize, image.width, image.height);

                    // Draw the picture
                    context.drawImage(image, borderSize, borderSize, image.width, image.height);

                    // Text parameters
                    context.textAlign = 'center';
                    context.textBaseline = 'middle';
                    context.fillStyle = 'white';

                    //TODO: find good fontSize ratio
                    // Writing the title
                    let text = args[1].trim().replace(/\s{2,}/g, ' ');
                    var fontSize = Math.min(canvas.width / 8, (image.width / text.length) * 2);

                    context.font = `${fontSize}px Times New Roman`;
                    context.fillText(text, canvas.width / 2, image.height + 2 * borderSize);

                    if (args[2]) {
                        // Writing description
                        // Remove extra spaces
                        text = args[2].trim().replace(/\s{2,}/g, ' ');
                        // Calculate the font size 
                        fontSize = Math.min(canvas.width / 12, (image.width / text.length) * 2);

                        context.font = `${fontSize}px Times New Roman`;
                        context.fillText(text, canvas.width / 2, canvas.height - borderSize);
                    }
                    // Save the image before sending it
                    const buffer = canvas.toBuffer('image/png');
                    let time = new Date().toUTCString();
                    let name = `${msg.member?.user.tag}_${time}.png`;
                    let path = `./results/${name}`;
                    fs.writeFileSync(path, buffer);

                    msg.channel.send({ files: [path] })
                        .then(() => msg.channel.send(`✨ ${replieSuccess()} ✨`));
                })
                .catch(err => {
                    console.log(err);
                    // Inform the user that the request failed
                    msg.channel.send(replieFailed());
                })
        });
    } else {
        msg.channel.send("Error: bad arguments for !mkDemo,<picture url>,title,description ❌");
    }
};