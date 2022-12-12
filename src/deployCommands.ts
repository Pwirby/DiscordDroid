import "dotenv/config";
import { Routes } from 'discord-api-types/v9';
import { commands } from './commandHandler.js';
import { REST } from '@discordjs/rest';

try {
    let server = process.argv[2].toString();
    if (server) {
        const datas = [];
        for (let command of commands) {
            datas.push(command.data.toJSON());
        }
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN!);
        if (server == "test") {
            rest.put(Routes.applicationGuildCommands(process.env.DISCORD_TOKEN!, process.env.GUILD_ID!), { body: datas })
                .then(() => { console.log('Successfully deployed commands data to the specified guild.') })
                .catch(console.error)
        } else if (server == "global") {
            rest.put(Routes.applicationCommands(process.env.CLIENT_ID!), { body: datas })
                .then(() => { console.log('Successfully deployed commands data to discord.') })
                .catch(console.error)
        } else {
            console.log("Nothing deployed, argument must be 'test' or 'global'");
        }
    }
} catch{
    console.log("Nothing deployed, argument must be 'test' or 'global'");
}
