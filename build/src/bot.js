"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
const discord_js_1 = require("discord.js");
const inversify_1 = require("inversify");
const types_1 = require("./types");
const doge_message_responder_1 = require("./services/doge/doge-message-responder");
let Bot = class Bot {
    constructor(client, username, token, messageResponder) {
        this.client = client;
        this.token = token;
        this.username = username;
        this.messageResponder = messageResponder;
    }
    listen() {
        this.client.on('message', (message) => {
            if (message.author.bot) {
                console.log('Ignoring bot message!');
                return;
            }
            if (!this.username) {
                console.log('Please update your .env file with a new value USER=[your username here] to proceed');
                return;
            }
            console.log("Message received! Contents: ", message.content);
            message.reply('[' + this.username + ']\n').then(() => {
                this.messageResponder.handleMessage(message).then(() => {
                    console.log("Response sent!");
                }).catch(() => {
                    console.log("Response not sent.");
                });
            });
        });
        return this.client.login(this.token);
    }
};
Bot = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.TYPES.Client)),
    __param(1, inversify_1.inject(types_1.TYPES.Username)),
    __param(2, inversify_1.inject(types_1.TYPES.Token)),
    __param(3, inversify_1.inject(types_1.TYPES.DogeMessageResponder)),
    __metadata("design:paramtypes", [discord_js_1.Client, String, String, doge_message_responder_1.DogeMessageResponder])
], Bot);
exports.Bot = Bot;
//# sourceMappingURL=bot.js.map