import { Client, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import { MessageResponder } from "./message-responder";

@injectable()
export abstract class Bot {
  protected client: Client;
  protected readonly token: string;
  protected messageResponder: MessageResponder;

  constructor(
    @inject(TYPES.Client) client: Client,
    @inject(TYPES.Token) token: string,
    @inject(TYPES.MessageResponder) messageResponder: MessageResponder) {
    this.client = client;
    this.token = token;
    this.messageResponder = messageResponder;
  }

  protected listen(): Promise<string> {
    this.client.on("message", (message: Message) => {
      if (message.author.bot) {
        console.log("Ignoring bot message!")
        return;
      }

      console.log("Message received! Contents: ", message.content);

      this.messageResponder.handleMessage(message).then(() => {
        console.log("Response sent!");
      }).catch(() => {
        console.log("Response not sent.")
      })
    });

    return this.client.login(this.token);
  }

  /** Starts the bot. Returns true if bot starts successfully */
  public abstract start(): boolean;
  public abstract stop(): void;
}