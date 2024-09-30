const config = require('../config')
const fg = require('api-dylux');
const getFBInfo = require("fb-downloader-new")
const l = console.log
const { cmd, commands } = require('../command')
const dl = require('@bochilteam/scraper')  
const ytdl = require('youtubedl-core')
var { yt5s }  = require('@sl-code-lords/youtube-dl')
const { mediafireDl } = require('mfiredlcore-vihangayt')
const axios = require('axios')
const fs = require('fs-extra')
var videotime = 60000 // 1000 min
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')

cmd({
    pattern: "td",
    alias: ["threads","treds"],
    react: '🌀',
    desc: "Download threads videos/photos.",
    category: "download",
    use: '.threads < Threads link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
 if (!q) return reply('*Please give me a Threads Link !*')
 if ( !q.includes('threads') ) return reply('❌ *Please enter Valid threads Video/image Link*')
 const data = await axios.get(`https://queen-elisa-api.vercel.app/api/download/threads?link=${q}&apikey=cyber-x`)
  var type = data.data.data.downoad_links[0].type
  var link = data.data.data.downoad_links[0].link
  const captionMsg = await conn.sendMessage(from,{ image : { url : data.data.data.author.pic }, caption : `*author : _${data.data.data.author.name}_*\n\n${data.data.data.caption}` },{quoted : mek });
 if (type == "video" ) {
return await conn.sendMessage(from, { video: {url: link }  }, { quoted: captionMsg })  
}
 if (type == "image" ) {
return await conn.sendMessage(from, { image: { url : link }  }, { quoted: captionMsg })
}
 } catch (e) {
reply('*Error !!*\n\n' + e )
l(e)
}
})

cmd({
    pattern: "fb",
    react: "🔎",
    alias: ["fbdl"],
    desc: "Facebook Video downloader",
    category: "download",
    use: '.fb [ Link ]',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, prefix , command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if ( !q ) return reply('ℹ *Please enter Facebook Media Link*')
/*if ( !q.includes('fb.watch') ) {
if ( !q.includes('facebook') ) return reply('❌ *Please enter Valid facebook Video Url*')
}
*/
const fbdata = await getFBInfo(q)
const fbdl = await fg.fbdl(q)
const msgg =`
*CYBER-X FB DOWNLOADER* 📥
 
*🎬 Title -: ${fbdl.title}*

🖇️ Link -: ${q}`
let buttons = [{
                    name: "cta_url",
                    buttonParamsJson: JSON.stringify({
                        display_text: "Watch on Facebook",
                        url: q ,
                        merchant_url: q
                    }),
                },
                
                {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "HD Quality",
                        id: prefix + `fbhd ${q}`
                    }),
                },
                 {
                    name: "quick_reply",
                    buttonParamsJson: JSON.stringify({
                        display_text: "SD Quality",
                        id: prefix + `fbsd ${q}`
                    }),
                }
            ]
            let opts = {
                image: fbdata.thumbnail ,
                header: '',
                footer: 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ',
                body: msgg

            }
            return await conn.sendButtonMessage(from, buttons, m, opts)



} catch (e) {
reply("❌ " + e)
}

})
cmd({  
    pattern: "fbhd",
    react: "🔄️",
    alias: ["facebookdlhd"],
    desc: "Facebook video downloader main",
    category: "download",
    use: '.fbhd [Link] ',
    dontAddCommandList : true ,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag, db_pool, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if ( !q ) return reply('❗ *Please enter Facebook video Link*')
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
}
const fbdsl =  await getFBInfo(q)
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬆️`, key: mek.key }})
}

const msg = await conn.sendMessage(from, { video: {url: fbdsl.hd }, caption: `\n*HD Quality*` }, { quoted: mek }) 
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

cmd({  
    pattern: "fbsd",
    react: "🔄️",
    alias: ["facebookdlhd"],
    desc: "Facebook video downloader main",
    category: "download",
    use: '.fbsd [Link]',
    dontAddCommandList : true ,
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag, db_pool, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if ( !q ) return reply('❗ *Please enter Facebook video Link*')
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
}
const fbdsl =  await getFBInfo(q)
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬆️`, key: mek.key }})
}

const msg = await conn.sendMessage(from, { video: {url: fbdsl.sd }, caption: `\n*SD Quality*` }, { quoted: mek }) 
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

cmd({  
    pattern: "facebook",
    react: "🔄️",
    alias: ["facebookdl"],
    desc: "Facebook video downloader main",
    category: "download",
    use: '.facebook [Link]',
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

cmd({
    pattern: "mediafire",
    alias: ["mfire","mf","cyber_mf"],
    react: '📁',
    desc: "Download mediafire files.",
    category: "download",
    use: '.mediafire <mediafire link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if (!q) return reply('*Please give me a mediafire Link*')
if (!q.includes('mediafire.com')) return reply('*Please give me a mediafire Link*')
if (!q.includes('/file')) return reply('*Please give me a mediafire url*')
const baby1 = await mediafireDl(q)
if(baby1.size.includes('MB') && baby1.size.replace('MB','') > config.MAX_SIZE) return reply("❌ ```Unable to upload this file according to your Platform's Upload Size```❗\n\n*_Please update your MAX_SIZE var on the Upload Size on your platform_* ❗🧑‍💻")
//if(baby1.size.includes('GB')) return reply("❌ ```Unable to upload this file according to your Platform's Upload Size```❗\n\n*_Please update your MAX_SIZE var on the Upload Size on your platform_* ❗🧑‍💻")
const mfile = conn.sendMessage(from, { document : { url : baby1.link}, fileName : baby1.name, mimetype: baby1.mime,caption: `*🧸 File Name* : ${baby1.name}
*📊 File Size* : ${baby1.size}
*🕹️ File Type* : ${baby1.mime}`}, {quoted: mek})	
await conn.sendMessage(from, { react: { text: '📁', key: mfile.key }})
} catch (e) {
reply('*Error !!*')
l(e)
}
})

cmd({
    pattern: "gdrive",
    alias: ["googledrive","gd","cyber_gdd"],
    react: '📑',
    desc: "Download googledrive files.",
    category: "download",
    use: '.gdrive <googledrive link>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
  if (!q) return reply('*Please give me googledrive url...!!*')   
let res = await fg.GDriveDl(q)
reply(`\n⬇️  *CYBER-X GDRIVE DOWNLOADER*  ⬇️

*📃 File name:*  ${res.fileName}
*💈 File Size:* ${res.fileSize}
*🕹️ File type:* ${res.mimetype}

*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*`)		
conn.sendMessage(from, { document: { url: res.downloadUrl }, fileName: res.fileName, mimetype: res.mimetype }, { quoted: mek })
} catch (e) {
reply('*Error..! Your Url is Private. Please Public It*')
l(e)
}
})