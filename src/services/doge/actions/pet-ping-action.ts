import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { Action } from "../../../data-model/action";
import { ActionParams } from "../../../data-model/action";

@injectable()
export class PetPingAction extends Action {
  precheckAndGetParams(message: Message): [boolean, ActionParams] {
    let match = message.content.match(/(\s|^)(pet|ping)(\s|$)/i);
    if (match === null) {
      return [false, null];
    }
    return [true, new PetPingActionParams(match[2] === "pet")];
  }

  run(message: Message, params: PetPingActionParams):
    Promise<Message | Message[]> {
    if (params.isPet) {
      if (Math.floor(Math.random() * 5) === 0) {
        return message.reply({
          embed: {
            image: {
              url: "https://i.imgur.com/GqQFM1a.png"
            }
          }
        });
      } else {
        return message.reply("No pet, just ping");
      }
    } else {
      return message.reply("No ping, just pet");
    }
  }
}

export class PetPingActionParams extends ActionParams {
  public isPet: boolean;
  constructor(isPet: boolean) {
    super();
    this.isPet = isPet;
  }
}