import { Message } from "discord.js";
import { injectable, inject } from "inversify";
import { TYPES } from "../types";

@injectable()
export abstract class MessageResponder {
    private userName: string;
    constructor(@inject(TYPES.Username) userName: string) {
        this.userName = userName;
    }
    abstract handleMessage(message: Message): Promise<Message | Message[]>;
}