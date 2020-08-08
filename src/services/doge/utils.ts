import { Message } from 'discord.js';
import { Snowflake } from 'discord.js';
import { User } from 'discord.js';

export class Utils {
	static checkBotMention(message: Message): boolean {
        for (var [id, user] of message.mentions.users) {
            if (user.username === 'plspet bot') {
                return true;
            }
        }
        return false;
    }

    static getMentionedUsers(message: Message): User[] {
        var mentionedUsers = [];
        for (var [id, user] of message.mentions.users) {
            if (user.username === 'plspet bot') {
                continue;
            }
            mentionedUsers.push(user);
        }
        return mentionedUsers;
    }

    static random(max: number): number {
    	return Math.floor(Math.random() * max)
    }

    static getUserMentionFromId(id: Snowflake): string {
    	return '<@' + id + '>';
    }
}