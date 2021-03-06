import { token, clientId, guildId } from './config.json';
import { Routes } from 'discord-api-types/v9';
import { commands } from './commandHandler';
import { REST } from '@discordjs/rest';

let server = process.argv[2].toString();
if (server) {
    const datas = [];

    for (let command of commands) {
        datas.push(command.data);
    }
    console.log(server);
    const rest = new REST({ version: '9' }).setToken(token);
    if (server == "test") {
        rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: datas })
            .then(() => { console.log('Successfully deployed commands data to the specified guild.') })
            .catch(console.error)
    } else if (server == "global") {
        rest.put(Routes.applicationCommands(clientId), { body: datas })
            .then(() => { console.log('Successfully deployed commands data to discord.') })
            .catch(console.error)
    } else {
        console.log("Nothing deployed, argument must be 'test' or 'global'");
    }
}