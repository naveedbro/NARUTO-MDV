const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
cmd({
    pattern: "del",
    react: "✔️",
    alias: ["delete"],
    desc: "Delete messages for everyone",
    category: "profile",
    use: '.del',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if ( !m.quoted ) return reply('ℹ️ *Please quote the Message*')
if (m.quoted.sender == botNumber2 ) {
if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
   let { chat, fromMe, id, isBaileys } = m.quoted
   return await conn.sendMessage(from, { delete: { remoteJid: from, fromMe: true, id: m.quoted.id, participant: m.quoted.sender } })
    }
  if ( !isGroup) return reply("❌ *You can't delete Other message for everyone without Group*")
    if ( !isAdmins ) return reply("❌ *You must be an Admin*")
  if ( !isBotAdmins ) return reply("❌ *Bot number must be an Admin*")
    let { chat, fromMe, id, isBaileys } = m.quoted
    await conn.sendMessage(from, { delete: { remoteJid: from, fromMe: false , id: m.quoted.id, participant: m.quoted.sender } })
   
} catch (e) {
reply('🚫 *Error Accurated !!*\n\n' + e )
l(e)
}
})
