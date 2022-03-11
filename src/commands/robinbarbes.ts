import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "src/Command";
import fs from "fs";

let path = "./barbes.json";

export const robinbarbes: Command = {
    data: new SlashCommandBuilder()
        .setName("robinbarbes")
        .setDescription("Espece de [...]")
        .addStringOption(option => option
            .setName("action")
            .setDescription("Action rocambolesque réalisé par Robin Barbes")),
    run: async (interaction) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if (err) {
                console.log(`Error reading file from disk: ${err}`);
            } else {
                // parse JSON string to JSON object
                const actions: string[] = JSON.parse(data);
                let index = Math.floor(Math.random() * actions.length);
                let action = interaction.options.getString("action");

                if (action) {
                    actions.push(action);
                    fs.writeFile(path, JSON.stringify(actions, null, 4), (err) => {
                        if (err) {
                            console.log(err);
                        }
                    });
                } else {
                    action = actions[index];
                }
                interaction.reply(`JE M'APPEL ROBIN BARBES !! ***${action}***`);
            }
        });
    }
}