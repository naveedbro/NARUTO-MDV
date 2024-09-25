const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const fs = require('fs')
const { Sticker, createSticker, StickerTypes } = require('wa-sticker-formatter') 
const { DBM } = require('postgres_dbm')
cmd({
    pattern: "sticker",
    react: "🌄",
    alias: ["tosticker","s"],
    desc: "Image to Sticker converter.",
    category: "extra",
    use: '.sticker',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2,mime , botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if (!quoted) return reply('❗ *Please mention a Image or 1-9 Seconds Video Clip*')

const db_pool = new DBM({
    db: config.DATABASE_URL
})
const data = await db_pool.get("S_PACK_NAME")
const datas = await db_pool.get("S_OWNER_NAME")
if (/image/.test(mime)) {
if (!quoted) return reply('Please mention a Image')
reply('*Converting image to Sticker....*')
let media = await quoted.download()
const sticker = new Sticker(media , {
    pack: data , // The pack name
    author: datas , // The author name
    type: StickerTypes.FULL, // The sticker type
    categories: ['🤩', '🎉'], // The sticker category
    id: '12345', // The sticker id
    quality: 50, // The quality of the output file
    background: 'transparent' // The sticker background color (only for full stickers)
})

const buffer = await sticker.toBuffer() // convert to buffer


await conn.sendMessage(from, { sticker : buffer  }, { quoted: mek })
} else if (/video/.test(mime)) {
reply('*Converting Video to Sticker....*')
let media = await quoted.download()
const sticker = new Sticker(media , {
    pack: data , // The pack name
    author: datas , // The author name
    type: StickerTypes.FULL, // The sticker type
    categories: ['🤩', '🎉'], // The sticker category
    id: '12345', // The sticker id
    quality: 50, // The quality of the output file
    background: 'transparent' // The sticker background color (only for full stickers)
})

const buffer = await sticker.toBuffer() // convert to buffer


await conn.sendMessage(from, { sticker : buffer  }, { quoted: mek })
} else return reply("*Reply to a photo or a short video!* 👨‍🔧")

} catch (e) {
reply('*Error !!*\n\n'+ e )
}
})
