const config = require('../config')
const os = require('os')
let { img2url } = require('@blackamda/telegram-image-url')
const { DBM } = require('postgres_dbm')
const si = require('systeminformation')
const fs = require('fs')
const { cmd , commands } = require('../command')
const { getBuffer , getGroupAdmins, getRandom, h2k, isUrl,Json,runtime,sleep,fetchJson} = require('../lib/functions')
cmd({
        pattern: "alive",
        react: "💫",
        alias: ["online", "test", "bot"],
        desc: "Check bot online or no.",
        category: "main",
        use: '.alive',
        filename: __filename
    },
    async (conn, mek, m, {
        from,
        prefix,
        pushname,
        reply
    }) => {
        try {
        const db_pool = new DBM({
    db: config.DATABASE_URL
})
		const data = await db_pool.get('ALIVE_MESSAGE')
		let logoimage = await db_pool.get('ALIVE_IMAGE')
		    let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "SUBSCRIBE US",
                        url: "https://whatsapp.com/channel/0029Va5EQi7CRs1lXmZYKw0x",
                        merchant_url: "https://whatsapp.com/channel/0029Va5EQi7CRs1lXmZYKw0x"
                    }),
                },
                {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "ALL MENU",
                        id: prefix + "menu"
                    }),
                },
                {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "OWNER",
                        id: prefix + "owner"
                    }),
                }
            ]
            let opts = {
                image: logoimage,
                header: '𝙲𝚈𝙱𝙴𝚁-𝚇 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝚄𝚂𝙴𝚁 𝙱𝙾𝚃',
                footer: 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ',
                body: data

            }
            return await conn.sendButtonMessage(from, buttons, m, opts)
        } catch (e) {
            const datada = await fetchJson("https://raw.githubusercontent.com/darkalphaxteam/UPLOADS/main/JSON/info.json")
            let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "SUBSCRIBE US",
                        url: "https://whatsapp.com/channel/0029Va5EQi7CRs1lXmZYKw0x",
                        merchant_url: "https://whatsapp.com/channel/0029Va5EQi7CRs1lXmZYKw0x"
                    }),
                },
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "FOLLOW US",
                        url: "https://github.com/darkalphaxteam",
                        merchant_url: "https://github.com/darkalphaxteam"
                    }),
                },
                {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "ALL MENU",
                        id: prefix + "menu"
                    }),
                }
            ]
            let opts = {
                image: 'https://telegra.ph/file/4c009990c1eb47c8b1d84.jpg',
                header: '𝙲𝚈𝙱𝙴𝚁-𝚇 𝚆𝙷𝙰𝚃𝚂𝙰𝙿𝙿 𝚄𝚂𝙴𝚁 𝙱𝙾𝚃',
                footer: 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ',
                body: datada.text

            }
            return await conn.sendButtonMessage(from, buttons, m, opts)
        }
    })
    
    cmd({
    pattern: "apply",
    react: "🛠️",
    alias: ["setup"],
    desc: "System image Applyer",
    category: "main",
    use: '.apply',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body,mime , prefix , isCmd, command , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if(!isCreator) { if ( !isDev) return conn.sendMessage(from,{text:"🚫 *This is Moderator only Command*"},{quoted:mek }) }
if (!quoted) return reply('❗ *Please Reply a Image to Continue* ')
 if (/image/.test(mime)) {
let media = await conn.downloadAndSaveMediaMessage(quoted)
const imgURL = await img2url(media)
await fs.unlinkSync(media)
 let rows = [
{
title : "ALIVE IMAGE",
description : "ꜱᴇᴛᴜᴘ ᴛᴏ ᴀʟɪᴠᴇ ɪᴍᴀɢᴇ",
id: prefix  + `setimg ALIVE_IMAGE=${imgURL}`
},
{
title : "MENU IMAGE",
description : "ꜱᴇᴛᴜᴘ ᴛᴏ ᴍᴇɴᴜ ɪᴍᴀɢᴇ",
id: prefix + `setimg MENU_IMAGE=${imgURL}`
},
{
title : "SYSTEM IMAGE",
description : "ꜱᴇᴛᴜᴘ ᴛᴏ ꜱʏꜱᴛᴇᴍ ɪᴍᴀɢᴇ",
id: prefix +  `setimg SYSTEM_IMAGE=${imgURL}`
},
 {
                            title : "MAIN MENU IMAGE",
                            description : "ꜱᴇᴛᴜᴘ ᴛᴏ ᴍᴀɪɴ ɪᴍᴀɢᴇ",
                            id: prefix + `setimg MAIN_IMAGE=${imgURL}`
                            },
    {
    title : "DOWNLOAD MENU IMAGE",
    description : "ꜱᴇᴛᴜᴘ ᴛᴏ ᴅᴏᴡɴʟᴏᴀᴅ ɪᴍᴀɢᴇ",
    id: prefix + `setimg DOWNLOAD_IMAGE=${imgURL}`
    },
    {
    title : "SEARCH MENU IMAGE",
    description : "ꜱᴇᴛᴜᴘ ᴛᴏ ꜱᴇᴀʀᴄʜ ɪᴍᴀɢᴇ",
    id: prefix + `setimg SEARCH_IMAGE=${imgURL}`
    },
    {
    title : "GROUP MENU IMAGE",
    description : "ꜱᴇᴛᴜᴘ ᴛᴏ ɢʀᴏᴜᴘ ɪᴍᴀɢᴇ",
    id: prefix + `setimg GROUP_IMAGE=${imgURL}`
    },
        {
                title : "PROFILE MENU IMAGE",
                description : "ꜱᴇᴛᴜᴘ ᴛᴏ ᴘʀᴏꜰɪʟᴇ ɪᴍᴀɢᴇ",
                id: prefix + `setimg PROFILE_IMAGE=${imgURL}`
        },
                {
                    title : "CONVERT MENU IMAGE",
                    description : "ꜱᴇᴛᴜᴘ ᴛᴏ ᴄᴏɴᴠᴇʀᴛ ɪᴍᴀɢᴇ",
                    id: prefix + `setimg CONVERT_IMAGE=${imgURL}`
                    },
                    {
                        title : "OTHER MENU IMAGE",
                        description : "ꜱᴇᴛᴜᴘ ᴛᴏ ᴏᴛʜᴇʀ ɪᴍᴀɢᴇ",
                        id: prefix + `setimg OTHER_IMAGE=${imgURL}`
                        },
                      
                            {
                                title : "TEXT TO IMAGE MENU IMAGE",
                                description : "ꜱᴇᴛᴜᴘ ᴛᴏ ᴛᴇxᴛ ᴛᴏ ɪᴍᴀɢᴇ",
                                id: prefix + `setimg TEXT2IMAGE_IMAGE=${imgURL}`
                                },
                                {
                                    title : "EDIT MENU IMAGE",
                                    description : "ꜱᴇᴛᴜᴘ ᴛᴏ ᴇᴅɪᴛ ɪᴍᴀɢᴇ",
                                    id: prefix + `setimg EDIT_IMAGE=${imgURL}`
                                    }
]

            let buttons = [{
                  name: "single_select",
                   buttonParamsJson: JSON.stringify({
                        title: 'SELECT',
                        sections: [{
                            title: 'Please select',
                            highlight_label: '🛠️',
                            rows: rows

                        }]
})
}]
	   let opts = {
                image: imgURL,
                header: '',
                footer: 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ',
                body: '🧑‍🔧 *Cyber-X Images Update Tool* ⚙️'

            }

 return await conn.sendButtonMessage(from, buttons, m, opts)

} else {
 let rows = [
{
title : "ALIVE MESSAGE",
description : "ꜱᴇᴛᴜᴘ ᴛᴏ ᴀʟɪᴠᴇ ᴍᴇꜱꜱᴀɢᴇ",
id: prefix  + `setimg ALIVE_MESSAGE=${m.quoted.msg}`
},
{
title : "MENU MESSAGE",
description : "ꜱᴇᴛᴜᴘ ᴛᴏ ᴍᴇɴᴜ ᴍᴇꜱꜱᴀɢᴇ",
id: prefix + `setimg MENU_MESSAGE=${m.quoted.msg}`
},
{
title : "BOT NAME",
description : "ꜱᴇᴛᴜᴘ ᴛᴏ ʙᴏᴛ ɴᴀᴍᴇ",
id: prefix +  `setimg BOT_NAME=${m.quoted.msg}`
},
{
title : "STICKER PACK NAME",
description : "ꜱᴇᴛᴜᴘ ᴛᴏ ꜱᴛɪᴄᴋᴇʀ ᴘᴀᴄᴋ ɴᴀᴍᴇ",
id: prefix + `setimg S_PACK_NAME=${m.quoted.msg}`
},
{
title : "STICKER OWNER NAME",
description : "ꜱᴇᴛᴜᴘ ᴛᴏ ꜱᴛɪᴄᴋᴇʀ ᴏᴡɴᴇʀ ɴᴀᴍᴇ",
id: prefix +  `setimg S_OWNER_NAME=${m.quoted.msg}`
},
{
title : "OWNER NAME",
description : "ꜱᴇᴛᴜᴘ ᴛᴏ ᴏᴡɴᴇʀ ɴᴀᴍᴇ",
id: prefix + `setimg OWNER_NAME=${m.quoted.msg}`
},
{
title : "OWNER NUMBER",
description : "ꜱᴇᴛᴜᴘ ᴛᴏ ᴏᴡɴᴇʀ ɴᴜᴍʙᴇʀ",
id: prefix +  `setimg OWNER_NUMBER=${m.quoted.msg}`
}

]

            let buttons = [{
                  name: "single_select",
                   buttonParamsJson: JSON.stringify({
                        title: 'SELECT',
                        sections: [{
                            title: 'Please select',
                            highlight_label: '🛠️',
                            rows: rows

                        }]
})
}]
	   let opts = {
                image: '',
                header: '',
                footer: 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ',
                body: '🧑‍🔧 *Cyber-X Messages Update Tool* ⚙️'

            }

 return await conn.sendButtonMessage(from, buttons, m, opts)






}

} catch (e) {
reply(e)
l(e)
}
})

 

cmd({
    pattern: "system",
    react: "🖥️",
    alias: ["s_info"],
    desc: "To Check bot\'s System information",
    category: "main",
    use: '.system',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const ccp = await si.cpu()
const cinfo = await si.version()
let timee = await si.time()
const plat = os.hostname()
let data = await fetchJson('https://raw.githubusercontent.com/darkalphaxteam/CYBER-X-WHATSAPP-BOT/main/package.json')
 const db_pool = new DBM({
    db: config.DATABASE_URL
})
		const sysimg = await db_pool.get('SYSTEM_IMAGE')
		if ( ccp.brand.includes('Skylake') ) {
const infomsg = `🖥️  *CYBER-X 3.0 SYSTEM INFORMATIONS*  🖥️

🤖  *_Bot's System informations_*

1.  _Runtime -: ${runtime(process.uptime())}_
2.  _Ram Usage -: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
3.  _Bot Version -: 3.0.0 Beta Version_

📶  *_Server System informations_*

1.  _Platform : Scalingo_
2.  _Running OS : ${os.platform()}_
3.  _CPU Manufacture  -: ${ccp.manufacturer}_
4.  _CPU Brand -: ${ccp.brand}_
5.  _CPU Speed -: ${ccp.speed}_

⚙️  *_System Data Collector Engine_*

1. _Engine Version -: ${cinfo}_

💻  *_Running Server's information_*

1. _Server Time Zone -: ${timee.timezone}_
2. _Time Zone Name -: ${timee.timezoneName}_`
let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "SUBSCRIBE US",
                        url: "https://whatsapp.com/channel/0029Va5EQi7CRs1lXmZYKw0x",
                        merchant_url: "https://whatsapp.com/channel/0029Va5EQi7CRs1lXmZYKw0x"
                    }),
                },
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "FOLLOW US",
                        url: "https://github.com/darkalphaxteam",
                        merchant_url: "https://github.com/darkalphaxteam"
                    }),
                }
             
            ]
            let opts = {
                image: sysimg,
                header: '',
                footer: 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ',
                body: infomsg

            }
            return await conn.sendButtonMessage(from, buttons, m, opts)
}

if ( plat.length > 15 ) {
const infomsg = `🖥️  *CYBER-X 3.0 SYSTEM INFORMATIONS*  🖥️

🤖  *_Bot's System informations_*

1.  _Runtime -: ${runtime(process.uptime())}_
2.  _Ram Usage -: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
3.  _Bot Version -: 3.0.0 Beta Version_

📶  *_Server System informations_*

1.  _Platform : Heroku_
2.  _Running OS : ${os.platform()}_
3.  _CPU Manufacture  -: ${ccp.manufacturer}_
4.  _CPU Brand -: ${ccp.brand}_
5.  _CPU Speed -: ${ccp.speed}_

⚙️  *_System Data Collector Engine_*

1. _Engine Version -: ${cinfo}_

💻  *_Running Server's information_*

1. _Server Time Zone -: ${timee.timezone}_
2. _Time Zone Name -: ${timee.timezoneName}_`
let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "SUBSCRIBE US",
                        url: "https://whatsapp.com/channel/0029Va5EQi7CRs1lXmZYKw0x",
                        merchant_url: "https://whatsapp.com/channel/0029Va5EQi7CRs1lXmZYKw0x"
                    }),
                },
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "FOLLOW US",
                        url: "https://github.com/darkalphaxteam",
                        merchant_url: "https://github.com/darkalphaxteam"
                    }),
                }
             
            ]
            let opts = {
                image: sysimg,
                header: '',
                footer: 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ',
                body: infomsg

            }
            return await conn.sendButtonMessage(from, buttons, m, opts)
}


const infomsg = `🖥️  *CYBER-X 3.0 SYSTEM INFORMATIONS*  🖥️

🤖  *_Bot's System informations_*

1.  _Runtime -: ${runtime(process.uptime())}_
2.  _Ram Usage -: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
3.  _Bot Version -: 3.0.0 Beta Version_

📶  *_Server System informations_*

1.  _Platform : ${plat}_
2.  _Running OS : ${os.platform()}_
3.  _CPU Manufacture  -: ${ccp.manufacturer}_
4.  _CPU Brand -: ${ccp.brand}_
5.  _CPU Speed -: ${ccp.speed}_

⚙️  *_System Data Collector Engine_*

1. _Engine Version -: ${cinfo}_

💻  *_Running Server's information_*

1. _Server Time Zone -: ${timee.timezone}_
2. _Time Zone Name -: ${timee.timezoneName}_`
 let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "SUBSCRIBE US",
                        url: "https://whatsapp.com/channel/0029Va5EQi7CRs1lXmZYKw0x",
                        merchant_url: "https://whatsapp.com/channel/0029Va5EQi7CRs1lXmZYKw0x"
                    }),
                },
                {
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "FOLLOW US",
                        url: "https://github.com/darkalphaxteam",
                        merchant_url: "https://github.com/darkalphaxteam"
                    }),
                }
             
            ]
            let opts = {
                image: sysimg,
                header: '',
                footer: 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ',
                body: infomsg

            }
            return await conn.sendButtonMessage(from, buttons, m, opts)

}catch (e) {
const ccp = await si.cpu()
const cinfo = await si.version()
let timee = await si.time()
const plat = os.hostname()
let data = await fetchJson('https://raw.githubusercontent.com/darkalphaxteam/CYBER-X-WHATSAPP-BOT/main/package.json')

if ( plat.length > 15 ) {
const infomsg = `🖥️  *CYBER-X 3.0 SYSTEM INFORMATIONS*  🖥️

🤖  *_Bot's System informations_*

1.  _Runtime -: ${runtime(process.uptime())}_
2.  _Ram Usage -: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
3.  _Bot Version -: 3.0.0 Beta Version_

📶  *_Server System informations_*

1.  _Platform : Heroku_
2.  _Running OS : ${os.platform()}_
3.  _CPU Manufacture  -: ${ccp.manufacturer}_
4.  _CPU Brand -: ${ccp.brand}_
5.  _CPU Speed -: ${ccp.speed}_

⚙️  *_System Data Collector Engine_*

1. _Engine Version -: ${cinfo}_

💻  *_Running Server's information_*

1. _Server Time Zone -: ${timee.timezone}_
2. _Time Zone Name -: ${timee.timezoneName}_`
return await conn.sendMessage(from , { text: infomsg  }, { quoted: mek } )

}


const infomsg = `🖥️  *CYBER-X 3.0 SYSTEM INFORMATIONS*  🖥️

🤖  *_Bot's System informations_*

1.  _Runtime -: ${runtime(process.uptime())}_
2.  _Ram Usage -: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
3.  _Bot Version -: 3.0.0 Beta Version_

📶  *_Server System informations_*

1.  _Platform : ${plat}_
2.  _Running OS : ${os.platform()}_
3.  _CPU Manufacture  -: ${ccp.manufacturer}_
4.  _CPU Brand -: ${ccp.brand}_
5.  _CPU Speed -: ${ccp.speed}_

⚙️  *_System Data Collector Engine_*

1. _Engine Version -: ${cinfo}_

💻  *_Running Server's information_*

1. _Server Time Zone -: ${timee.timezone}_
2. _Time Zone Name -: ${timee.timezoneName}_`
 await conn.sendMessage(from , { text: infomsg  }, { quoted: mek } )


}
})

cmd({
    pattern: "setupimage",
    react: "⚙",
    alias: ["setimg"],
    desc: "Cyber-X Database Tools",
    category: "main",
    use: '.setup ALIVE_MESSAGE=Hi',
    dontAddCommandList : true ,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag, db_pool, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if(!isCreator) { if ( !isDev) return conn.sendMessage(from,{text:"🚫 *This is Moderator only Command*"},{quoted:mek }) }
if ( !q ) return reply('🧑‍💻  *Please add Valid Database Var with Text*  ❗\n\n📌 Ex -: ```.setup ALIVE_MESSAGE=Hii How Are you Im Alive```\n\n⚠️ *Dont add space befor and after the "=" Symbol*')
if (q.split('=')[0].endsWith(' ')) return reply('🚫 *Dont Add space After the "=" Symbol*')
if (q.split('=')[1].startsWith(' ')) return  reply('🚫 *Dont add Space before the "=" Symbol*')
const icon = q.split("=")[0] 
const data = q.split("=")[1] 
if ( !icon && !data ) reply('🚫 *Sorry ... Text in Error ! Please Add Valid Database Updating Message*')
		const db_pool = new DBM({
    db: config.DATABASE_URL
})
		await db_pool.insert( icon , data )
			await conn.sendMessage(from,{text: "*Database*  ```" + icon + "```  *Updated ✔️*"},{quoted:mek })
	
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
l(e)
}
})

cmd({
    pattern: "ping",
    react: "📟",
    alias: ["speed","cyber_ping"],
    desc: "To Check bot's ping",
    category: "main",
    use: '.ping',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
var inital = new Date().getTime();
let ping = await conn.sendMessage(from , { text: '*Pinging the System...* ❗'  } )
var final = new Date().getTime();
return await conn.sendMessage(from, { text : '💡 *Pong ' + (final - inital) + ' Ms* '  })
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "device",
    react: "ℹ️",
    alias: ["getdevice"],
    desc: "Cyber-X User Checking Tool",
    category: "main",
    use: '.device',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if ( !isCreator ) { if (!isDev) return reply('ℹ️ *Sorry ! This is Owner only Command..*') }
if ( !m.quoted ) return reply('ℹ️ *Please reply a Message...*')
if (m.quoted.id.startsWith("3A")) {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Ios WhatsApp(i Phone)${ss}`, 
      mentions : [m.quoted.sender]
    });
} else if (m.quoted.id.startsWith("3EB")) {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Web WhatsApp${ss}`, 
      mentions : [m.quoted.sender]
    });
} else if (m.quoted.id.startsWith("BAE")) {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Web WhatsApp(Wiskeysockets/Baileys-WA-Web-Api)${ss}`, 
      mentions : [m.quoted.sender]
    });
} else if (m.quoted.id.startsWith("QUEENAMDI")) {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Web WhatsApp(QueenAmdi-Wa-Bot)${ss}`, 
      mentions : [m.quoted.sender]
    });
  } else if (m.quoted.id.startsWith("CYBER2")) {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Web WhatsApp(Cyber-X-Wa-Bot)${ss}`, 
      mentions : [m.quoted.sender]
    });
} else if (m.quoted.id.startsWith("ZEROTWO")) {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Web WhatsApp(ZeroTwo-Md-Wa-Bot)${ss}`, 
      mentions : [m.quoted.sender]
    });
} else if (m.quoted.id.startsWith("QUEENELISA")) {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Web WhatsApp (QueenElisa-Wa-Bot)${ss}`, 
      mentions : [m.quoted.sender]
    });
} else {
  var ss= '```'
 conn.sendMessage(from, { 
      text : `@${m.quoted.sender.split('@')[0]}  *Is Using:* ${ss}Android WhatsApp ${ss}`, 
      mentions : [m.quoted.sender]
    });
}
} catch (e) {
reply('⛔ *Error accurated !!*\n\n'+ e )
l(e)
}
})

cmd({
    pattern: "id",
    react: "📚",
    alias: ["getdeviceid"],
    desc: "Cyber-X User Checking Tool",
    category: "main",
    use: '.id',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if ( !isCreator ) { if (!isDev) return reply('ℹ️ *Sorry ! This is Owner only Command..*') }
if ( !m.quoted ) return reply('ℹ️ *Please reply a Message...*')
reply(m.quoted.id)
} catch (e) {
reply('⛔ *Error accurated !!*\n\n'+ e )
l(e)
}
})


cmd({
    pattern: "owner",
    react: "✈",
    alias: ["ownernumber"],
    desc: "Get Bot Owner Number",
    category: "main",
    use: '.owner',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
       const db_pool = new DBM({
    db: config.DATABASE_URL
}) 
 const data = await db_pool.get('OWNER_NAME')
  let puka = await db_pool.get('OWNER_NUMBER')
 const vcard = `BEGIN:VCARD\n` // metadata of the contact card
            + `VERSION:3.0\n`
            + `FN:${data}\n` // full name
            + `ORG:CYBER-X GANG 2023;\n`// the organization of the contact
            + `TEL;type=CELL;type=VOICE;waid=${puka}:+${puka}\n`// WhatsApp ID + phone number
            + `END:VCARD`
await conn.sendMessage(from,{ contacts: { displayName: data ,contacts: [{ vcard }] }},{quoted:mek })
} catch (e) {
await conn.sendMessage(from,{text: "*❗ No Added Data in Database*\n\n_Please Do this to Use Your Number for this Vcard_\n\n1. ```.apply OWNER_NUMBER=YOUR NUMBER```\n2. ```.apply OWNER_NAME=YOUR NAME```\n\nᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ  ᴏꜰꜰɪᴄɪᴀʟ\nᴄʏʙᴇʀ-x ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ - ɪɪ" },{quoted:mek })
const vcard = `BEGIN:VCARD\n` // metadata of the contact card
            + `VERSION:3.0\n`
            + `FN:CYBER-X USER\n` // full name
            + `ORG:CYBER-X GANG 2023;\n`// the organization of the contact
            + `TEL;type=CELL;type=VOICE;waid=94711421243:+94711421243\n`// WhatsApp ID + phone number
            + `END:VCARD`
await conn.sendMessage(from,{ contacts: { displayName: "CYBER-X USER" ,contacts: [{ vcard }] }},{quoted:mek })

}
})

