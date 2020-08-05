"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const inversify_1 = require("inversify");
const types_1 = require("./src/types");
const bot_1 = require("./src/bot");
const discord_js_1 = require("discord.js");
const doge_message_responder_1 = require("./src/services/doge/doge-message-responder");
const ping_finder_1 = require("./src/services/ping-finder");
let container = new inversify_1.Container();
container.bind(types_1.TYPES.Bot).to(bot_1.Bot).inSingletonScope();
container.bind(types_1.TYPES.Client).toConstantValue(new discord_js_1.Client());
container.bind(types_1.TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind(types_1.TYPES.DogeMessageResponder).to(doge_message_responder_1.DogeMessageResponder).inSingletonScope();
container.bind(types_1.TYPES.PingFinder).to(ping_finder_1.PingFinder).inSingletonScope();
exports.default = container;
//# sourceMappingURL=inversify.config.js.map