import { working, failed, success, replie } from "../replies";
import { SlashCommandBuilder } from "@discordjs/builders";
import { createCanvas, loadImage } from "canvas";
import fetch from "node-fetch";
import fs from "fs";
import { Command } from "../Command";

const request = require('request').defaults({ encoding: null });

export const mksoy: Command = {
    data: new SlashCommandBuilder()
        .setName("mksoy")
        .setDescription("Add soyjaks on a picture from its URL")
        .addStringOption(option => option
            .setName("url")
            .setDescription("The URL of the picture for the soyjak to be added in")
            .setRequired(true)),

    run: async (interaction) => {
        // Take the URL from < url > by removing first and last character
        let url = interaction.options.getString("url");
        // Load the images
        let soyjak_left = await loadImage("./pictures/soyjak_left.png");
        let soyjak_right = await loadImage("./pictures/soyjak_right.png");
        request.get(url, async (err: string, _res: any, body: Buffer) => {
            if (err) {
                console.log(err);
                // Inform the user that the request failed
                interaction.reply({
                    content: `${replie(failed)}`,
                    ephemeral: true
                });
            } else {
                loadImage(body)
                    .then(image => {
                        // Send a first message to ensure user we are working
                        //interaction.reply(replie(working));

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
                        //let time = new Date().toUTCString();
                        //let name = `${interaction.user.tag}${time}.png`;
                        let path = `./results/result.png`;
                        fs.writeFileSync(path, buffer);

                        interaction.reply({ files: [path] })
                        //.then(() => interaction.reply(`✨ ${replie(success)} ✨`));

                    })
                    .catch(err => {
                        console.log(err);
                        // Inform the user that the request failed
                        interaction.reply({
                            content: `${replie(failed)}`,
                            ephemeral: true
                        });
                    })
            }
        });
    }
}