import { token, clientId, guildId } from './config.json';
import { commands } from './commandHandler';
import { Routes } from 'discord-api-types/v9';
import { REST } from '@discordjs/rest';

const datas = []

for (let command of commands) {
    datas.push(command.data);
}

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: datas })
    .then(() => { console.log('Successfully deployed commands data to discord.') })
    .catch(console.error)