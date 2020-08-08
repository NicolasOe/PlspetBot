import { MessageResponder } from "../../data-model/message-responder";
import { Message } from "discord.js";

export class TournamentOrganizerMessageResponder extends MessageResponder {
    public handleMessage(message: Message): Promise<Message | Message[]> {
        return message.reply('I\'m Showdown and I\`m kinda working lol');
    }
}