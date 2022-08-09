const { Modal, MessageActionRow, TextInputComponent } = require('discord.js');

module.exports = {
    data: {
        name: 'deleteBtn'
    },
    async execute (interaction) {
        const nameInput = new MessageActionRow()
        .addComponents(new TextInputComponent()
            .setCustomId('name')
            .setLabel('手搖飲料店名')
            .setStyle('SHORT')
            .setRequired(true));

        const deleteModal = new Modal()
            .setCustomId('deleteModal')
            .setTitle('刪除手搖飲料菜單')
            .addComponents(nameInput);

        await interaction.showModal(deleteModal);
    }
}