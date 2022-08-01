require('dotenv').config();

const { Client, Collection, Intents } = require('discord.js');
const fs = require('node:fs');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
client.buttons = new Collection();
client.modals = new Collection();
client.commandArray = [];

const functionFolders = fs.readdirSync('./src/functions');
for (const folder of functionFolders) {
    const functionFiles = fs
        .readdirSync(`./src/functions/${folder}`)
        .filter((file) => file.endsWith(".js"));

    for (const file of functionFiles) {
        require(`./functions/${folder}/${file}`)(client);
    }
}

client.handleCommands();
client.handleEvents();
client.handleComponents();
client.login(process.env.TOKEN).then((err) => console.log(err));