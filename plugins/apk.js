const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const { search , download } = require('aptoide-scraper')

cmd({
    pattern: "ps",
    react: "📚",
    alias: ["apksh","playstore"],
    desc: "Play Store Apk Searcher",
    category: "search",
    use: '.apk < App Name >',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if ( !q ) return reply('*Please enter a App name* 📱')
const vid = await fetchJson(`https://darkalphaxteam-play-store-api.cyclic.app/api/apps?q=${q}`)
    let yt = '*Cyber-X 2.0 Play Store Search ( Google Play )*\n\n'
    for (let i of vid.results ) {
        yt += `📱 *${i.title}*\n🔗 Link : ${i.playstoreUrl} \n\n`
    }
reply(yt)
} catch (e) {
reply('❌ *Apps not found (404 Error)*\n\nThis is a data feature provided by Google Play Store. Therefore Mod Apk or 3rd party application cannot be provided')
l(e)
}
})

cmd({
    pattern: "apk",
    react: "📱",
    alias: ["apkdl","cyber_apk"],
    desc: "Apk Downloader",
    category: "download",
    use: '.apk < App Name >',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
if ( !q ) return reply('*Please enter a App name* 📱')
if ( isUrl(q) ) {
if ( q.includes('https://play.google.com') ) {
const getlink = q.split("?id=")[1]
const app = await download(getlink)
let msgg =`*CYBER-X APK DOWNLOADER* 📱

📚 *App name -: ${app.name}*

🖇️ Url : ${q}

📂 Size -: ${app.size}

─────────────────────────────
*ᴘʟᴇᴀꜱᴇ ʀᴇᴘʟʏ ᴀ ɴᴜᴍʙᴇʀ ꜰᴏʀ ɢᴇᴛ ʏᴏᴜʀ ɴᴇᴇᴅ*

1 📂 *APK File*
2 ℹ *APK Details*

ᴄʏʙᴇʀ-x ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ
ᴀᴘᴘ ɪᴅ - ${app.package}`
return await conn.sendMessage(from, { image: { url : app.icon } , caption: msgg }, { quoted: mek })

}
}
let psdata = await fetchJson(`https://darkalphaxteam-play-store-api.cyclic.app/api/apps?q=${q}`)
const app = psdata.results[0]
let msgg =`*CYBER-X APK DOWNLOADER* 📱

📚 *App name -: ${app.title}*

*🖇️ Url : ${app.playstoreUrl}*

📂 Developer -: ${app.developer.devId}

⭐ Rating -: ${app.scoreText}

─────────────────────────────
*ᴘʟᴇᴀꜱᴇ ʀᴇᴘʟʏ ᴀ ɴᴜᴍʙᴇʀ ꜰᴏʀ ɢᴇᴛ ʏᴏᴜʀ ɴᴇᴇᴅ*

1 📂 *APK File*
2 ℹ *APK Details*

ᴄʏʙᴇʀ-x ᴀᴘᴋ ᴅᴏᴡɴʟᴏᴀᴅᴇʀ
ᴀᴘᴘ ɪᴅ - ${app.appId}`
await conn.sendMessage(from, { image: { url : app.icon } , caption: msgg }, { quoted: mek })
} catch (e) {
reply('❌ *App not found (404 Error)*\n\nThis is a data feature provided by Google Play Store. Therefore Mod Apk or 3rd party application cannot be provided')
l(e)
}
})