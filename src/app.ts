import TelegramBot from 'node-telegram-bot-api';
import { startHandler, getQuestionHandler } from './handlers';
import { Redis } from './services';

const client = new Redis('localhost', 6379, (err: Error) => console.log('REDIS ERROR : ', err));

const botToken = process.env.tel_bot_token;

const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, startHandler(bot));
bot.onText(/get question/, getQuestionHandler(bot, client));

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
