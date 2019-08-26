import TelegramBot from "node-telegram-bot-api";
import { answerHandler, getQuestionHandler, startHandler } from "./handlers";
import { Redis } from "./services";

const botToken = process.env.tel_bot_token;

const client = new Redis("localhost", 6379, (err: Error) => console.log("REDIS ERROR : ", err));
const bot = new TelegramBot(botToken, { polling: true });

bot.onText(/\/start/, startHandler(bot));
bot.onText(/get question/, getQuestionHandler(bot, client));
bot.onText(/- (.+)/, answerHandler(bot, client));
