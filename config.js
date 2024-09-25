const fs = require('fs');
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}
module.exports = {
DATABASE_URL: process.env.DATABASE_URL === undefined ? 'none' : process.env.DATABASE_URL,
AUTO_MSG_READ : process.env.AUTO_MSG_READ === undefined ? 'false' : process.env.AUTO_MSG_READ,
MODERATORS : process.env.MODERATORS === undefined ? "94711421243,94775512050,94787820101" : process.env.MODERATORS ,
SESSION_ID : process.env.SESSION_ID === undefined ? '' : process.env.SESSION_ID,
ANTI_BAD: process.env.ANTI_BAD === undefined ? 'false' : process.env.ANTI_BAD,
MAX_SIZE: 2000,
WORK_TYPE: process.env.WORK_TYPE === undefined ? 'private' : process.env.WORK_TYPE,
HEROKU_API_KEY: process.env.HEROKU_API_KEY === undefined ? 'onlygroup' : process.env.HEROKU_API_KEY,
HEROKU_APP_NAME: process.env.HEROKU_APP_NAME === undefined ? 'CYBER-X' : process.env.HEROKU_APP_NAME,
ANTI_LINK: process.env.ANTI_LINK === undefined ? 'false' : process.env.ANTI_LINK,
AUTO_REACT: process.env.AUTO_REACT === undefined ? 'true' : process.env.AUTO_REACT,
PREFIX: process.env.PREFIX === undefined ? '.' : process.env.PREFIX ,
AI_MODE: process.env.AI_MODE === undefined ? 'true' : process.env.AI_MODE,
BOT_DETECT: process.env.BOT_DETECT === undefined ? 'false' : process.env.BOT_DETECT,
ANTI_BOT: process.env.ANTI_BOT === undefined ? 'false' : process.env.ANTI_BOT ,
INBOX_USER: process.env.INBOX_USER === undefined ? '94778962038' : process.env.INBOX_USER,
BANNED_USER: process.env.BANNED_USER === undefined ? '94767438882' : process.env.BANNED_USER ,

};