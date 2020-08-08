import { Message } from "discord.js";
import { injectable } from "inversify";
import { MessageResponder } from "../../data-model/message-responder";

@injectable()
export class ShowdownMessageResponder extends MessageResponder {

  constructor(
  ) {
    super();
  }

  handleMessage(message: Message): Promise<Message | Message[]> {
    return message.reply('I\'m Showdown and I\`m kinda working lol');
  }
}