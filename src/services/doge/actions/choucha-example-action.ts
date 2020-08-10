import { Message } from "discord.js";
import { inject, injectable } from "inversify";
import { Action } from "../../../data-model/action";
import { ActionParams } from "../../../data-model/action";

@injectable()
export class ChouchaExampleAction extends Action {
  private total: number;

  constructor() {
    super();
    this.total = 0;
  }

  precheckAndGetParams(message: Message): [boolean, ActionParams] {
    let match = message.content.match(/me\sda\s(\d+)\s(cafe|cha|coxinha)/i);
    if (match === null) {
      return [false, null];
    }

    let pedido = match[2];
    let qntdade = match[1];
    return [true, new ChouchaExampleActionParams(pedido, parseInt(qntdade))];
  }

  //tipo_do_retorno funcao (tipo nome_da_variavel)
  //funcao (nome_da_variavel: tipo): tipo_do_retorno
  run(message: Message, params: ChouchaExampleActionParams):
    Promise<Message | Message[]> {
    if (params.pedido === "cafe") {
      this.total += 10 * params.qntdade;
      message.reply("seu pedido foi " + params.pedido + " custa R$ 10,00");
    }
    if (params.pedido !== "cafe") {
      this.total += 20 * params.qntdade;
      message.reply("seu pedido foi " + params.pedido + " custa R$ 20,00");
    }
    // id da ktt <@!263103305343959041>

    return message.channel.send("a conta deu " + this.total + " paga ai <@!263103305343959041>");
  }
}

export class ChouchaExampleActionParams extends ActionParams {
  public pedido: string;
  public qntdade: number;
  constructor(pedido: string,
    qntdade: number) {
    super();
    this.pedido = pedido;
    this.qntdade = qntdade;
  }
}