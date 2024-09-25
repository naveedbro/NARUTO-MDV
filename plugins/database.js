const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const { DBM } = require('postgres_dbm')

cmd({
    pattern: "mysettings",
    react: "⚙️",
    alias: ["allset"],
    desc: "To Get the Aot All Settings List",
    category: "main",
    use: '.allsettings',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
const db_pool = new DBM({
    db: config.DATABASE_URL
})
const eka = await db_pool.get('ALIVE_MESSAGE')
const deka = await db_pool.get('ALIVE_IMAGE')
let thuna = await db_pool.get('OWNER_NAME')
const hathara = await db_pool.get('OWNER_NUMBER')
const paha = await db_pool.get('S_PACK_NAME')
let haya = await db_pool.get('S_OWNER_NAME')


let puka = `🛠️ *Hey This is Your All Setting List* ⚙️

🛠️ *Bot Mode* - ${config.WORK_TYPE}
🛠️ *Alive Message* - ${eka}
🛠️ *Alive Image* -  ${deka}
🛠️ *Owner Name* -  ${thuna}
🛠️ *Owner Number* - ${hathara}
🛠️ *Sticker Pack Name* - ${paha}
🛠️ *Sticker Owner Name* - ${haya}
🛠️ *Antilink Mode* - ${config.ANTI_LINK}
🛠️ *Anti Bad Mode* -${config.ANTI_BAD}
🛠️ *Bot Detect Mode* - ${config.BOT_DETECT}
🛠️ *Anti Bot Mode* - ${config.ANTI_BOT}
🛠️ *Auto Read Mode* - ${config.AUTO_MSG_READ}
🛠️ *Auto React Mode* - ${config.AUTO_REACT}
🛠️ *Moderator Numbers* - ${config.MODERATORS}
🛠️ *Inbox User* - ${config.INBOX_USER}
🛠️ *Banned User* - ${config.BANNED_USER}

*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*`
 await conn.sendMessage(from , { text: puka }, { quoted: mek } )

} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
l(e)
}
})

cmd({
    pattern: "setup",
    react: "⚙",
    alias: ["set"],
    desc: "Cyber-X Database Tools",
    category: "main",
    use: '.setup',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag, db_pool, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if(!isCreator) { if ( !isDev) return conn.sendMessage(from,{text:"🚫 *This is Moderator only Command*"},{quoted:mek }) }
if ( !m.quoted ) return reply('🧑‍💻  *Please quote a Text to Update the DB*')
		const db_pool = new DBM({
    db: config.DATABASE_URL
})
		await db_pool.insert( `${senderNumber}DB` , m.quoted.msg )
		const eka = `\n🧑‍🔧 *Cyber-X Details Update Tool* ⚙️

_You can add quoted text as more title.Please check some quoted message's Templates_

─────────────────────────────
*ᴘʟᴇᴀꜱᴇ ʀᴇᴘʟʏ ᴀ ɴᴜᴍʙᴇʀ ꜰᴏʀ ʏᴏᴜ ɴᴇᴇᴅ*

*│ 1.1 - Set as Alive message*
*│ 1.2 - Set as Owner number*
*│ 1.3 - Set as Owner name*
*│ 1.4 - Set as Openai key*
*│ 1.5 - Set as main menu Text*
*│ 1.6 - Set as Stickers owner name*
*│ 1.7 - Set as Stickers pack name*

ᴄʏʙᴇʀ-x ᴄᴏɴꜰɪɢᴜʀᴀᴛɪᴏɴ ᴛᴏᴏʟ
ᴜꜱᴇʀ ɪᴅ - ${senderNumber}`
			await conn.sendMessage(from,{text: eka },{quoted:mek })
	
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
l(e)
}
})

