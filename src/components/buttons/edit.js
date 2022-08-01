const { Modal, MessageActionRow, TextInputComponent } = require('discord.js');

module.exports = {
    data: {
        name: 'editBtn'
    },
    async execute (interaction) {
        const nameInput = new MessageActionRow()
        .addComponents(new TextInputComponent()
            .setCustomId('name')
            .setLabel('手搖飲料店店名')
            .setStyle('SHORT')
            .setRequired(true));

        const menuInput = new MessageActionRow()
            .addComponents(new TextInputComponent()
                .setCustomId('menu')
                .setLabel('手搖飲料菜單連結')
                .setStyle('SHORT')
                .setRequired(true));

        const editModal = new Modal()
            .setCustomId('editModal')
            .setTitle('編輯手搖飲料菜單')
            .addComponents(nameInput, menuInput);

        await interaction.showModal(editModal);
    }
}