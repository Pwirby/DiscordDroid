import { replieWorking, replieFailed, replieSuccess } from "./replies";
import { createCanvas, loadImage } from 'canvas';
import { Message } from 'discord.js';
import fetch from 'node-fetch';
import fs from 'fs';

const request = require('request').defaults({ encoding: null });

export default async function (msg: Message, args: string[]) {
    // Check we have the good number of arguments
    if (args.length == 1) {

        // Take the URL from < url >
        let url = args[0].slice(1, args[0].length - 1);
        // Load the images
        let soyjak_left = await loadImage("./pictures/soyjak_left.png");
        let soyjak_right = await loadImage("./pictures/soyjak_right.png");
        request.get(url, async (err: string, _res: any, body: Buffer) => {
            loadImage(body).then(image => {

                // Send a first message to ensure user we are working
                msg.channel.send(replieWorking());

                // Create a canvas the size of the picture
                const canvas = createCanvas(image.width, image.height);
                const context = canvas.getContext('2d');

                // Draw the image
                context.drawImage(image, 0, 0, image.width, image.height);

                // Draw left soyjack
                var ratio = Math.min(image.height / (soyjak_left.height + image.height / 4),
                    image.width / (soyjak_left.width * 3));

                var height = soyjak_left.height * ratio;
                var width = soyjak_left.width * ratio;
                context.drawImage(soyjak_left, 0, image.height - height, width, height);

                // Draw right soyjack
                ratio = Math.min(image.height / (soyjak_right.height + image.height / 8),
                    image.width / (soyjak_left.width * 3));

                height = soyjak_right.height * ratio;
                width = soyjak_right.width * ratio;
                context.drawImage(soyjak_right, image.width - width, image.height - height, width, height);

                // Save the image before sending it
                const buffer = canvas.toBuffer('image/png');
                let time = new Date().toUTCString();
                let name = `${msg.member?.user.tag}${time}.png`;
                let path = `./results/${name}`;
                fs.writeFileSync(path, buffer);

                msg.channel.send({ files: [path] })
                    .then(() => msg.channel.send(`✨ ${replieSuccess()} ✨`));

            }).catch(_err => {
                // Inform the user that the request failed
                msg.channel.send(replieFailed());
            })
        });
    } else {
        msg.channel.send("Error: bad arguments for !mkDemo,<picture url> ❌");
    }
};