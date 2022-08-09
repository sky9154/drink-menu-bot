const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Return my ping!'),
    async execute (interaction, client) {
        interaction.reply({
            content: `${client.ws.ping} ms`
        });
    }
};