"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from 'fs';
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
// import * as redis from 'redis';
const handlers_1 = require("./handlers");
// const client = redis.createClient();
// client.on("error", function (err) {
//     console.log("Error FROM REDIS " + err);
// });
// const getValuByKey = (key) => {
//     return new Promise((res, rej) => {
//         client.get(key, (err, data) => {
//            res(data);
//         });
//     })
// }
// const allQuiz = JSON.parse(String(fs.readFileSync('./data/quizaData.json')));
const botToken = process.env.tel_bot_token;
// Create a bot that uses 'polling' to fetch new updates
const bot = new node_telegram_bot_api_1.default(botToken, { polling: true });
bot.onText(/\/start/, handlers_1.startHandler(bot));
// bot.onText(/get question/, async (msg) => {
//     const chatId = msg.chat.id;
//     const number = Math.floor(Math.random()*allQuiz.length);
//     client.set(String(chatId), JSON.stringify(allQuiz[number]), 'EX', 60000 * 10);
//     await bot.sendMessage(chatId, allQuiz[number]['question'], {parse_mode : "Markdown"});
//     const jsCode = allQuiz[number]['jsCode'];
//     if (jsCode) {
//         await bot.sendMessage(chatId, jsCode, {parse_mode : "Markdown"});
//     }
//     for (let varaint of allQuiz[number]['answerVariants']) {
//         await bot.sendMessage(chatId, varaint, {parse_mode : "Markdown"});
//     }
//     await bot.sendMessage(chatId, "Welcome", {
//         "reply_markup": {
//             "keyboard": [allQuiz[number]['answerVariants'].map(answ => answ.split(':').shift()), ["get question"]]
//         }
//     });
// });
// //handle answer
// bot.onText(/- (.+)/, async (msg, match) => {
//     const chatId = msg.chat.id;
//     const resp = match[1]; // the captured "whatever"
//     console.log('resposne');
//     console.log(resp);
//     console.log('asnwer');
//     const quizQuestionData = JSON.parse(await getValuByKey(String(chatId)));
//     const questionAnswer = quizQuestionData['answer'].split(' ').pop();
//     console.log('ANSWER FOR QUESTION : ', resp)
//     console.log(questionAnswer);
//     if (resp === questionAnswer) {
//         await bot.sendMessage(chatId, 'Correct !');
//         await bot.sendMessage(chatId, '🥳🥳🥳🥳👍👍👍❤️❤️❤️❤️');
//     } else {
//         await bot.sendMessage(chatId, 'Wrong !');
//         await bot.sendMessage(chatId, '🥶🥶🥶😭😭😭😤😤😤');
//     }
//     if (quizQuestionData['explanation']) {
//         await bot.sendMessage(chatId, 'Explanation!');
//         await bot.sendMessage(chatId, quizQuestionData['explanation'], {parse_mode : "Markdown"});
//     }
// });
//# sourceMappingURL=app.js.map