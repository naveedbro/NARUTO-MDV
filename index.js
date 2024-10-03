const {
default: makeWASocket,
useMultiFileAuthState,
fetchLatestBaileysVersion,
DisconnectReason,
downloadContentFromMessage,
jidNormalizedUser,
Browsers,
delay,
prepareWAMessageMedia,
generateWAMessageFromContent,
getContentType,
getDevice,
proto
} = require('@whiskeysockets/baileys')
const fs = require('fs')
const logger = require('pino')()
const P = require('pino')
const pino = require('pino')
const config = require('./config')
const NodeCache = require( "node-cache" )
const msgRetryCounterCache = new NodeCache()
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
const prefix = "."//config.PREFIX 
const ownerNumber = ['595995660558']
const l = console.log

// ===========SESSION===========
if (!fs.existsSync(__dirname + '/auth_info_baileys/creds.json')) {
if(!config.SESSION_ID) return console.log('Please add your session to SESSION_ID env !!')
const sessdata = config.SESSION_ID.split("naruto-md@;;;")[1]
const filer = File.fromURL(`https://mega.nz/file/${sessdata}`)
filer.download((err, data) => {
if(err) throw err
fs.writeFile(__dirname + '/auth_info_baileys/creds.json', data, () => {
console.log("🖇️ Authfiles Successfully loaded !!")
})})}
// <<==========PORTS===========>>
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
//====================================

async function connectToWA() {
const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys/')
const { version, isLatest } = await fetchLatestBaileysVersion()
console.log(`🤖 Defaultly using WA v${version.join('.')}, isLatest: ${isLatest}`)

   const conn = makeWASocket({
      version,
      logger: pino({ level: 'silent' }),
      printQRInTerminal: false, 
      browser: ["Ubuntu", "Chrome", "20.0.04"],
      auth: state,
      msgRetryCounterCache,
   });
conn.ev.on('connection.update', (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') {
if (lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut) {
connectToWA()
}
} else if (connection === 'open') {
console.log('✅ Plugin installing in process...')
const path = require('path');
fs.readdirSync("./plugins/").forEach((plugin) => {
if (path.extname(plugin).toLowerCase() == ".js") {
require("./plugins/" + plugin);
}
});
console.log('📚 All Plugins installed....')
console.log('🔊 Naruto-Md Connected To WhatsApp ✅')
delay(100);
const botada = jidNormalizedUser(conn.user.id)   
conn.sendMessage(botada, { image: { url : "https://i.imgur.com/oGKOTrX.jpeg" } , caption: "𝗡𝗔𝗥𝗨𝗧𝗢-𝗠𝗗 𝗖𝗢𝗡𝗡𝗘𝗖𝗧𝗘𝗗 𝗧𝗢 𝗪𝗛𝗔𝗧𝗦𝗔𝗣𝗣 ✅\n\n*This is the result of our team's hard work and our team owns the bot's rights and code rights. Therefore, you have no chance to change and submit our bot under any circumstances.*\n\n🔰 *Official GitHub* - ```https://github.com/naveedbro```\n\n🪀 *WhatsApp Channel* - ```https://whatsapp.com/channel/0029VaUbFyXBFLgYH9g6S83a```"})
}
})
conn.ev.on('creds.update', saveCreds)
conn.ev.on('messages.upsert', async(mek) => {
try {
mek = mek.messages[0]
//console.log(JSON.stringify(mek,null,2))
if (!mek.message) return	
mek.message = (getContentType(mek.message) === 'ephemeralMessage') ? mek.message.ephemeralMessage.message : mek.message
//if (mek.key && mek.key.remoteJid === 'status@broadcast') return
const m = sms(conn, mek)
const type = getContentType(mek.message)
const content = JSON.stringify(mek.message)
const from = mek.key.remoteJid
const mentionByTag = type == 'extendedTextMessage' && mek.message.extendedTextMessage.contextInfo != null ? mek.message.extendedTextMessage.contextInfo.quotedMessage || [] : []
const quoted = mek.quoted ? mek.quoted : mek
const body = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text :(type == 'interactiveResponseMessage' ) ? mek.message.interactiveResponseMessage  && mek.message.interactiveResponseMessage.nativeFlowResponseMessage && JSON.parse(mek?.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson) && JSON.parse(mek?.message?.interactiveResponseMessage?.nativeFlowResponseMessage?.paramsJson).id :(type == 'templateButtonReplyMessage' )? mek.message.templateButtonReplyMessage && mek.message.templateButtonReplyMessage.selectedId  : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : ''
const isCmd = body.startsWith(config.PREFIX)
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ''
const args = body.trim().split(/ +/).slice(1)
const q = args.join(' ')
const isGroup = from.endsWith('@g.us')
const sender = mek.key.fromMe ? (conn.user.id.split(':')[0]+'@s.whatsapp.net' || conn.user.id) : (mek.key.participant || mek.key.remoteJid)
const senderNumber = sender.split('@')[0]
const botNumber = conn.user.id.split(':')[0]
const pushname = mek.pushName || 'Naruto-Md User'
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
            const isAnti = (teks) => {
                let getdata = teks
                for (let i = 0; i < getdata.length; i++) {
                    if (getdata[i] === from) return true
                }
                return false
            }
const reply = (teks) => {
 conn.sendMessage(from, { text: teks }, { quoted: mek })
}


const ownerdata = (await axios.get('https://raw.githubusercontent.com/naveedbro/UPLOADS/main/raw.json')).data
            config.LOGO = ownerdata.imageurl
            config.BTN = ownerdata.button
            config.FOOTER = ownerdata.footer
            config.BTNURL = ownerdata.buttonurl
            conn.edit = async (mek, newmg) => {
                await conn.relayMessage(from, {
                    protocolMessage: {
                        key: mek.key,
                        type: 14,
                        editedMessage: {
                            conversation: newmg
                        }
                    }
                }, {})
            }
            conn.sendFileUrl = async (jid, url, caption, quoted, options = {}) => {
                let mime = '';
                let res = await axios.head(url)
                mime = res.headers['content-type']
                if (mime.split("/")[1] === "gif") {
                    return conn.sendMessage(jid, {
                        video: await getBuffer(url),
                        caption: caption,
                        gifPlayback: true,
                        ...options
                    }, {
                        quoted: quoted,
                        ...options
                    })
                }
                let type = mime.split("/")[0] + "Message"
                if (mime === "application/pdf") {
                    return conn.sendMessage(jid, {
                        document: await getBuffer(url),
                        mimetype: 'application/pdf',
                        caption: caption,
                        ...options
                    }, {
                        quoted: quoted,
                        ...options
                    })
                }
                if (mime.split("/")[0] === "image") {
                    return conn.sendMessage(jid, {
                        image: await getBuffer(url),
                        caption: caption,
                        ...options
                    }, {
                        quoted: quoted,
                        ...options
                    })
                }
                if (mime.split("/")[0] === "video") {
                    return conn.sendMessage(jid, {
                        video: await getBuffer(url),
                        caption: caption,
                        mimetype: 'video/mp4',
                        ...options
                    }, {
                        quoted: quoted,
                        ...options
                    })
                }
                if (mime.split("/")[0] === "audio") {
                    return conn.sendMessage(jid, {
                        audio: await getBuffer(url),
                        caption: caption,
                        mimetype: 'audio/mpeg',
                        ...options
                    }, {
                        quoted: quoted,
                        ...options
                    })
                }
            }
            conn.sendButtonMessage = async (jid, buttons, quoted, opts = {}) => {

                let header;
                if (opts?.video) {
                    var video = await prepareWAMessageMedia({
                        video: {
                            url: opts && opts.video ? opts.video : ''
                        }
                    }, {
                        upload: conn.waUploadToServer
                    })
                    header = {
                        title: opts && opts.header ? opts.header : '',
                        hasMediaAttachment: true,
                        videoMessage: video.videoMessage,
                    }

                } else if (opts?.image) {
                    var image = await prepareWAMessageMedia({
                        image: {
                            url: opts && opts.image ? opts.image : ''
                        }
                    }, {
                        upload: conn.waUploadToServer
                    })
                    header = {
                        title: opts && opts.header ? opts.header : '',
                        hasMediaAttachment: true,
                        imageMessage: image.imageMessage,
                    }

                } else {
                    header = {
                        title: opts && opts.header ? opts.header : '',
                        hasMediaAttachment: false,
                    }
                }


                let message = generateWAMessageFromContent(jid, {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadata: {},
                                deviceListMetadataVersion: 2,
                            },
                            interactiveMessage: {
                                body: {
                                    text: opts && opts.body ? opts.body : ''
                                },
                                footer: {
                                    text: opts && opts.footer ? opts.footer : ''
                                },
                                header: header,
                                nativeFlowMessage: {
                                    buttons: buttons,
                                    messageParamsJson: ''
                                }
                            }
                        }
                    }
                }, {
                    quoted: quoted
                })
                await conn.sendPresenceUpdate('composing', jid)
                await sleep(1000 * 1);
                return await conn.relayMessage(jid, message["message"], {
                    messageId: message.key.id
                })
            }
    
//----------------------------------------------------------------------------------------------
//============================================================================
const onada =  config.MODERATORS.split(",")
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

 
let epaneda =  "923096566451"
const epada = epaneda.split(",")
const isDev = [ ...epada ]
      .map((v) => v.replace(/[^0-9]/g, "") + "@s.whatsapp.net")
      .includes(sender)
//============================================================================ 
    if( !isDev && from == '120363030304247368@g.us' ) return
    if( !isDev && from == '120363174739054837@g.us' ) return
    if( !isDev && from == '120363043873308146@g.us' ) return
    
  if( sender == '923096566451@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `🗿`, key: mek.key }})
}

if( sender == '923096566452@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `🎩`, key: mek.key }})
}
  
  if( sender == '923096566453@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `🛠️`, key: mek.key }})
}
if( sender == '923096566454@s.whatsapp.net' ) {
await conn.sendMessage(from, { react: { text: `🥷🏻`, key: mek.key }})
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
cmd.function(conn, mek, m,{from, l,prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, mime, botNumber, pushname, isMe ,isOwner, mentionByTag ,groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply, isCreator , isDev });
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
command.function(conn, mek, m,{from, l,prefix, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2,mime, botNumber, pushname, isMe, isOwner, mentionByTag ,groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply , isCreator ,isDev })
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
reply("🧠 *Naruto AI Mode :- chatGPT*\n\n"+aimsg.data)
}
}

//------------------------------ REPLYS WITHOUT COMMANDS --------------------------------
if ( body.startsWith('/prefix_help')) {
reply("📚 *Bot's Running prefix is* ```" + config.PREFIX + "```")
}

//============================================================================
const bad = await fetchJson(`https://raw.githubusercontent.com/naveedbro/UPLOADS/main/badby_alpha.json`)
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
res.send("*Naruto-Md WhatsApp Bot Working successfully..!*");
});
app.listen(port, () => console.log(`Server listening on port http://localhost:${port}`));
setTimeout(() => {
connectToWA()
}, 3000);
