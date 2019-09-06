import TelegramBot from "node-telegram-bot-api";
import { answerHandler, getQuestionHandler, startHandler } from "./handlers";
import { Redis } from "./services";

const {
    botToken,
    redisHost,
    redisPort = 6379,
} = process.env;

const client = new Redis(redisHost, +redisPort, (err: Error) => console.log("REDIS ERROR : ", err));
const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, startHandler(bot));
bot.onText(/get question/, getQuestionHandler(bot, client));
bot.onText(/- (.+)/, answerHandler(bot, client));
