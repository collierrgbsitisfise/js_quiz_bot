import TelegramBot from "node-telegram-bot-api";
import { Redis } from "./../services";
import { answerHandler } from "./answer.handler";

describe('Test "answer" handler', () => {
    const fakeBot = {
        sendMessage: jest.fn(),
    };
    const fakeClient = {
        getValueByKey: jest.fn(),
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("time for answer was expired", async () => {
        const fakeMessage = { chat: { id: 12} };
        const fakeMatch = ["A"];
        const handler = answerHandler(
            fakeBot as unknown as TelegramBot,
            fakeClient as unknown as Redis,
        );

        const spyOnSendMessage = jest.spyOn(fakeBot, "sendMessage");
        const spyOnGetValueByKey = jest.spyOn(fakeClient, "getValueByKey");

        const result = await handler(fakeMessage as TelegramBot.Message, fakeMatch as RegExpExecArray);

        expect(result).toBeUndefined();
        expect(spyOnGetValueByKey).toBeCalledWith("12");
        expect(spyOnSendMessage).toBeCalledWith(12, "The time allotted for the answer has expired (5 min) 🕐🕐🕐🕐🕐!");
    });

    it("correct answer", async () => {
        const fakeMessage = { chat: { id: 12} };
        const fakeMatch = [undefined, "A"];
        const handler = answerHandler(
            fakeBot as unknown as TelegramBot,
            fakeClient as unknown as Redis,
        );

        const spyOnSendMessage = jest.spyOn(fakeBot, "sendMessage").mockResolvedValue(undefined);
        const spyOnGetValueByKey = jest.spyOn(fakeClient, "getValueByKey").mockResolvedValue(JSON.stringify({
            answer: "###Answer: A",
            explanation: "Some explanation",
        }));

        const result = await handler(fakeMessage as TelegramBot.Message, fakeMatch as RegExpExecArray);

        expect(result).toBeUndefined();
        expect(spyOnGetValueByKey).toBeCalledWith("12");
        expect(spyOnSendMessage).toBeCalledTimes(4);
        expect(spyOnSendMessage).toHaveBeenNthCalledWith(1, 12, "Correct answer!");
        expect(spyOnSendMessage).toHaveBeenNthCalledWith(2, 12, "🥳🥳🥳🥳👍👍👍");
        expect(spyOnSendMessage).toHaveBeenNthCalledWith(3, 12, "Explanation!");
        expect(spyOnSendMessage).toHaveBeenNthCalledWith(4, 12, "Some explanation", { parse_mode: "Markdown" });
    });

    it("wrong answer(with  explanation)", async () => {
        const fakeMessage = { chat: { id: 12} };
        const fakeMatch = [undefined, "A"];
        const handler = answerHandler(
            fakeBot as unknown as TelegramBot,
            fakeClient as unknown as Redis,
        );

        const spyOnSendMessage = jest.spyOn(fakeBot, "sendMessage").mockResolvedValue(undefined);
        const spyOnGetValueByKey = jest.spyOn(fakeClient, "getValueByKey").mockResolvedValue(JSON.stringify({
            answer: "###Answer: B",
            explanation: "Some explanation",
        }));

        const result = await handler(fakeMessage as TelegramBot.Message, fakeMatch as RegExpExecArray);

        expect(result).toBeUndefined();
        expect(spyOnGetValueByKey).toBeCalledWith("12");
        expect(spyOnSendMessage).toBeCalledTimes(4);
        expect(spyOnSendMessage).toHaveBeenNthCalledWith(1, 12, "Wrong answer!");
        expect(spyOnSendMessage).toHaveBeenNthCalledWith(2, 12, "🥶🥶🥶😭😭😭");
        expect(spyOnSendMessage).toHaveBeenNthCalledWith(3, 12, "Explanation!");
        expect(spyOnSendMessage).toHaveBeenNthCalledWith(4, 12, "Some explanation", { parse_mode: "Markdown" });
    });

    it("wrong answer(without  explanation)", async () => {
        const fakeMessage = { chat: { id: 12} };
        const fakeMatch = [undefined, "A"];
        const handler = answerHandler(
            fakeBot as unknown as TelegramBot,
            fakeClient as unknown as Redis,
        );

        const spyOnSendMessage = jest.spyOn(fakeBot, "sendMessage").mockResolvedValue(undefined);
        const spyOnGetValueByKey = jest.spyOn(fakeClient, "getValueByKey").mockResolvedValue(JSON.stringify({
            answer: "###Answer: B",
        }));

        const result = await handler(fakeMessage as TelegramBot.Message, fakeMatch as RegExpExecArray);

        expect(result).toBeUndefined();
        expect(spyOnGetValueByKey).toBeCalledWith("12");
        expect(spyOnSendMessage).toBeCalledTimes(2);
        expect(spyOnSendMessage).toHaveBeenNthCalledWith(1, 12, "Wrong answer!");
        expect(spyOnSendMessage).toHaveBeenNthCalledWith(2, 12, "🥶🥶🥶😭😭😭");
    });
});
