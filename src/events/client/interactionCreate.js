module.exports = {
    name: 'interactionCreate',
    async execute (interaction, client) {
        if (interaction.isCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);

            if (!command)  new Error('命令交互錯誤');

            try {
                await command.execute(interaction, client);
            } catch (err) {
                console.error(err);

                interaction.reply({
                    content: '執行此命令時出現問題...',
                    ephemeral: true
                });
            }
        } else if (interaction.isButton()) {
            const { buttons } = client;
            const { customId } = interaction;
            const button = buttons.get(customId);

            if (!button) return new Error('按鈕交互錯誤');

            try {
                await button.execute(interaction, client);
            } catch (err) {
                console.error(err);

                interaction.reply({
                    content: '執行此命令時出現問題...',
                    ephemeral: true
                });
            }
        } else if (interaction.isModalSubmit()) {
            const { modals } = client;
            const { customId } = interaction;
            const modal = modals.get(customId);

            if (!modal) return new Error('表單交互錯誤');

            try {
                await modal.execute(interaction, client);
            } catch (err) {
                console.error(err);

                interaction.reply({
                    content: '執行此命令時出現問題...',
                    ephemeral: true
                });
            }
        }
    }
}