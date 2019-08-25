"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startHandler = (bot) => {
    return (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Welcome dude !!!", {
            "reply_markup": {
                "keyboard": [["get question"]]
            }
        });
    };
};
//# sourceMappingURL=start.handler.js.map