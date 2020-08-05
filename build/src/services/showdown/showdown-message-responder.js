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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowdownMessageResponder = void 0;
const inversify_1 = require("inversify");
const message_responder_1 = require("../../data-model/message-responder");
let ShowdownMessageResponder = class ShowdownMessageResponder extends message_responder_1.MessageResponder {
    constructor() {
        super();
    }
    handleMessage(message) {
        return message.reply('I\'m Showdown and I\`m kinda working lol');
    }
};
ShowdownMessageResponder = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ShowdownMessageResponder);
exports.ShowdownMessageResponder = ShowdownMessageResponder;
//# sourceMappingURL=showdown-message-responder.js.map