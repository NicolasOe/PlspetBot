import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { Utils } from "../utils";
import { Action } from "../../../data-model/action";
import { ActionParams } from "../../../data-model/action";

@injectable()
export class TooChattyAction extends Action {
  private tooChattyWarnings: string[];
  private chattyExemption: string[];
  private lastChatter: string;
  private consecutiveMessages: number;
  constructor(
  ) {
    super();
    this.tooChattyWarnings = ["ei tu falas muito", "ninguem te curte",
      "ei tu falas demais", "ta feio ja", "vai dormir vai"];
    this.chattyExemption = ["bimaoe"];
  }

  precheckAndGetParams(message: Message): [boolean, ActionParams] {
    return [true,
      new TooChattyActionParams(message.author.username)];
  }

  run(message: Message, params: TooChattyActionParams): Promise<Message | Message[]> {
    if (this.lastChatter === params.username) {
      this.consecutiveMessages = this.consecutiveMessages + 1;
    } else {
      this.lastChatter = params.username;
      this.consecutiveMessages = 1;
    }
    if (!this.chattyExemption.includes(params.username)) {
      if (this.consecutiveMessages === 5) {
        return message.reply("ei tu falas muito");
      } else if (this.consecutiveMessages % 10 === 0) {
        return message.reply(this.tooChattyWarnings[Utils.random(
          this.tooChattyWarnings.length)]);
      }
    }
    return null;
  }
}

export class TooChattyActionParams extends ActionParams {
  public username: string;
  constructor(username: string) {
    super();
    this.username = username;
  }
}