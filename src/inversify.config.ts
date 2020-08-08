import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Client } from "discord.js";
import { DogeMessageResponder } from "./services/doge/doge-message-responder";
import { PingFinder } from "./services/doge/ping-finder";
import { DogeBot } from "./services/doge/doge-bot";

let container = new Container();

container.bind<DogeBot>(TYPES.DogeBot).to(DogeBot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<DogeMessageResponder>(TYPES.DogeMessageResponder).to(DogeMessageResponder).inSingletonScope();
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope();

export default container;