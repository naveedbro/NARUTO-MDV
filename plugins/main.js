const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const { DBM } = require('postgres_dbm')
const os = require("os")
const si = require('systeminformation')
cmd({
    pattern: "alive",
    react: "👋🏻",
    alias: ["online","test","bot"],
    desc: "To Get Bot's Alive Message",
    category: "main",
    use: '.alive',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const db_pool = new DBM({
    db: config.DATABASE_URL
})
		const data = await db_pool.get('ALIVE_MESSAGE')
		let logoimage = await db_pool.get('ALIVE_IMAGE')
await conn.sendMessage(from, { image: { url: logoimage }, caption: data }, { quoted: mek })
} catch (e) {
const data = await fetchJson("https://raw.githubusercontent.com/naveedbro/UPLOADS/main/JSON/info.json")
await conn.sendMessage(from, { image: { url: data.image }, caption: data.text }, { quoted: mek })
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
let data = await fetchJson('https://raw.githubusercontent.com/naveedbro/NARUTO-MD/main/package.json')

if ( plat.length > 15 ) {
const infomsg = `🖥️  *NARUTO-MD SYSTEM INFORMATIONS*  🖥️

🤖  *_Bot's System informations_*

1.  _Runtime -: ${runtime(process.uptime())}_
2.  _Ram Usage -: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
3.  _Bot Version -: ${data.version} Stable_

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


const infomsg = `🖥️  *NARUTO-MD SYSTEM INFORMATIONS*  🖥️

🤖  *_Bot's System informations_*

1.  _Runtime -: ${runtime(process.uptime())}_
2.  _Ram Usage -: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB_
3.  _Bot Version -: ${data.version} Stable_

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

}catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "menu",
    react: "📁",
    alias: ["panel","help","cmd"],
    desc: "Bot main command list menu",
    category: "main",
    use: '.menu',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
const db_pool = new DBM({
    db: config.DATABASE_URL
}) 
 const data = await db_pool.get('MENU_TEXT')
await conn.sendMessage(from, { audio: { url: 'https://github.com/naveedbro/UPLOADS/raw/main/LocalData/audio/alive.mp3' }, mimetype: 'audio/mp4', ptt : true ,fileName: 'alive.mp3' })
const yt =`
📑 *NARUTO WHATSAPP BOT COMMANDS LIST*

${data} 

🔠 _Please reply a number to get you need Sub-Menu All commands available in allmenu ._

───────────────────────────── 

  1.1  Main Command list
  1.2  Download command list
  1.3  Search Command list
  1.4  Profile Command ist
  1.5  Group Command list
  1.6  Extra Command list
  1.7  Text to Image Command list
  1.8  Photo edit Command list

*ɴᴀʀᴜᴛᴏ-ᴍᴅ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀɴᴅᴇᴠᴇʟᴏᴘ*`

await conn.sendMessage(from,{text: yt },{quoted:mek })

} catch (e) {
const yt =`
📑 *NARUTO WHATSAPP BOT COMMANDS LIST*

📚 This is the result of our team's hard work and our team owns the bot's rights and code rights. Therefore, you have no chance to change and submit our bot under any circumstances

🔠 _Please reply a number to get you need Sub-Menu All commands available in allmenu ._

───────────────────────────── 

  1.1  Main Command list
  1.2  Download command list
  1.3  Search Command list
  1.4  Profile Command ist
  1.5  Group Command list
  1.6  Extra command list
  1.7  Text to Image command list

*ɴᴀʀᴜᴛᴏ-ᴍᴅ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀɴᴅᴇᴠᴇʟᴏᴘ*`

await conn.sendMessage(from,{text: yt },{quoted:mek })

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
            + `ORG: NARUTO-MD TEAM 2024;\n`// the organization of the contact
            + `TEL;type=CELL;type=VOICE;waid=${puka}:+${puka}\n`// WhatsApp ID + phone number
            + `END:VCARD`
await conn.sendMessage(from,{ contacts: { displayName: data ,contacts: [{ vcard }] }},{quoted:mek })
} catch (e) {
await conn.sendMessage(from,{text: "*❗ No Added Data in Database*\n\n_Please Do this to Use Your Number for this Vcard_\n\n1. ```.apply OWNER_NUMBER=YOUR NUMBER```\n2. ```.apply OWNER_NAME=YOUR NAME```\n\nʀɴᴅᴇᴠᴇʟᴏᴘ  ᴏꜰꜰɪᴄɪᴀʟ\nɴᴀʀᴜᴛᴏ-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ" },{quoted:mek })
const vcard = `BEGIN:VCARD\n` // metadata of the contact card
            + `VERSION:3.0\n`
            + `FN:NARUTO-MD USER\n` // full name
            + `ORG:NARUTO-MD TEAM 2024;\n`// the organization of the contact
            + `TEL;type=CELL;type=VOICE;waid=94711421243:+94711421243\n`// WhatsApp ID + phone number
            + `END:VCARD`
await conn.sendMessage(from,{ contacts: { displayName: "NARUTO-MD USER" ,contacts: [{ vcard }] }},{quoted:mek })

}
})

cmd({
    pattern: "script",
    react: "🧭",
    alias: ["sc","repo","git"],
    desc: "To Get Naruto-Md Bot Script",
    category: "main",
    use: '.script',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
const deta = await fetchJson('https://api.github.com/repos/naveedbro/NARUTO-MD')
let data = await fetchJson('https://raw.githubusercontent.com/naveedbro/NARUTO-MD/main/package.json')
const maru =`*NARUTO-MD WHATSAPP USER BOT* 

This is the result of our team's hard work and our team owns the bot's rights and code rights. Therefore, you have no chance to change and submit our bot under any circumstances.

https://github.com/naveedbro/NARUTO-MD

*─────────────────────*
🍥 *Naruto-Md Repostory Status*
*─────────────────────*

*️⃣ Stars - ${deta.stargazers_count}
🔀 Forks - ${deta.forks_count}
💫 Watchers - ${deta.subscribers_count}

*─────────────────────*

*ɴᴀʀᴜᴛᴏ-ᴍᴅ ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀɴᴅᴇᴠᴇʟᴏᴘ*`
await conn.sendMessage(from,
{text: maru ,
contextInfo:{
        externalAdReply:{
            title: "NARUTO-MD BOT REPO" ,
            body: `Latest released Version : v${data.version}`,
            thumbnail: await getBuffer("https://telegra.ph/file/fee375e711ade5064e3b6.jpg"),
            mediaType:2,
            mediaUrl: "https://github.com/naveedbro/NARUTO-MD",
        }
}
    },

{quoted:mek })
} catch (e) {
reply('*Error !!*')
l(e)
}
})
