const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUtYcHhTQXY4RXJiVm5LY0NxVUordzhZTGNidXZ6b1FCbWlIYlZJWFRFaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNm0wVWpyZDQrdEY4RTVuS3pQMG9HbzlyZUh3VEZlYlMrZFVLeVBJby9IST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1SzJCbVQxNUFQNCtZc2c1eDBOOEpqU3FYRExJSFZ1M2tUbE92QU81UlZ3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzSGVxUXIxc2dObmh6Mm9wQ2R5dHVaTlE3M21XT1Rtamc4TnZ5WlArZ2l3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImdMZGhpVzY1RmlWWmkxRTdTTUI4Nzl5NVVPME1mL0ZhOG8yVEkxS0c4Rm89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImpLTExvcTd1VDZaZFY4N003emF3TUhxelcvOWJRdXUvQlo1QW1WT1B0a289In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZU5McGc5dkgxS0xGMzFUVVdJNmRoTGE4VzltUHd3YXBjRlk2QVF6ZWdXQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMytWWXNoQkJjTFoyWEs3dGpPa3J5Sm9Ndm0vTkJlWXlhOGNRVHZrbWRUST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllLb0NGNmpIUHNwR0NYTUtGRmxpakpWZlZaZmZoLzVvSjNPMGw3Z0VvNXpBZVZaLzRFNEcwZ0JSU0xQcXZ4WFhkNzVTTGtjUXBONWhXWVJSQVArdkJRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTgwLCJhZHZTZWNyZXRLZXkiOiJxVDFMdG15QVVJdERFNmdKYVVRaWFxbnE4MVNDT0owb015QjI3ZWFxRVdVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJHdVhFN2RLRlJLMkppNmN6a1M2MFJRIiwicGhvbmVJZCI6ImJjMjYwZGM2LWY4MGEtNGU2Yy1hNjdkLTY5ODA5YjViYjk1MCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJsNlZDS2xmYW1QQnNrT3BOWnlLeXB4SUFZbFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTk9vRmF0LzJzRzhhSUZQVGxVRVlVQnp0WnVvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjFYRzFHS0xDIiwibWUiOnsiaWQiOiI5NDcwNDg5Njg4MDo0NEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJMICBcbk8gIFxuQSAgXG5EICBcbkkgIFxuTiAgXG5HICBcbi4gIFxuLiAgXG5XXG5IXG5JXG5UXG5FXG5cblNcbkhcbkFcbkRcbk9cblcifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0liQXVGUVF2S2F5dmdZWUF5QUFLQUE9IiwiYWNjb3VudFNpZ25hdHVyZUtleSI6Ik5MMDIxdjdCOXBja2lRanA3MTlMTUh2eEhwSGYyTG9ZeTVsdUdLSlFHSHc9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkgyQnpOQ0xXUWRsUmdtbDl0bUJjclRmaU1rVGVTeU1XNUR5SDNIcjlKaTVHRFIzNC8vMmFzeWRjRmpib2xQUi9DbFNYdURoM3I4alJYTmZCTHJ5ckJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJtdHlQZXFHTjdIcElIR0VCdStkdmc3eFA4ZGo4aXRpNU42YnJhbUJEcFdNbEFZOTg2M0JPRVFHbTg1N2x0NUtzZHpvdzZKK2R2SVVnWTJXa2E2WnZEQT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzA0ODk2ODgwOjQ0QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlRTOU50Yit3ZmFYSklrSTZlOWZTekI3OFI2UjM5aTZHTXVaYmhpaVVCaDgifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDE0NjAyOTksIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSWNmIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
