import "reflect-metadata";
import 'mocha';
import { expect } from 'chai';
import { PingFinder } from "../src/services/doge/ping-finder";
import { DogeMessageResponder } from "../src/services/doge/doge-message-responder";
import { instance, mock, verify, when } from "ts-mockito";
import { Message } from "discord.js";

describe('MessageResponder', () => {
  let mockedPingFinderClass: PingFinder;
  let mockedPingFinderInstance: PingFinder;
  let mockedMessageClass: Message;
  let mockedMessageInstance: Message;

  let service: DogeMessageResponder;

  beforeEach(() => {
    mockedPingFinderClass = mock(PingFinder);
    mockedPingFinderInstance = instance(mockedPingFinderClass);
    mockedMessageClass = mock(Message);
    mockedMessageInstance = instance(mockedMessageClass);
    setMessageContents();

    service = new DogeMessageResponder(mockedPingFinderInstance);
  })

  it('should reply No ping, just pet', async () => {
    whenIsPingThenReturn(true);

    await service.handleMessage(mockedMessageInstance);

    verify(mockedMessageClass.reply('No ping, just pet')).once();
  })

  it('should not reply No ping, just pet', async () => {
    whenIsPingThenReturn(false);

    await service.handleMessage(mockedMessageInstance).then(() => {
      // Successful promise is unexpected, so we fail the test
      expect.fail('Unexpected promise');
    }).catch(() => {
      // Rejected promise is expected, so nothing happens here
    });

    verify(mockedMessageClass.reply('No ping, just pet')).never();
  })

  function setMessageContents() {
    mockedMessageInstance.content = "Non-empty string";
  }

  function whenIsPingThenReturn(result: boolean) {
    when(mockedPingFinderClass.isPing("Non-empty string")).thenReturn(result);
  }
});