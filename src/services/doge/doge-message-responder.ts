import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { MessageResponder } from "../../data-model/message-responder";
import { PetPingAction } from "./actions/pet-ping-action";
import { Action } from "../../data-model/action";

@injectable()
export class DogeMessageResponder extends MessageResponder {
  private actionList: Action[];

  constructor(
    @inject(PetPingAction) petPingAction: PetPingAction
  ) {
    super();
    this.actionList = [petPingAction];
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