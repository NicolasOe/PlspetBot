import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "./types";
import { Client } from "discord.js";
import { DogeMessageResponder } from "./services/doge/doge-message-responder";
import { PingFinder } from "./services/doge/ping-finder";
import { DogeBot } from "./services/doge/doge-bot";
import { PetPingAction } from "./services/doge/actions/pet-ping-action";
import { ChouchaExampleAction } from "./services/doge/actions/choucha-example-action";
import { Taboo } from "./services/doge/taboo";

let container = new Container();

container.bind<DogeBot>(TYPES.DogeBot).to(DogeBot).inSingletonScope();
container.bind<Client>(TYPES.Client).toConstantValue(new Client());
container.bind<string>(TYPES.Token).toConstantValue(process.env.TOKEN);
container.bind<DogeMessageResponder>(TYPES.DogeMessageResponder).to(DogeMessageResponder).inSingletonScope();
container.bind<PingFinder>(TYPES.PingFinder).to(PingFinder).inSingletonScope();
container.bind<PetPingAction>(TYPES.PetPingAction).to(PetPingAction).inSingletonScope();
container.bind<ChouchaExampleAction>(TYPES.ChouchaExampleAction).to(ChouchaExampleAction).inSingletonScope();
container.bind<Taboo>(TYPES.Taboo).to(Taboo).inSingletonScope();

export default container;