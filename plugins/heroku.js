const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const { DBM } = require('postgres_dbm')
const Heroku = require('heroku-client')
const db_pool = new DBM({
    db: config.DATABASE_URL
})

const heroku = new Heroku({
    token: config.HEROKU_API_KEY
})

cmd({
    pattern: "restart",
    react: "⚙",
    alias: ["rstrt"],
    desc: "To Restart the Bot",
    category: "main",
    use: '.restart',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
    if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
    await conn.sendMessage(from , { text: '*Restarting the Bot....*' }, { quoted: mek } )
    let baseURI = '/apps/' + config.HEROKU_APP_NAME
    await heroku.delete(baseURI + '/dynos')
} catch (e) {
    reply('⛔ *Error accurated !!*'+ e )
    l(e)
    }
    })

    cmd({
        pattern: "shutdown",
        react: "⚙",
        alias: ["sdown"],
        desc: "To Shutdown the Bot",
        category: "main",
        use: '.shutdown',
        filename: __filename
    },
    async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
    try{
        if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
        await conn.sendMessage(from , { text: '*Shutting Down the Bot....*' }, { quoted: mek } )
        let baseURI = '/apps/' + config.HEROKU_APP_NAME
       const form = await heroku.get(baseURI + '/formation')
       forID = form[0].id
       await heroku.patch(baseURI + '/formation/' + forID, {
        body: {
            quantity: 0
        }
    })
    } catch (e) {
        reply('⛔ *Error accurated !!*'+ e )
        l(e)
        }
        })


        cmd({
            pattern: "autoreact",
            react: "⚙",
            alias: ["autor"],
            desc: "To AUTO REACT Swith on / off to the Bot",
            category: "main",
            use: '.autoreact on/off',
            filename: __filename
        },
        async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
        try{
            if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
            if ( !q ) return reply("*Enter on or off to AUTO REACT* ")
            if ( q !== 'on' ) {
                 if ( q !== 'off') return reply("*Enter on or off to AUTO REACT* ") 
                }
            let baseURI = '/apps/' + config.HEROKU_APP_NAME
            if ( q == 'on') {
                if  (config.AUTO_REACT == "true" ) return reply("ℹ️ *Already turned "+ q + "*")
                 await heroku.patch(baseURI + '/config-vars', {
                    body: {
                        ['AUTO_REACT']: 'true'
                    }
                });
                await conn.sendMessage(from , { text: '*AUTO REACT Turned On ! Please wait to Update the Bot....*' }, { quoted: mek }) 
                 return await heroku.delete(baseURI + '/dynos')
            }
            if ( q == 'off') {
                if  (config.AUTO_REACT == "false" ) return reply("ℹ️ *Already turned "+ q + "*")
                await heroku.patch(baseURI + '/config-vars', {
                   body: {
                       ['AUTO_REACT']: 'false'
                   }
               })
                await conn.sendMessage(from , { text: '*AUTO REACT Turned Off ! Please wait to Update the Bot....*' }, { quoted: mek })
               return await heroku.delete(baseURI + '/dynos')
           }
        } catch (e) {
            reply('⛔ *Error accurated !!*'+ e )
            l(e)
            }
            })

            cmd({
                pattern: "antilink",
                react: "⚙",
                alias: ["anlk"],
                desc: "To ANTI LINK Swith of the Bot",
                category: "main",
                use: '.antilink on/off',
                filename: __filename
            },
            async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
            try{
                if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
                if ( !q ) return reply("*Enter on or off to ANTI LINK* ")
                if ( q !== 'on' ) {                  
                     if ( q !== 'off') return reply("*Enter on or off to ANTI LINK* ") 
                    }
                let baseURI = '/apps/' + config.HEROKU_APP_NAME
                if ( q == 'on') {
                    if  (config.ANTI_LINK == "true" ) return reply("ℹ️ *Already turned "+ q + "*")
                     await heroku.patch(baseURI + '/config-vars', {
                        body: {
                            ['ANTI_LINK']: 'true'
                        }
                    });
                    await conn.sendMessage(from , { text: '*ANTI LINK Turned On ! Please wait to Update the Bot....*' }, { quoted: mek }) 
                    return await heroku.delete(baseURI + '/dynos')
                }
                if ( q == 'off') {
                    if  (config.ANTI_LINK == "false" ) return reply("ℹ️ *Already turned "+ q + "*")
                    await heroku.patch(baseURI + '/config-vars', {
                       body: {
                           ['ANTI_LINK']: 'false'
                       }
                   })
                   await conn.sendMessage(from , { text: '*ANTI LINK Turned Off ! Please wait to Update the Bot....*' }, { quoted: mek })
                   return await heroku.delete(baseURI + '/dynos')
               }
            } catch (e) {
                reply('⛔ *Error accurated !!*'+ e )
                l(e)
                }
                })

                cmd({
                    pattern: "antibad",
                    react: "⚙",
                    alias: ["antbd"],
                    desc: "To ANTI BAD Swith of the Bot",
                    category: "main",
                    use: '.antibad on/off',
                    filename: __filename
                },
                async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
                try{
                    if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
                    if ( !q ) return reply("*Enter on or off to ANTI BAD* ")
                    if ( q !== 'on' ) {                    
                         if ( q !== 'off') return reply("*Enter on or off to ANTI BAD* ") 
                        }
                    let baseURI = '/apps/' + config.HEROKU_APP_NAME
                    if ( q == 'on') {
                        if  (config.ANTI_BAD == "true" ) return  reply("ℹ️ *Already turned "+ q + "*")
                         await heroku.patch(baseURI + '/config-vars', {
                            body: {
                                ['ANTI_BAD']: 'true'
                            }
                        });
                        await conn.sendMessage(from , { text: '*ANTI BAD Turned On ! Please wait to Update the Bot....*' }, { quoted: mek }) 
                        return await heroku.delete(baseURI + '/dynos')
                    }
                    if ( q == 'off') {
                        if  (config.ANTI_BAD == "false" ) return reply("ℹ️ *Already turned "+ q + "*")
                        await heroku.patch(baseURI + '/config-vars', {
                           body: {
                               ['ANTI_BAD']: 'false'
                           }
                       })
                       await conn.sendMessage(from , { text: '*ANTI BAD Turned Off ! Please wait to Update the Bot....*' }, { quoted: mek })
                       return await heroku.delete(baseURI + '/dynos')
                   }
                } catch (e) {
                    reply('⛔ *Error accurated !!*'+ e )
                    l(e)
                    }
                    })

cmd({
                    pattern: "autoread",
                    react: "⚙",
                    alias: ["antbd"],
                    desc: "Auto Msg read on off System ",
                    category: "main",
                    use: '.autoread on/off',
                    filename: __filename
                },
                async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
                try{
                    if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
                    if ( !q ) return reply("*Enter on or off to AUTO READ* ")
                    if ( q !== 'on' ) {                    
                         if ( q !== 'off') return reply("*Enter on or off to AUTO READ* ") 
                        }
                    let baseURI = '/apps/' + config.HEROKU_APP_NAME
                    if ( q == 'on') {
                        if  (config.AUTO_MSG_READ == "true" ) return  reply("ℹ️ *Already turned "+ q + "*")
                         await heroku.patch(baseURI + '/config-vars', {
                            body: {
                                ['AUTO_MSG_READ']: 'true'
                            }
                        });
                        await conn.sendMessage(from , { text: '*AUTO READ Turned On ! Please wait to Update the Bot....*' }, { quoted: mek }) 
                        return await heroku.delete(baseURI + '/dynos')
                    }
                    if ( q == 'off') {
                        if  (config.AUTO_MSG_READ == "false" ) return reply("ℹ️ *Already turned "+ q + "*")
                        await heroku.patch(baseURI + '/config-vars', {
                           body: {
                               ['AUTO_MSG_READ']: 'false'
                           }
                       })
                       await conn.sendMessage(from , { text: '*AUTO READ Turned Off ! Please wait to Update the Bot....*' }, { quoted: mek })
                       return await heroku.delete(baseURI + '/dynos')
                   }
                } catch (e) {
                    reply('⛔ *Error accurated !!*'+ e )
                    l(e)
                    }
                    })


                    cmd({
                        pattern: "mode",
                        react: "⚙",
                        alias: ["worktype"],
                        desc: "To Work Type Swith of the Bot",
                        category: "main",
                        use: '.mode private/public or group',
                        filename: __filename
                    },
                    async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
                    try{
                        if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
                        if ( !q ) return reply("*Enter you wont WORK_TYPE* ")
                        if ( q !== 'private' ) {                    
                             if ( q !== 'public') {
                                if ( q !== 'group') return reply("*Enter private , public or group* ") 
                            }
                        }
                        let baseURI = '/apps/' + config.HEROKU_APP_NAME
                        if ( q == 'private') {
                            if  (config.WORK_TYPE == "private" ) return  reply("ℹ️ *Already bot in "+ q + "*")
                             await heroku.patch(baseURI + '/config-vars', {
                                body: {
                                    ['WORK_TYPE']: 'private'
                                }
                            });
                            await conn.sendMessage(from , { text: '*WORK_TYPE = private ! Please wait to Update the Bot....*' }, { quoted: mek }) 
                            return await heroku.delete(baseURI + '/dynos')
                        }
                        if ( q == 'public') {
                            if  (config.WORK_TYPE == "public" ) return reply("ℹ️ *Already bot in "+ q + "*")
                            await heroku.patch(baseURI + '/config-vars', {
                               body: {
                                   ['WORK_TYPE']: 'public'
                               }
                           })
                           await conn.sendMessage(from , { text: '*WORK_TYPE = public ! Please wait to Update the Bot....*' }, { quoted: mek })
                           return await heroku.delete(baseURI + '/dynos')
                       }
                       if ( q == 'group') {
                        if  (config.WORK_TYPE == "only_group" ) return reply("ℹ️ *Already bot in "+ q + "*")
                        await heroku.patch(baseURI + '/config-vars', {
                           body: {
                               ['WORK_TYPE']: 'only_group'
                           }
                       })
                       await conn.sendMessage(from , { text: '*WORK_TYPE = only_group ! Please wait to Update the Bot....*' }, { quoted: mek })
                       return await heroku.delete(baseURI + '/dynos')
                   }
                    } catch (e) {
                        reply('⛔ *Error accurated !!*'+ e )
                        l(e)
                        }
                        })
    
cmd({
    pattern: "prefix",
    react: "⚙",
    alias: ["uppre"],
    desc: "To Change The Prefix for Bot",
    category: "main",
    use: '.prefix',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
try{
    if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
    if ( !q ) return reply("*Enter you need PREFIX*")
    if ( q.length > 1 ) return conn.sendMessage(from,{text:"ℹ️ *Only valid One Symbol*"},{quoted:mek })
    if ( q == config.PREFIX ) return reply ('ℹ️ *Already in this Symbol* \n\n_Try a nother one to Change your Prefix_')
    let baseURI = '/apps/' + config.HEROKU_APP_NAME
    await heroku.patch(baseURI + '/config-vars', {
                           body: {
                               ['PREFIX']: q
                           }
                       })
                       await conn.sendMessage(from , { text: '✔️ *Successfully updated the* ```' + q + '``` *as the Prefix !* \n\n🔄 _Please wait to Update the Bot...._' }, { quoted: mek })
                       return await heroku.delete(baseURI + '/dynos')
                   
   } catch (e) {
    reply('⛔ *Error accurated !!*'+ e )
    l(e)
    }
    })
    
 cmd({
                    pattern: "botdetect",
                    react: "⚙",
                    alias: ["botdt"],
                    desc: "BOT DETECT Swith of the Bot",
                    category: "main",
                    use: '.botdetect on/off',
                    filename: __filename
                },
                async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
                try{
                    if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
                    if ( !q ) return reply("*Enter on or off to BOT DETECT* ")
                    if ( q !== 'on' ) {                    
                         if ( q !== 'off') return reply("*Enter on or off to BOT DETECT* ") 
                        }
                    let baseURI = '/apps/' + config.HEROKU_APP_NAME
                    if ( q == 'on') {
                        if  (config.BOT_DETECT == "true" ) return  reply("ℹ️ *Already turned "+ q + "*")
                         await heroku.patch(baseURI + '/config-vars', {
                            body: {
                                ['BOT_DETECT']: 'true'
                            }
                        });
                        await conn.sendMessage(from , { text: '*BOT_DETECT Turned On ! Please wait to Update the Bot....*' }, { quoted: mek }) 
                        return await heroku.delete(baseURI + '/dynos')
                    }
                    if ( q == 'off') {
                        if  (config.BOT_DETECT == "false" ) return reply("ℹ️ *Already turned "+ q + "*")
                        await heroku.patch(baseURI + '/config-vars', {
                           body: {
                               ['BOT_DETECT']: 'false'
                           }
                       })
                       await conn.sendMessage(from , { text: '*BOT DETECT Turned Off ! Please wait to Update the Bot....*' }, { quoted: mek })
                       return await heroku.delete(baseURI + '/dynos')
                   }
                } catch (e) {
                    reply('⛔ *Error accurated !!*'+ e )
                    l(e)
                    }
                    })


 cmd({
                    pattern: "antibot",
                    react: "⚙",
                    alias: ["antbt"],
                    desc: "ANTI BOT Switch of the Bot",
                    category: "main",
                    use: '.antibot on/off',
                    filename: __filename
                },
                async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
                try{
                    if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
                    if ( !isBotAdmins ) return reply ("*Bot must be Admin Frist*")
                     if  (config.BOT_DETECT == "false" ) return reply("ℹ️ *Please turn on the bot Detect to use Anti Bot*\n\n_Use -: botdetect on_")
                    if ( !q ) return reply("*Enter on or off to ANTI BOT* ")
                    if ( q !== 'on' ) {                    
                         if ( q !== 'off') return reply("*Enter on or off to ANTI BOT* ") 
                        }
                    let baseURI = '/apps/' + config.HEROKU_APP_NAME
                    if ( q == 'on') {
                        if  (config.ANTI_BOT == "true" ) return  reply("ℹ️ *Already turned "+ q + "*")
                         await heroku.patch(baseURI + '/config-vars', {
                            body: {
                                ['ANTI_BOT']: 'true'
                            }
                        });
                        await conn.sendMessage(from , { text: '*ANTI BOT Turned On ! Please wait to Update the Bot....*' }, { quoted: mek }) 
                        return await heroku.delete(baseURI + '/dynos')
                    }
                    if ( q == 'off') {
                        if  (config.ANTI_BOT == "false" ) return reply("ℹ️ *Already turned "+ q + "*")
                        await heroku.patch(baseURI + '/config-vars', {
                           body: {
                               ['ANTI_BOT']: 'false'
                           }
                       })
                       await conn.sendMessage(from , { text: '*ANTI BOT Turned Off ! Please wait to Update the Bot....*' }, { quoted: mek })
                       return await heroku.delete(baseURI + '/dynos')
                   }
                } catch (e) {
                    reply('⛔ *Error accurated !!*'+ e )
                    l(e)
                    }
                    })
   
              cmd({                 
                    pattern: "ai_mode",
                    react: "⚙",
                    alias: ["aimode"],
                    desc: "AI MODE Swith of the Bot",
                    category: "main",
                    use: '.ai_mode on/off',
                    filename: __filename
                },
                async(conn, mek, m,{from, l, quoted, body, isCmd, command, mentionByTag , args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isCreator ,isDev, isAdmins, reply}) => {
                try{
                    if (!isCreator) { if (!isDev) return reply('🚫 *You must be a Moderator frist*') }
                    if ( !q ) return reply("*Enter on or off to AI_MODE* ")
                    if ( q !== 'on' ) {                    
                         if ( q !== 'off') return reply("*Enter on or off to AI MODE* ") 
                        }
                    let baseURI = '/apps/' + config.HEROKU_APP_NAME
                    if ( q == 'on') {
                        if  (config.AI_MODE == "true" ) return  reply("ℹ️ *Already turned "+ q + "*")
                         await heroku.patch(baseURI + '/config-vars', {
                            body: {
                                ['AI_MODE']: 'true'
                            }
                        });
                        await conn.sendMessage(from , { text: '*AI MODE Turned On ! Please wait to Update the Bot....*' }, { quoted: mek }) 
                        return await heroku.delete(baseURI + '/dynos')
                    }
                    if ( q == 'off') {
                        if  (config.AI_MODE == "false" ) return reply("ℹ️ *Already turned "+ q + "*")
                        await heroku.patch(baseURI + '/config-vars', {
                           body: {
                               ['AI_MODE']: 'false'
                           }
                       })
                       await conn.sendMessage(from , { text: '*AI MODE Turned Off ! Please wait to Update the Bot....*' }, { quoted: mek })
                       return await heroku.delete(baseURI + '/dynos')
                   }
                } catch (e) {
                    reply('⛔ *Error accurated !!*'+ e )
                    l(e)
                    }
                    })





