const { MessageEmbed } = require('discord.js');
const fs = require('fs');

/**
 * 檢查手搖飲料菜單
 * @param { object } interaction interaction
 * @param { String } name 店名
 * @returns { String } 檢查結果
 */
const checkDrinkMenu = async (interaction, name) => {
    try {
        if (name.length >= 2) {
            let menuData = fs.readFileSync('./src/base/document/drink-menu.json', 'utf8');
            menuData = JSON.parse(menuData);
        
            for (let i = 0; i < menuData.menu.length; ++ i) {
                if (menuData.menu[i].name.toUpperCase().includes(name.toUpperCase())) {
                    return 'true';
                }
            }
    
            return 'false';
        } else {
            await interaction.reply({
                content: '請輸入2位以上的關鍵字進行查詢!',
                ephemeral: true
            });
    
            return 'not keys';
        }
    } catch (err) {
        return console.error(err);
    }
}

/**
 * 搜尋手搖飲料菜單
 * @param { object } interaction interaction
 * @param { String } name 店名
 */
const searchDrinkMenu = async (interaction, name) => {
    fs.readFile('./src/base/document/drink-menu.json', async (err, jsonMenu) => {
        if (err) {
            return console.error(err);
        } else {
            let menuData = jsonMenu.toString();
            menuData = JSON.parse(menuData);
    
            for (let i = 0; i < menuData.menu.length; ++ i) {
                if (menuData.menu[i].name.toUpperCase().includes(name.toUpperCase())) {
                    const drinkEmbed = new MessageEmbed()
                        .setTitle(`【${menuData.menu[i].name}】菜單`)
                        .setColor('#83abc9')
                        .setImage(menuData.menu[i].menu)
                        .setFooter({ 
                            text: `最後更新時間: ${menuData.menu[i].date}`, 
                            iconURL: 'https://cdn.discordapp.com/attachments/1001972664723832915/1001973391248605214/drink-menu-bot.png' 
                        });
        
                    await interaction.reply({
                        embeds: [drinkEmbed]
                    });
        
                    break;
                }
            }
        }
    });
}

/**
 * 手搖飲料菜單總表
 * @param { object } interaction interaction
 */
 const listDrinkMenu = async (interaction) => {
    fs.readFile('./src/base/document/drink-menu.json', async (err, jsonMenu) => {
        if (err) {
            return console.error(err);
        } else {
            let menuData = jsonMenu.toString();
            menuData = JSON.parse(menuData);
    
            let menuList = '';

            for (let i = 0; i < menuData.menu.length; ++ i) {
                let num = i + 1;
                num = num < 10 ? `0${num}` : `${num}`;

                menuList += `${num}. ${menuData.menu[i].name}\n`;
            }

            menuList = `\`\`\`${menuList}\n總計: ${menuData.menu.length} 間手搖飲料店\`\`\``;

            await interaction.reply({
                content: menuList
            });
        }
    });
}

/**
 * 新增手搖飲料菜單
 * @param { String } name 店名
 * @param { String } menu 菜單
 * @param { String } user 使用者
 * @param { String } date 新增日期
 */
const addDrinkMenu = async (name, menu, user, date) => {
    const newMenu = {
        "name": `${name}`,
        "menu": `${menu}`,
        "user": `${user}`,
        "date": `${date}`
    };

    fs.readFile('./src/base/document/drink-menu.json', (err, jsonMenu) => {
        if (err) {
            return console.error(err);
        } else {
            let menuData = jsonMenu.toString();
            menuData = JSON.parse(menuData);
            
            menuData.menu.push(newMenu);
            menuData.total = menuData.menu.length;
    
            const str = JSON.stringify(menuData, null, 2);
    
            fs.writeFile('./src/base/document/drink-menu.json', str, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    });
}

/**
 * 刪除手搖飲料菜單
 * @param { String } name 店名
 */
const deleteDrinkMenu = async (name) => {
    fs.readFile('./src/base/document/drink-menu.json', (err, jsonMenu) => {
        if (err) {
            return console.error(err);
        } else {
            let menuData = jsonMenu.toString();
            menuData = JSON.parse(menuData);
    
            for (let i = 0; i < menuData.menu.length; ++ i) {
                if (menuData.menu[i].name.toUpperCase().includes(name.toUpperCase())) {
                    menuData.menu.splice(i, 1);
                }
            }
    
            menuData.total = menuData.menu.length;
    
            const str = JSON.stringify(menuData, null, 2);
    
            fs.writeFile('./src/base/document/drink-menu.json', str, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    });
}

/**
 * 編輯手搖飲料菜單
 * @param { String } name 店名
 * @param { String } menu 菜單
 * @param { String } user 使用者
 * @param { String } date 新增日期
 */
 const editDrinkMenu = async (name, menu, user, date) => {
    fs.readFile('./src/base/document/drink-menu.json', (err, jsonMenu) => {
        if (err) {
            return console.error(err);
        } else {
            let menuData = jsonMenu.toString();
            menuData = JSON.parse(menuData);
            
            for (let i = 0; i < menuData.menu.length; ++ i) {
                if (menuData.menu[i].name.toUpperCase().includes(name.toUpperCase())) {
                    menuData.menu[i].menu = menu;
                    menuData.menu[i].user = user;
                    menuData.menu[i].date = date;

                    break;
                }
            }
    
            const str = JSON.stringify(menuData, null, 2);
    
            fs.writeFile('./src/base/document/drink-menu.json', str, (err) => {
                if (err) {
                    console.error(err);
                }
            });
        }
    });
}

module.exports = {
    checkDrinkMenu: checkDrinkMenu,
    searchDrinkMenu: searchDrinkMenu,
    listDrinkMenu: listDrinkMenu,
    addDrinkMenu: addDrinkMenu,
    deleteDrinkMenu: deleteDrinkMenu,
    editDrinkMenu: editDrinkMenu
}