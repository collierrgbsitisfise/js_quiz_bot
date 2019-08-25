import TelegramBot from 'node-telegram-bot-api';
import { Redis } from './../services';

export const answerHandler = (bot: TelegramBot, client: Redis) => {
    return async (msg: TelegramBot.Message, match: RegExpExecArray): Promise<void> => {
        const chatId = msg.chat.id;
        const resp = match[1];
        const quizQuestionData = JSON.parse(await client.getValueByKey(String(chatId)));
        const questionAnswer = quizQuestionData['answer'].split(' ').pop();

        if (resp === questionAnswer) {
            await bot.sendMessage(chatId, 'Correct !');
            await bot.sendMessage(chatId, '🥳🥳🥳🥳👍👍👍❤️❤️❤️❤️');
        } else {
            await bot.sendMessage(chatId, 'Wrong !');
            await bot.sendMessage(chatId, '🥶🥶🥶😭😭😭😤😤😤');
        }

        if (quizQuestionData['explanation']) {
            await bot.sendMessage(chatId, 'Explanation!');
            await bot.sendMessage(chatId, quizQuestionData['explanation'], { parse_mode: "Markdown" });
        }
    }
}
