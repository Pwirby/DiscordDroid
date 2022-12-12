import { working, failed, success, replie } from "../replies.js";
import { SlashCommandBuilder } from "@discordjs/builders";
import { AttachmentBuilder } from "discord.js";
import { createCanvas, loadImage } from "canvas";
import fetch from "node-fetch";
import { Command } from "../command";

export const mksoy: Command = {
  data: new SlashCommandBuilder()
    .setName("mksoy")
    .setDescription("Add soyjaks on a picture from its URL")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("The URL of the picture for the soyjak to be added in")
        .setRequired(true)
    ),

  run: async (interaction) => {
    // Take the URL from < url > by removing first and last character
    let imageUrl = interaction.options.getString("url", true);
    // Load the images
    let soyjak_left = await loadImage("./pictures/soyjak_left.png");
    let soyjak_right = await loadImage("./pictures/soyjak_right.png");
    try {
      let fimg = await fetch(imageUrl);
      let body = Buffer.from(await fimg.arrayBuffer());
      loadImage(body).then((image) => {
        // Create a canvas the size of the picture
        const canvas = createCanvas(image.width, image.height);
        const context = canvas.getContext("2d");

        // Draw the image
        context.drawImage(image, 0, 0, image.width, image.height);

        // Draw left soyjack
        var ratio = Math.min(
          image.height / (soyjak_left.height + image.height / 4),
          image.width / (soyjak_left.width * 3)
        );

        var height = soyjak_left.height * ratio;
        var width = soyjak_left.width * ratio;
        context.drawImage(soyjak_left, 0, image.height - height, width, height);

        // Draw right soyjack
        ratio = Math.min(
          image.height / (soyjak_right.height + image.height / 8),
          image.width / (soyjak_left.width * 3)
        );

        height = soyjak_right.height * ratio;
        width = soyjak_right.width * ratio;
        context.drawImage(
          soyjak_right,
          image.width - width,
          image.height - height,
          width,
          height
        );
        // Convert the buffer to an attachement
        let buffer = canvas.toBuffer("image/png");
        let imageResult = new AttachmentBuilder(buffer);
        interaction.reply({ files: [imageResult] });
        //.then(() => interaction.reply(`✨ ${replie(success)} ✨`));
      });
    } catch (err) {
      console.log(err);
      // Inform the user that the request failed
      interaction.reply({
        content: `${replie(failed)}`,
        ephemeral: true,
      });
    }
  },
};
