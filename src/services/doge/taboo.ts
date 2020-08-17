import { Message } from "discord.js";
import { Utils } from "./utils";
import { injectable } from "inversify";
import { createReadStream, readdir } from "fs";
import * as path from "path";
import * as rd from "readline";

@injectable()
export class Taboo {
  private words: [string, string[]][];
  private isOngoing: boolean;
  private currentMaster: string;
  private currentWordIndex: number;
  private isInitialized: boolean;


  constructor(
  ) {
    this.words = [
      ["shany", ["gato", "animal", "estimacao", "gordo"]],
      ["ktt", ["nicolas", "masanori", "puku", "irmao", "oe"]],
      ["divino", ["rei", "deus", "eiki"]],
      ["jair", ["advogado", "messi", "smash", "risotto"]],
      ["eiki", ["deus", "choucha", "marye", "namorado"]],
      ["juan", ["chris", "martin", "pokemon", "amigo"]]
    ];
    this.isInitialized = false;
  }
  run(message: Message):
    Promise<Message | Message[]> {
    if (!this.isInitialized) {
      // Need to run 'npm run copy-assets' for the file to be copied.
      this.initialize();
      return Promise.reject();
    }
    if (this.isOngoing) {
      console.log("Game is ongoing");
      if (message.content.match(/^gibe word$/i)) {
        return message.reply("no da. " + this.currentMaster + " ja tem uma palavra");
      }
      if (message.author.username == this.currentMaster) {
        var word = this.words[this.currentWordIndex][0];
        if (this.areEqual(message.content, word)) {
          this.isOngoing = false;
          console.log("ei non pode falar " + word + " rip");
          return message.reply("ei non pode falar " + word + " rip");
        }
        var tabooWords = this.words[this.currentWordIndex][1];
        for (var taboo of tabooWords) {
          if (this.areEqual(message.content, taboo)) {
            this.isOngoing = false;
            console.log("ei non pode falar " + taboo + " rip");
            return message.reply("ei non pode falar " + taboo + " rip");
          }
        }
      } else {
        var currentWord = this.words[this.currentWordIndex][0];
        if (this.areEqual(message.content, currentWord)) {
          console.log("Game ended - word was guessed by " + message.author.username);
          this.isOngoing = false;
          return message.reply("boa, a palavra era " + currentWord);
        }
      }
    } else {
      console.log("No ongoing game");
      if (message.content.match(/^gibe word$/i)) {
        this.isOngoing = true;
        this.currentWordIndex = Utils.random(this.words.length);
        this.currentMaster = message.author.username;
        console.log("Starting game with " + this.currentMaster + "/" + this.words[this.currentWordIndex][0]);
        message.author.send("a palavra eh " + this.words[this.currentWordIndex][0]
          + " e nao pode falar " + this.words[this.currentWordIndex][1]);
        return message.reply("toma");
      }
    }
  }

  initialize(): void {
    let reader = rd.createInterface(createReadStream(path.join(__dirname, "../../res/ssb.csv"), "utf8"));
    reader.on("line", (l: string) => {
      var tokens = l.split(",");
      var name = tokens[0];
      var specifics = tokens[1].split("#");
      var related = tokens[2].split("#").filter(n => n !== name);
      this.words.push([name, specifics.concat(related)]);
    })
    reader.on("close", () => {
      this.isInitialized = true;
    })
  }

  areEqual(a: string, b: string): boolean {
    return this.trim(a.toLowerCase()) === this.trim(b.toLowerCase());
  }

  trim(a: string): string {
    return a.replace(/^\s+|\s+$/g, '');
  }
}