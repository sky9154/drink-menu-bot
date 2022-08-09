# Discord Bot - 喝個搖搖
![Platform Version Support](https://img.shields.io/node/v/discord.js)
![GitHub license](https://img.shields.io/badge/license-MIT_License-blue.svg)

[<img src="https://cdn.discordapp.com/attachments/1001972664723832915/1001973391248605214/drink-menu-bot.png" width="500"/>](https://cdn.discordapp.com/attachments/1001972664723832915/1001973391248605214/drink-menu-bot.png)

> Discord 手搖飲料菜單搜尋機器人

`喝個搖搖` 提供以下功能:
* 搜尋手搖飲料菜單
* 隨機手搖飲料菜單
* 新增手搖飲料菜單
* 刪除手搖飲料菜單
* 修改手搖飲料菜單

## 使用環境
| 名稱 | 版本 |
| - | - |
| Node.js | 18.4.0 |
| npm | 8.13.2 |
| discord.js | 13.8.0 |

## 如何安裝
1. 安裝套件
```sh
npm i @discordjs/builders
npm i @discordjs/rest
npm i dayjs
npm i discord-api-types
npm i discord.js
npm i dotenv
npm i is-image
```

2. 複製專案
```sh
git clone https://github.com/sky9154/drink-menu-bot.git
```

3. 新增 `.env` 檔
```env
TOKEN=機器人 TOKEN
CLIENT_ID=機器人 ID
ADMINISTRATION="管理員 ID (可設定多個管理員，用 "," 區分)"
```

4. 執行機器人
```sh
npm run start
```

## 如何使用
### search `name`

| 參數 | 類型 | 說明 |
| - | - | - |
| [name] | string | tea shop name |

> 回覆搜尋到的手搖飲料菜單

### list
> 回覆目前已知的手搖飲料菜單

### random
> 回覆隨機一個手搖飲料菜單

### settings
> 回覆一個機器人設定集

## 數據模型
### 數據內容
```js
{
  "menu": Object[], // 手搖飲料菜單資料
  "total": Number   // 手搖飲料菜單總數
}
```

### 手搖飲料菜單資料
```js
{
  "name": String,   // 手搖飲料店名
  "menu": String,   // 手搖飲料菜單
  "user": String,   // 新增編輯人員
  "date": String    // 新增編輯日期
}
```

## 許可證
MIT License

Copyright © 2022 oF