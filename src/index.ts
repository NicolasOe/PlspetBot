require('dotenv').config(); // Recommended way of loading dotenv
import container from "./inversify.config";
import { TYPES } from "./types";
import { DogeBot } from "./services/doge/doge-bot";
let bot = container.get<DogeBot>(TYPES.DogeBot);
bot.start();