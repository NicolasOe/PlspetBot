import { Client, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../../types";
import { DogeMessageResponder } from "./doge-message-responder";
import { Bot } from "../../data-model/bot";

@injectable()
export class DogeBot extends Bot {

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.DogeMessageResponder) messageResponder: DogeMessageResponder) {
    super(client, token, messageResponder);
  }

  public start(): boolean {
    this.listen().then(() => {
      console.log('Logged in!')
    }).catch((error) => {
      console.log('Oh no! ', error)
    });
    return true;
  }
  public stop(): void {
  }
}