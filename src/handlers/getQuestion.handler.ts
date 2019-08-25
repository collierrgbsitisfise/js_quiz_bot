import fs from 'fs';
import path from 'path';
import TelegramBot from 'node-telegram-bot-api';
import { Redis } from './../services';

const pathToJSON = path.join(__dirname, '/../../data/quizaData.json');
const allQuiz = JSON.parse(String(fs.readFileSync(pathToJSON)));

export const getQuestionHandler = (bot: TelegramBot, client: Redis) => {
    return async (msg: TelegramBot.Message): Promise<void> => {
        const chatId = msg.chat.id;
        const number = Math.floor(Math.random() * allQuiz.length);
        client.setExpValue(String(chatId), JSON.stringify(allQuiz[number]), 60000 * 10);
        await bot.sendMessage(chatId, allQuiz[number]['question'], { parse_mode: "Markdown" });

        const jsCode = allQuiz[number]['jsCode'];
        if (jsCode) {
            await bot.sendMessage(chatId, jsCode, { parse_mode: "Markdown" });
        }

        for (let varaint of allQuiz[number]['answerVariants']) {
            await bot.sendMessage(chatId, varaint, { parse_mode: "Markdown" });
        }

        await bot.sendMessage(chatId, "Welcome", {
            "reply_markup": {
                "keyboard": [allQuiz[number]['answerVariants'].map((answ: string) => answ.split(':').shift()), ["get question"]]
            }
        });
    }
}
