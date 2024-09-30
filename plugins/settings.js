const config = require('../config')
const os = require('os')
let { img2url } = require('@blackamda/telegram-image-url')
const { DBM } = require('postgres_dbm')
const si = require('systeminformation')
const fs = require('fs')
const { cmd , commands } = require('../command')
const { getBuffer , getGroupAdmins, getRandom, h2k, isUrl,Json,runtime,sleep,fetchJson} = require('../lib/functions')

    cmd({
    pattern: "settings",
    react: "🛠️",
    alias: ["setup"],
    desc: "System settings of cyber-x whatsapp bot",
    category: "main",
    use: '.apply',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body,mime , prefix , isCmd, command , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isCreator && !isDev ) return reply('❗ *Sorry ! You must be a Contributor frist* ')
 let rows = [
{
title : "CHANGE WORK TYPE",
description : "ℹ️ Includes.... Group only mode , Public mode , Private mode",
id: prefix  + `mode`
},
{
title : "RESTART THE SYSTEM",
description : "ℹ️ Dyno restart button from Heroku",
id: prefix + `restart`
},
{
title : "SHUTDOWN THE SYSTEM",
description : "ℹ️ Resources off button from Heroku",
id: prefix +  `shutdown`
},
{
title : "INACTIVE THE SYSTEM",
description : "ℹ️ After activated...Bot online ! But All commands will not work",
id: prefix + `int_mode`
},
{
title : "AUTO REACT SWITCH",
description : "ℹ️ Auto react on/off switch",
id: prefix + `autoreact`
},
{
title : "ANTI LINK KICK SWITCH",
description : "ℹ️ Anti link kick on/off switch",
id: prefix + `antilink`
},
{
title : "ANTI BAD WORD KICK SWITCH",
description : "ℹ️ Anti bad word kick on/off switch",
id: prefix + `antibad`
},
{
title : "AUTO READ SWITCH",
description : "ℹ️ Auto read on/off switch",
id: prefix + `autoread`
},
{
title : "AI MODE SWITCH",
description : "ℹ️ AI Mode on/off switch",
id: prefix + `ai_mode`
},
{
title : "BOT DETECT SWITCH",
description : "ℹ️ Bot detection on/off switch",
id: prefix + `botdetect`
},
{
title : "ANTI BOT SWITCH ( OTHER BOTS KICKING TOOL )",
description : "ℹ️ Anti bot on/off switch",
id: prefix + `antibot`
},
{
title : "USE '.' AS PREFIX ( HANDLER ) OF SYSTEM",
description : "ℹ️ Bot prefix changer",
id: prefix + `prefix .`
},
{
title : "USE ',' AS PREFIX ( HANDLER ) OF SYSTEM",
description : "ℹ️ Bot prefix changer",
id: prefix + `prefix ,`
},
{
title : "USE '/' AS PREFIX ( HANDLER ) OF SYSTEM",
description : "ℹ️ Bot prefix changer",
id: prefix + `prefix /`
},
{
title : "USE '$' AS PREFIX ( HANDLER ) OF SYSTEM",
description : "ℹ️ Bot prefix changer",
id: prefix + `prefix $`
}
]

            let buttons = [{
                  name: "single_select",
                   buttonParamsJson: JSON.stringify({
                        title: 'Settings 🛠️',
                        sections: [{
                            title: 'CYBER-X ALL SETTINGS',
                            highlight_label: '🛠️',
                            rows: rows

                        }]
})
}]
	   let opts = {
                image: '',
                header: 'CYBER-X 3.0 ALL CUSTOMIZATIONS AND SETTINGS',
                footer: 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ',
                body: '\nCustomize the behavior and functionality of the bot through the easy to use settings menu. Adjust features such as response times, system  settings, and available options to tailor the bot to your specific needs.'

            }

 return await conn.sendButtonMessage(from, buttons, m, opts)



} catch (e) {
reply(e)
l(e)
}
})

 
