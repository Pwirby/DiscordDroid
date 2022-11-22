import { working, failed, success, replie } from "../replies";
import { SlashCommandBuilder } from "@discordjs/builders";
import { createCanvas, loadImage } from "canvas";
import fetch from "node-fetch";
import fs from "fs";
import { Command } from "../command";

const request = require('request').defaults({ encoding: null });

export const mkdemo: Command = {
    data: new SlashCommandBuilder()
        .setName("mkdemo")
        .setDescription("Creates a demotivationnal poster from a picture URL and a title")
        .addStringOption(option => option
            .setName("url")
            .setDescription("The URL of the picture for the meme to be used")
            .setRequired(true))
        .addStringOption(option => option
            .setName("title")
            .setDescription("The title of the poster")
            .setRequired(true))
        .addStringOption(option => option
            .setName("description")
            .setDescription("The description under the picture")
            .setRequired(false)),

    run: async (interaction) => {
        // Take the URL from < url > by removing first and last character
        let url = interaction.options.getString("url");
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
                            let text = interaction.options.getString("title")?.trim().replace(/\s{2,}/g, ' ');
                            text = text + "";

                            var fontSize = Math.min(canvas.width / 8, (image.width / text.length) * 2);

                            context.font = `${fontSize}px Times New Roman`;
                            context.fillText(text, canvas.width / 2, image.height + 2 * borderSize);

                            if (interaction.options.getString("description")) {
                                // Writing description
                                // Remove extra spaces
                                text = interaction.options.getString("description")?.trim().replace(/\s{2,}/g, ' ');
                                text = text + "";
                                // Calculate the font size 
                                fontSize = Math.min(canvas.width / 12, (image.width / text.length) * 2);

                                context.font = `${fontSize}px Times New Roman`;
                                context.fillText(text, canvas.width / 2, canvas.height - borderSize);
                            }
                            // Save the image before sending it
                            const buffer = canvas.toBuffer('image/png');
                            //let time = new Date().toUTCString();
                            //let name = `${interaction.user.tag}${time}.png`;
                            let path = `./results/result.png`;
                            fs.writeFileSync(path, buffer);

                            interaction.reply({ files: [path] })
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