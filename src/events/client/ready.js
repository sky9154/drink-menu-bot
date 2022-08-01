module.exports = {
    name: 'ready',
    once: true,
    async execute (client) {
        client.user.setActivity('Sword Art Online');
        console.log(`機器人 ${client.user.tag} 正在運行中!`);
    }
}