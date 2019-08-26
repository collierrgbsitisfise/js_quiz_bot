import fs from "fs";
import TelegramBot from "node-telegram-bot-api";
import path from "path";
import { Redis } from "./../services";

const pathToJSON = path.join(__dirname, "/../../data/quizaData.json");
const allQuiz = JSON.parse(String(fs.readFileSync(pathToJSON)));

export const getQuestionHandler = (bot: TelegramBot, client: Redis) => {
    return async (msg: TelegramBot.Message): Promise<void> => {
        const chatId = msg.chat.id;
        const quizNumber = Math.floor(Math.random() * allQuiz.length);
        client.setExpValue(String(chatId), JSON.stringify(allQuiz[quizNumber]), 60 * 5);
        await bot.sendMessage(chatId, allQuiz[quizNumber].question, { parse_mode: "Markdown" });

        const jsCode = allQuiz[quizNumber].jsCode;
        if (jsCode) {
            await bot.sendMessage(chatId, jsCode, { parse_mode: "Markdown" });
        }

        for (const varaint of allQuiz[quizNumber].answerVariants) {
            await bot.sendMessage(chatId, varaint, { parse_mode: "Markdown" });
        }

        await bot.sendMessage(chatId, "Welcome", {
            reply_markup: {
                keyboard: [allQuiz[quizNumber].answerVariants.map((answ: string) => answ.split(":").shift()), ["get question"]],
            },
        });
    };
};
