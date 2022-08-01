const { MessageActionRow, MessageButton } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { checkDrinkMenu, searchDrinkMenu, listDrinkMenu } = require('../base/functions/json');

const { ADMINISTRATION } = process.env;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('drink-menu')
        .setDescription('手搖飲料菜單')
        .addSubcommand((subcommand) => subcommand
            .setName('search')
            .setDescription('查詢手搖飲料菜單')
            .addStringOption((option) => option
                .setName('name')
                .setDescription('店名')
                .setRequired(true)))
        .addSubcommand((subcommand) => subcommand
            .setName('list')
            .setDescription('手搖飲料菜單總表'))
        .addSubcommand((subcommand) => subcommand
        .setName('random')
        .setDescription('隨機推薦手搖飲料菜單'))
        .addSubcommand((subcommand) => subcommand
            .setName('settings')
            .setDescription('管理手搖飲料菜單')
        ),
    async execute (interaction) {
        const option = interaction.options.getSubcommand();

        if (['search', 'list', 'random'].includes(option)) {
            switch (option) {
                case 'search':
                    const name = interaction.options.getString('name');
                    const checkResult = checkDrinkMenu(interaction, name);

                    if (checkResult === 'true') {
                        await searchDrinkMenu(interaction, name);
                    } else if (checkResult === 'false') {
                        console.log(`【手搖飲料菜單】請新增 ${name} 菜單`);

                        await interaction.reply({
                            content: '菜單不存在!',
                            ephemeral: true
                        }); 
                    }

                    break;
                case 'list':
                    await listDrinkMenu(interaction);

                    break;
                case 'random':
                    await interaction.reply({
                        content: '功能尚未完工...',
                        ephemeral: true
                    }); 
                
                    break;
                default:
                    break;
            }
        } else if (option === 'settings') {
            if (ADMINISTRATION.includes(interaction.user.id)) {
                const settingBtn = new MessageActionRow()
                    .addComponents(
                        new MessageButton()
                            .setCustomId('addBtn')
                            .setStyle('PRIMARY')
                            .setLabel('𝗔𝗗𝗗')
                            .setEmoji('<a:blobreach:993366390331424768>'),

                        new MessageButton()
                            .setCustomId('deleteBtn')
                            .setStyle('DANGER')
                            .setLabel('𝗗𝗘𝗟𝗘𝗧𝗘')
                            .setEmoji('<a:blobreach:993366387206664296>'),

                        new MessageButton()
                            .setCustomId('editBtn')
                            .setStyle('SUCCESS')
                            .setLabel('𝗘𝗗𝗜𝗧')
                            .setEmoji('<a:blobreach:993366388980854884>'),
                    );

                await interaction.reply({
                    components: [settingBtn],
                    ephemeral: true
                });
            } else {
                await interaction.reply({
                    content: '你沒有權限進行此操作',
                    ephemeral: true
                });
            }
        }
    }
};