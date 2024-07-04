const { REST, Routes } =require('discord.js');
require('dotenv').config();
const token = process.env.DISCORD_BOT_TOKEN;

// making a new custom bot command
const commands = [
    {
        name: 'ping',
        description: 'Replies with a Pong!',
    },
    // we can add more bot commands if we want to here...
];

const rest = new REST({ version: '10' }).setToken(token);
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands('1258133824018186372'), { body: commands });
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error("error occurred in adding commands",error);
    }
})()