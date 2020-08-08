import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { instance, mock, verify, when } from "ts-mockito";
import { Message } from "discord.js";
import { PetPingAction, PetPingActionParams } from "../src/services/doge/actions/pet-ping-action";

describe("PetPingAction", () => {
  let mockedMessageClass: Message;
  let mockedMessageInstance: Message;

  let service: PetPingAction;

  beforeEach(() => {
    mockedMessageClass = mock(Message);
    mockedMessageInstance = instance(mockedMessageClass);

    service = new PetPingAction();
  })

  it("when message is 'ping', should run", async () => {
    setMessageContents("ping");
    let [shouldRun, params] = service.precheckAndGetParams(mockedMessageInstance);
    expect(shouldRun).to.be.true;
    expect(Object.assign(new PetPingActionParams(false), params).isPet).to.be.false;
  })

  it("when message is 'pet', should run", async () => {
    setMessageContents("pet");
    let [shouldRun, params] = service.precheckAndGetParams(mockedMessageInstance);
    expect(shouldRun).to.be.true;
    expect(Object.assign(new PetPingActionParams(false), params).isPet).to.be.true;
  })

  it("when message is 'peter', should not run", async () => {
    setMessageContents("peter");
    let [shouldRun, params] = service.precheckAndGetParams(mockedMessageInstance);
    expect(shouldRun).to.be.false;
  })

  it("when message is 'petpet', should not run", async () => {
    setMessageContents("petpet");
    let [shouldRun, params] = service.precheckAndGetParams(mockedMessageInstance);
    expect(shouldRun).to.be.false;
  })

  it("when isPet is false, should reply 'No ping, just pet'", async () => {
    await service.run(mockedMessageInstance, new PetPingActionParams(false));

    verify(mockedMessageClass.reply("No ping, just pet")).once();
  })

  it("when isPet is true, should reply 'No pet, just ping'", async () => {
    await service.run(mockedMessageInstance, new PetPingActionParams(true));

    verify(mockedMessageClass.reply("No pet, just ping")).once();
  })

  function setMessageContents(content: string) {
    mockedMessageInstance.content = content;
  }
});