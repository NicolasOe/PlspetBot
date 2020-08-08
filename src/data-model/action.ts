import { Message } from "discord.js";
import { injectable } from "inversify";

@injectable()
export abstract class Action {
  abstract precheckAndGetParams(message: Message): [boolean, ActionParams];
  abstract run(message: Message, params: ActionParams):
    Promise<Message | Message[]>;
}

export abstract class ActionParams { }