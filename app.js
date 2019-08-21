const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');

const allQuiz = JSON.parse(String(fs.readFileSync('./data/quizaData.json')));
const botToken = process.env.tel_bot_token;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Welcome", {
        "reply_markup": {
            "keyboard": [["get question"]]
        }
    });
});

bot.onText(/get question/, (msg) => {
    const chatId = msg.chat.id;
    const number = Math.floor(Math.random()*allQuiz.length);
    console.log('number: ', number);
    console.log('rnadom quiz');
    console.log(allQuiz[number]);
    bot.sendMessage(chatId, "RANDOM");
});