import { working, replieFail, replieSuccess } from "./replies";
import { Message, MessageEmbed } from "discord.js";
import { createCanvas, loadImage } from "canvas";
import fs from "fs";
const request = require('request').defaults({ encoding: null });

export default async function (msg: Message, args: string[]) {
    // Si la commande a le bon nombre d'arguments
    if (args.length == 1) {

        // Take the URL from < url >
        let url = args[0].slice(1, args[0].length - 1);
        // On charge l'image
        request.get(url, function (err: string, _res: any, body: Buffer) {
            if (err == null) {
                loadImage(body)
                    .then(image => {
                        loadImage("./pictures/soyjak_left.png")
                            .then(soyjak_left => {
                                loadImage("./pictures/soyjak_right.png")
                                    .then(soyjak_right => {

                                        // On envoi un premier message pour assurer qu'on travaille
                                        let w = Math.floor(Math.random() * working.length);
                                        msg.channel.send(working[w]);

                                        // Si on y arrive on crée un canvas 2D de la taille de l'image
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
                                        const buffer = canvas.toBuffer("image/png");
                                        let time = new Date().toUTCString();
                                        let name = `${msg.author}${time}.png`;
                                        let path = `./results/${name}`;
                                        fs.writeFileSync(path, buffer);

                                        let index = Math.floor(Math.random() * replieSuccess.length);
                                        msg.channel.send({ files: [path] })
                                            .then(() => msg.channel.send(`✨ ${replieFail[index]} ✨`));
                                    });
                            });
                    })
                    .catch(err => {
                        let index = Math.floor(Math.random() * replieFail.length);
                        msg.channel.send(replieFail[index]);
                    });
            } else {
                let index = Math.floor(Math.random() * replieFail.length);
                msg.channel.send(replieFail[index]);
            }
        });
    } else {
        msg.channel.send("Error: bad arguments for !mkDemo,<picture url> ❌");
    }
};