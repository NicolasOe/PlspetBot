import { Message } from "discord.js";
import { User } from "discord.js";
import { Utils } from "../utils";
import { inject, injectable } from "inversify";
import { Action } from '../../../data-model/action';
import { ActionParams } from '../../../data-model/action';

@injectable()
export class ChangeNicknameAction extends Action {
  precheckAndGetParams(message: Message): [boolean, ActionParams] {
    let match = message.content.match(/call\s+(<@!?\w+>|me)\s+(\w+)$/i);
    if (!match) {
      return [false, null];
    }
    let userReference = match[1];
    let user = null;
    if (userReference === 'me') {
        user = message.author;
    } else {
      let mentionedUsers = Utils.getMentionedUsers(message);
      if (mentionedUsers.length === 1) {
        user = mentionedUsers[0];
      }
    }

    if (!user) {
      return [false, null];
    }

    return [true,
        new ChangeNicknameActionParams(user, match[2], userReference === 'me')];
  }

  run(message: Message, params: ChangeNicknameActionParams):
      Promise<Message | Message[]> {
    if (params.user.username === 'NicolasOe') {
      return message.reply((params.isSelfChange ? 'vc' : 'ele') + ' nao');
    } else {
      message.guild.members.fetch(params.user.id).then(
          member => member.setNickname(params.newNickname));
      if (params.isSelfChange) {
        return message.reply('okay ' + params.newNickname);
      } else {
        return message.channel.send(
            Utils.getUserMentionFromId(params.user.id)
            + ', ' + Utils.getUserMentionFromId(message.author.id)
            + ' changed your name');
      }
    }
  }
}

export class ChangeNicknameActionParams extends ActionParams {
  public user: User;
  public newNickname: string;
  public isSelfChange: boolean;
  constructor(user, newNickname, isSelfChange) {
    super();
    this.user = user;
    this.newNickname = newNickname;
    this.isSelfChange = isSelfChange;
  }
}