import "reflect-metadata";
import "mocha";
import { expect } from "chai";
import { instance, mock, verify, when, capture, anyString } from "ts-mockito";
import { Message, User } from "discord.js";
import { Taboo } from "../src/services/doge/taboo";

describe("Taboo", () => {
  let mockedMessageClass: Message;
  let mockedMessageInstance: Message;
  let mockedUserClass: User;
  let mockedUserInstance: User;

  let service: Taboo;

  beforeEach(() => {
    mockedMessageClass = mock(Message);
    mockedMessageInstance = instance(mockedMessageClass);
    mockedUserClass = mock(User);
    mockedUserInstance = instance(mockedUserClass);

    service = new Taboo();
  })

  it("when is ongoing and message is 'gibe word', should not send word in dm", async () => {
    setMessageContents("gibe word", null);
    await service.run(mockedMessageInstance);
    await service.run(mockedMessageInstance);
    verify(mockedUserClass.send(anyString())).once();
  })

  it("when is not ongoing and message is 'gibe word', should send word in dm", async () => {
    setMessageContents("gibe word", null);
    await service.run(mockedMessageInstance);
    let dm = capture(mockedUserClass.send).first();
    expect(dm[0].match(/a palavra eh (\w+) e nao pode falar (\w,?)+/i), "dm didn't match regex");
  })

  it("when master sends forbidden word, should warn and end game", async () => {
    setMessageContents("gibe word", "ktt");
    await service.run(mockedMessageInstance);
    let dm = capture(mockedUserClass.send).first()[0];
    let match = dm.match(/a palavra eh (\w+) e nao pode falar (\w+,?)+/i);
    setMessageContents(match[2], "ktt");
    await service.run(mockedMessageInstance);
    verify(mockedMessageClass.reply("ei non pode falar " + match[2] + " rip")).once();
  })

  it("when master sends word to be guessed, should warn and end game", async () => {
    setMessageContents("gibe word", "ktt");
    await service.run(mockedMessageInstance);
    let dm = capture(mockedUserClass.send).first()[0];
    let match = dm.match(/a palavra eh (\w+) e nao pode falar (\w+,?)+/i);
    setMessageContents(match[1], "ktt");
    await service.run(mockedMessageInstance);
    verify(mockedMessageClass.reply("ei non pode falar " + match[1] + " rip")).once();
  })

  it("when other sends word to be guessed, game ends", async () => {
    setMessageContents("gibe word", "ktt");
    await service.run(mockedMessageInstance);
    let dm = capture(mockedUserClass.send).first()[0];
    let match = dm.match(/a palavra eh (\w+) e nao pode falar (\w+,?)+/i);
    setMessageContents(match[1], "choucha");
    await service.run(mockedMessageInstance);
    verify(mockedMessageClass.reply("boa, a palavra era " + match[1])).once();
  })

  function setMessageContents(content: string, username: string) {
    mockedUserInstance.username = username ?? "ktt";
    mockedMessageInstance.author = mockedUserInstance;
    mockedMessageInstance.content = content;
  }
});