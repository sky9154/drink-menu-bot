const isImage = require('is-image');
const dayjs = require('dayjs');
const { checkDrinkMenu, editDrinkMenu } = require('../../base/functions/json');

module.exports = {
    data: {
        name: 'editModal'
    },
    async execute (interaction) {
        if (isImage(interaction.fields.getTextInputValue('menu'))) {
            const name = interaction.fields.getTextInputValue('name');
            const menu = interaction.fields.getTextInputValue('menu');
            const user = interaction.user.id;
            const date = dayjs().format('YYYY/MM/DD HH:mm:ss Z[Z]');

            const checkResult = await checkDrinkMenu(interaction, name);

            if (checkResult === 'true') {
                await editDrinkMenu(name, menu, user, date);

                await interaction.reply({
                    content: `${name} - 菜單編輯成功!`,
                    ephemeral: true
                });
            } else if (checkResult === 'false') {
                await interaction.reply({
                    content: '菜單不存在!',
                    ephemeral: true
                });
            }
        } else {
            await interaction.reply({
                content: '菜單連結錯誤...',
                ephemeral: true
            });
        }
    }
}