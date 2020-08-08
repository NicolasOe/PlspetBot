import { Client, Message } from "discord.js";
import { inject, injectable } from "inversify";
import { TYPES } from "./types";
import { DogeMessageResponder } from "./services/doge/doge-message-responder";

@injectable()
export class Bot {
    private client: Client;
    private readonly token: string;
    private readonly username: string;
    private messageResponder: DogeMessageResponder;

    constructor(
        @inject(TYPES.Client) client: Client,
        @inject(TYPES.Username) username: string,
        @inject(TYPES.Token) token: string,
        @inject(TYPES.DogeMessageResponder) messageResponder: DogeMessageResponder) {
        this.client = client;
        this.token = token;
        this.username = username;
        this.messageResponder = messageResponder;
    }

    public listen(): Promise<string> {
        this.client.on('message', (message: Message) => {
            if (message.author.bot) {
                console.log('Ignoring bot message!')
                return;
            }
            if (!this.username) {
                console.log('Please update your .env file with a new value USER=[your username here] to proceed');
                return
            }

            console.log("Message received! Contents: ", message.content);


            message.reply('[' + this.username + ']\n').then(() => {
                this.messageResponder.handleMessage(message).then(() => {
                    console.log("Response sent!");
                }).catch(() => {
                    console.log("Response not sent.")
                })
            })
        });

        return this.client.login(this.token);
    }
}