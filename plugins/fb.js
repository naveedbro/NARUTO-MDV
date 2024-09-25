const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const fs=require('fs')
const fg = require('api-dylux')
const getFBInfo = require("fb-downloader-new");


cmd({
    pattern: "fb",
    react: "🔎",
    alias: ["fbdl"],
    desc: "Facebook Video downloader",
    category: "download",
    use: '.fb [ Link ]',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if ( !q ) return reply('ℹ *Please enter Facebook Media Link*')
/*if ( !q.includes('fb.watch') ) {
if ( !q.includes('facebook') ) return reply('❌ *Please enter Valid facebook Video Url*')
}
*/
const fbdata = await getFBInfo(q)
const msgg =`
*CYBER-X FB DOWNLOADER* 📥
 
*🎬 Title -: ${fbdata.title}*

🖇️ *_Link -: ${q}_*

──────────────────────
*ᴘʟᴇᴀꜱᴇ ʀᴇᴘʟʏ ᴀ ɴᴜᴍʙᴇʀ ꜰᴏʀ ᴅᴏᴡɴʟᴏᴀᴅ ʏᴏᴜ ɴᴇᴇᴅ ᴛʏᴘᴇ*

*│ 🎥 1 - SD Quality*
*│ 🎬 2 - HD Quality*

*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*`

await conn.sendMessage(from, { image: { url : fbdata.thumbnail } , caption: msgg }, { quoted: mek })

} catch (e) {
reply("❌ " + e)
}

})


cmd({  
    pattern: "facebook",
    react: "🔄️",
    alias: ["facebookdl"],
    desc: "Facebook video downloader main",
    category: "download",
    use: '.fb',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag, db_pool, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if ( !q ) return reply('❗ *Please enter Facebook video Link*')
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
}
const fbdsl = await fg.fbdl(q)
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬆️`, key: mek.key }})
}

const msg = await conn.sendMessage(from, { video: {url: fbdsl.videoUrl }, caption: `*${fbdsl.title}*` }, { quoted: mek }) 
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `☑️`, key: mek.key }})
await conn.sendMessage(from, { react: { text: "📹", key: msg.key }})
}
} catch (e) {
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⛔️`, key: mek.key }})
}

reply('⛔ ```Sorry ! Error detected```\n\n*_Your url is Not Valid... Please use Valid url_* 🧑‍🔧')
l(e)
}
})
