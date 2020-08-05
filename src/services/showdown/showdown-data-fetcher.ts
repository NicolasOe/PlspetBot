import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { DataFetcher } from "../../data-model/data-fetcher";

@injectable()
export class ShowdownDataFetcher extends DataFetcher {

    constructor(
    ) {
        super();
    }

    handle(message: Message): Promise<Message | Message[]> {

        return Promise.reject();
    }
}