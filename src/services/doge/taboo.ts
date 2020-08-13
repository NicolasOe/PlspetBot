import { Message } from "discord.js";
import { Utils } from "./utils";
import { injectable } from "inversify";

@injectable()
export class Taboo {
  private words: [string, string[]][];
  private isOngoing: boolean;
  private currentMaster: string;
  private currentWordIndex: number;


  constructor(
  ) {
    this.words = [
      ["shany", ["gato", "animal", "estimacao", "gordo"]],
      ["pikachu", ["pokemon", "eletrico", "choque", "raichu"]],
      ["ktt", ["nicolas", "masanori", "puku", "irmao", "oe"]],
      ["divino", ["rei", "deus", "eiki"]],
      ["jair", ["advogado", "messi", "smash", "risotto"]],
      ["eiki", ["deus", "choucha", "marye", "namorado"]],
      ["juan", ["chris", "martin", "pokemon", "amigo"]]
    ];
  }
  run(message: Message):
    Promise<Message | Message[]> {
    if (this.isOngoing) {
      console.log("Game is ongoing");
      if (message.author.username == this.currentMaster) {
        var word = this.words[this.currentWordIndex][0];
        if (message.content.match(word)) {
          this.isOngoing = false;
          console.log("ei non pode falar " + word + " rip");
          return message.reply("ei non pode falar " + word + " rip");
        }
        var tabooWords = this.words[this.currentWordIndex][1];
        for (var taboo of tabooWords) {
          if (message.content.match(taboo)) {
            this.isOngoing = false;
            console.log("ei non pode falar " + taboo + " rip");
            return message.reply("ei non pode falar " + taboo + " rip");
          }
        }
      } else {
        var currentWord = this.words[this.currentWordIndex][0];
        if (message.content.match(currentWord)) {
          console.log("Game ended - word was guessed by " + message.author.username);
          this.isOngoing = false;
          return message.reply("boa, a palavra era " + currentWord);
        }
      }
    } else {
      console.log("No ongoing game");
      if (message.content === "gibe word") {
        this.isOngoing = true;
        this.currentWordIndex = Utils.random(this.words.length);
        this.currentMaster = message.author.username;
        console.log("Starting game with " + this.currentMaster + "/" + this.words[this.currentWordIndex][0]);
        return message.author.send("a palavra eh " + this.words[this.currentWordIndex][0]
          + " e nao pode falar " + this.words[this.currentWordIndex][1]);
      }
    }
  }
}