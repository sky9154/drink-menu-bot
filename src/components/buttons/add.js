const { Modal, MessageActionRow, TextInputComponent } = require('discord.js');

module.exports = {
    data: {
        name: 'addBtn'
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

        const addModal = new Modal()
            .setCustomId('addModal')
            .setTitle('新增手搖飲料菜單')
            .addComponents(nameInput, menuInput);

        await interaction.showModal(addModal);
    }
}