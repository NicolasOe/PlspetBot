import "reflect-metadata";
import "mocha";
import { DogeMessageResponder } from "../src/services/doge/doge-message-responder";
import { instance, mock, verify, when } from "ts-mockito";
import { Message } from "discord.js";
import { PetPingAction } from "../src/services/doge/actions/pet-ping-action";

describe("MessageResponder", () => {
    let mockedPetPingActionClass: PetPingAction;
    let mockedPetPingActionInstance: PetPingAction;
    let mockedMessageClass: Message;
    let mockedMessageInstance: Message;

    let service: DogeMessageResponder;

    beforeEach(() => {
        mockedPetPingActionClass = mock(PetPingAction);
        mockedPetPingActionInstance = instance(mockedPetPingActionClass);
        mockedMessageClass = mock(Message);
        mockedMessageInstance = instance(mockedMessageClass);
    })
});