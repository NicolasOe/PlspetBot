import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { MessageResponder } from "../../data-model/message-responder";
import { PetPingAction } from "./actions/pet-ping-action";
import { ChouchaExampleAction } from "./actions/choucha-example-action";
import { TYPES } from "../../types";
import { Action } from "../../data-model/action";

@injectable()
export class DogeMessageResponder extends MessageResponder {
  private actionList: Action[];

  constructor(
    @inject(TYPES.PetPingAction) petPingAction: PetPingAction,
    @inject(TYPES.ChouchaExampleAction) chouchaExampleAction: ChouchaExampleAction
  ) {
    super();
    this.actionList = [petPingAction, chouchaExampleAction];
  }

  handleMessage(message: Message): Promise<Message | Message[]> {
    for (let action of this.actionList) {
      let [shouldRun, params] = action.precheckAndGetParams(message);
      if (shouldRun) {
        action.run(message, params);
      }
    }
    return Promise.reject();
  }
}