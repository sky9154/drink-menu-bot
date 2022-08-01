const isImage = require('is-image');
const dayjs = require('dayjs');
const { checkDrinkMenu, addDrinkMenu } = require('../../base/functions/json');

module.exports = {
    data: {
        name: 'addModal'
    },
    async execute (interaction) {
        if (isImage(interaction.fields.getTextInputValue('menu'))) {
            const name = interaction.fields.getTextInputValue('name');
            const menu = interaction.fields.getTextInputValue('menu');
            const user = interaction.user.id;
            const date = dayjs().format('YYYY/MM/DD HH:mm:ss Z[Z]');

            const checkResult = await checkDrinkMenu(interaction, name);

            if (checkResult === 'true') {
                await interaction.reply({
                    content: '菜單已存在!',
                    ephemeral: true
                });
            } else if (checkResult === 'false') {
                await addDrinkMenu(name, menu, user, date);

                await interaction.reply({
                    content: `${name} - 菜單新增成功!`,
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