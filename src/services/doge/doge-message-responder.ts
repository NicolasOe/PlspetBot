import { Message } from "discord.js";
import { PingFinder } from "./../ping-finder";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { MessageResponder } from "../../data-model/message-responder";

@injectable()
export class DogeMessageResponder extends MessageResponder {
    private pingFinder: PingFinder;

    constructor(
        @inject(TYPES.PingFinder) pingFinder: PingFinder
    ) {
        super();
        this.pingFinder = pingFinder;
    }

    handleMessage(message: Message): Promise<Message | Message[]> {
        if (this.pingFinder.isPing(message.content)) {
            return message.reply('No ping, just pet');
        }

        return Promise.reject();
    }
}