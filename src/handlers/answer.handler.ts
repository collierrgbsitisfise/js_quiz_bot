import TelegramBot from 'node-telegram-bot-api';
import { Redis } from './../services';

export const answerHandler = (bot: TelegramBot, client: Redis) => {
    return async (msg: TelegramBot.Message, match: RegExpExecArray): Promise<void> => {
        const chatId = msg.chat.id;
        const resp = match[1];

        const quizQuestionData = await client.getValueByKey(String(chatId));
        
        if (!quizQuestionData) {
            await bot.sendMessage(chatId, 'The time allotted for the answer has expired (5 min) 🕐🕐🕐🕐🕐!');
            return;
        }

        const parsedQuizQuestionData = JSON.parse(quizQuestionData);
        const questionAnswer = parsedQuizQuestionData['answer'].split(' ').pop();

        if (resp === questionAnswer) {
            await bot.sendMessage(chatId, 'Correct answer!');
            await bot.sendMessage(chatId, '🥳🥳🥳🥳👍👍👍');
        } else {
            await bot.sendMessage(chatId, 'Wrong answer!');
            await bot.sendMessage(chatId, '🥶🥶🥶😭😭😭');
        }

        const explanation = parsedQuizQuestionData['explanation'];
        if (explanation) {
            await bot.sendMessage(chatId, 'Explanation!');
            await bot.sendMessage(chatId, explanation, { parse_mode: "Markdown" });
        }
    }
}
