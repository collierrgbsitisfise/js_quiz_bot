import TelegramBot from "node-telegram-bot-api";

export const startHandler = (bot: TelegramBot) => {
    return (msg: TelegramBot.Message): void => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Welcome to JS QUIZ!", {
            reply_markup: {
                keyboard: [[{ text: "get question" }]],
            },
        });
    };
};
