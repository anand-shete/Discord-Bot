require('dotenv').config();
const token = process.env.DISCORD_BOT_TOKEN
// discord bot token
// A Discord bot token is a unique secret string that grants your bot access to the Discord API. It acts as an authentication credential for your bot to interact with the Discord platform.
// When we create a Discord bot application, Discord generates a token that allows your bot to perform actions like sending messages, joining voice channels, managing roles, and more. This token is essential for your bot to function.
// It's crucial to keep your bot token confidential. Avoid sharing it publicly or embedding it directly in your bot code. Treat it like a password for your bot

// discord.js is a powerful Node.js module that allows you to easily interact with the Discord API.
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,   
        GatewayIntentBits.MessageContent
    ]
});
// A guild is a collection of users who can:
// Send messages in channels, Participate in voice chats, Be assigned roles with different permissions.
// When creating your Discord bot, we'll need to enable the Guilds intent to interact with guilds.

client.on('messageCreate', async (message) => {
    // console.log("message object", message   );
    // console.log("client username", message.author.username );
    // console.log("content of message: ", message.content);

    if (message.author.bot) return;     // dont invoke messageCreate if bot replies 

    if (message.content.startsWith('date')) {
        const date = message.content.split('date ')[1];
        const response = await fetch(`https://digidates.de/api/v1/age/${date}`);
        const json = await response.json();

        if (json.error) {
            message.reply(`${JSON.stringify(json.error)}`);
            return;
        } else {
            message.reply(`Your age is ${JSON.stringify(json.ageextended.years)} years, ${JSON.stringify(json.ageextended.months)} months and ${JSON.stringify(json.ageextended.days)} days`);
            return;
        }
    }

    message.reply({
        content: `Hola, como estas ${message.author.globalName}?\nIf you want to check your age, type "date YYYY-MM-DD" `
    })
});

client.on('interactionCreate', async (interaction) => {
    // console.log("Interaction object: ", interaction);
    if (interaction.commandName === 'ping') {
        interaction.reply('Ping-Pong!');
    }
})

client.login(token);