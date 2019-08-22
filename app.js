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

bot.onText(/get question/, async (msg) => {
    const chatId = msg.chat.id;
    const number = Math.floor(Math.random()*allQuiz.length);
    console.log('number: ', number);
    console.log('rnadom quiz');
    console.log(allQuiz[number]);
    await bot.sendMessage(chatId, allQuiz[number]['question'], {parse_mode : "Markdown"});

    const jsCode = allQuiz[number]['jsCode'];
    if (jsCode) {
        await bot.sendMessage(chatId, jsCode, {parse_mode : "Markdown"});
    }

    for (let varaint of allQuiz[number]['answerVariants']) {
        await bot.sendMessage(chatId, varaint, {parse_mode : "Markdown"});
    }

    await bot.sendMessage(chatId, "Welcome", {
        "reply_markup": {
            "keyboard": [allQuiz[number]['answerVariants'].map(answ => answ.split(':').shift()), ["get question"]]
        }
    });
});