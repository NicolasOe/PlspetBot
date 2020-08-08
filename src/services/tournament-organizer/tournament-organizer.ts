import { MessageResponder } from "../../data-model/message-responder";
import { Message } from "discord.js";
import { TournamentOrganizerMessageResponder } from "./tournament-organizer-message-responder";
import { injectable, inject } from "inversify";
import { TYPES } from "../../types";

@injectable()
export class TournamentOrganizer {
    private messageResponder: TournamentOrganizerMessageResponder;

    constructor(
        @inject(TYPES.TournamentOrganizerMessageResponder) messageResponder: TournamentOrganizerMessageResponder
    ) {
        this.messageResponder = messageResponder;
    }
}