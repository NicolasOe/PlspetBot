import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./src/types";
import { Bot } from "./src/bot";
import { Client } from "discord.js";
import { DogeMessageResponder } from "./src/services/doge/doge-message-responder";
import { PingFinder } from "./src/services/doge/ping-finder";

let container = new Container();

container.bind<Bot>(TYPES.Bot).to(Bot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<DogeMessageResponder>(TYPES.DogeMessageResponder).to(DogeMessageResponder).inSingletonScope();
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope();

export default container;