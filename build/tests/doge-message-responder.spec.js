"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("mocha");
const chai_1 = require("chai");
const ping_finder_1 = require("../src/services/ping-finder");
const doge_message_responder_1 = require("../src/services/doge/doge-message-responder");
const ts_mockito_1 = require("ts-mockito");
const discord_js_1 = require("discord.js");
describe('MessageResponder', () => {
    let mockedPingFinderClass;
    let mockedPingFinderInstance;
    let mockedMessageClass;
    let mockedMessageInstance;
    let service;
    beforeEach(() => {
        mockedPingFinderClass = ts_mockito_1.mock(ping_finder_1.PingFinder);
        mockedPingFinderInstance = ts_mockito_1.instance(mockedPingFinderClass);
        mockedMessageClass = ts_mockito_1.mock(discord_js_1.Message);
        mockedMessageInstance = ts_mockito_1.instance(mockedMessageClass);
        setMessageContents();
        service = new doge_message_responder_1.DogeMessageResponder(mockedPingFinderInstance);
    });
    it('should reply No ping, just pet', () => __awaiter(void 0, void 0, void 0, function* () {
        whenIsPingThenReturn(true);
        yield service.handleMessage(mockedMessageInstance);
        ts_mockito_1.verify(mockedMessageClass.reply('No ping, just pet')).once();
    }));
    it('should not reply No ping, just pet', () => __awaiter(void 0, void 0, void 0, function* () {
        whenIsPingThenReturn(false);
        yield service.handleMessage(mockedMessageInstance).then(() => {
            // Successful promise is unexpected, so we fail the test
            chai_1.expect.fail('Unexpected promise');
        }).catch(() => {
            // Rejected promise is expected, so nothing happens here
        });
        ts_mockito_1.verify(mockedMessageClass.reply('No ping, just pet')).never();
    }));
    function setMessageContents() {
        mockedMessageInstance.content = "Non-empty string";
    }
    function whenIsPingThenReturn(result) {
        ts_mockito_1.when(mockedPingFinderClass.isPing("Non-empty string")).thenReturn(result);
    }
});
//# sourceMappingURL=doge-message-responder.spec.js.map