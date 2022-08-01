const { checkDrinkMenu, deleteDrinkMenu } = require('../../base/functions/json');

module.exports = {
    data: {
        name: 'deleteModal'
    },
    async execute (interaction) {
        const name = interaction.fields.getTextInputValue('name');

        const checkResult = await checkDrinkMenu(interaction, name);

        if (checkResult === 'true') {
            await deleteDrinkMenu(name);

            await interaction.reply({
                content: `${name} - 菜單刪除成功!`,
                ephemeral: true
            });
        } else if (checkResult === 'false') {
            await interaction.reply({
                content: '菜單不存在!',
                ephemeral: true
            });
        }
    }
}