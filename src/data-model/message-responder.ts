import { Message } from "discord.js";
import { injectable } from "inversify";

@injectable()
export abstract class MessageResponder {
    abstract handleMessage(message: Message): Promise<Message | Message[]>;
}