import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Bot } from "./bot";
import { Client } from "discord.js";
import { DogeMessageResponder } from "./services/doge/doge-message-responder";
import { PingFinder } from "./services/doge/ping-finder";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<string>(TYPES.Username).toConstantValue(process.env.USER);
container.bind<DogeMessageResponder>(TYPES.DogeMessageResponder).to(DogeMessageResponder).inSingletonScope();
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope();

export default container;