import { working, failed, success, replie } from "../replies";
import { SlashCommandBuilder } from "@discordjs/builders";
import { createCanvas, loadImage } from "canvas";
import fetch from "node-fetch";
import fs from "fs";
import { Command } from "../command";

const request = require('request').defaults({ encoding: null });

export const mkmeme: Command = {
    data: new SlashCommandBuilder()
        .setName("mkmeme")
        .setDescription("Creates a meme from a picture URL")
        .addStringOption(option => option
            .setName("url")
            .setDescription("The URL of the picture for the meme to be used")
            .setRequired(true))
        .addStringOption(option => option
            .setName("top")
            .setDescription("The text to write on the top of the picture")
            .setRequired(true))
        .addStringOption(option => option
            .setName("bottom")
            .setDescription("The text to write on the bottom of the picture")
            .setRequired(false)),

    run: async (interaction) => {
        // Take the URL from < url > by removing first and last character
        let url = interaction.options.getString("url", true);
        let top = interaction.options.getString("top", true);
        let bottom = interaction.options.getString("bottom");
        // On charge l'image
        request.get(url, async (err: string, _res: any, body: Buffer) => {
            if (err) {
                console.log(err);
                // Inform the user that the request failed
                interaction.reply({
                    content: `${replie(failed)}`,
                    ephemeral: true
                });
            } else {
                try {
                    loadImage(body)
                        .then(image => {
                            // Send a first message to ensure user we are working
                            //interaction.reply(replie(working));

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
                            let text = top.trim().replace(/\s{2,}/g, ' ');
                            // Calculate the font size 
                            var fontSize = Math.min(image.height / 4, (image.width / text.length) * 2);

                            context.font = `${fontSize}px Impact`;
                            context.lineWidth = fontSize / 25;
                            context.textBaseline = 'top';

                            // Write the bottom text
                            context.strokeText(text, image.width / 2, 0);
                            // Draw the bottom text outlines
                            context.fillText(text, image.width / 2, 0);

                            if (bottom) {
                                // Remove extra spaces
                                text = bottom.trim().replace(/\s{2,}/g, ' ');
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
                            //let time = new Date().toUTCString();
                            //let name = `${interaction.user.tag}${time}.png`;
                            let path = `./results/result.png`;
                            fs.writeFileSync(path, buffer);

                            interaction.reply({ files: [path] });
                            //.then(() => interaction.reply(`✨ ${replie(success)} ✨`));
                        })
                } catch (err) {
                    console.log(err);
                    // Inform the user that the request failed
                    interaction.reply({
                        content: `${replie(failed)}`,
                        ephemeral: true
                    });
                }
            }
        });
    }
}