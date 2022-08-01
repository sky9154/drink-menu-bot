const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require("fs");

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFiles = fs
            .readdirSync("./src/commands")
            .filter((file) => file.endsWith(".js"));

        for (const file of commandFiles) {
            const { commands, commandArray } = client;
            const command = require(`../../commands/${file}`);

            commands.set(command.data.name, command);
            commandArray.push(command.data.toJSON());
        }

        const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

        try {
            await rest.put(
                Routes.applicationCommands(process.env.CLIENT_ID), {
                    body: client.commandArray
                });
        } catch (err) {
            console.error(err.message);
        }
    }
}