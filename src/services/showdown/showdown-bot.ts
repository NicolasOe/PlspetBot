import { Client, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { ShowdownMessageResponder } from "./showdown-message-responder";
import { Bot } from "../../data-model/bot";

@injectable()
export class ShowdownBot extends Bot {

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.ShowdownMessageResponder) messageResponder: ShowdownMessageResponder) {
    super(client, token, messageResponder);
  }

  /** @inheritdoc */
  public start() {
    return false;
  }

  /** @inheritdoc */
  public stop() {
  }
}