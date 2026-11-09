import {
  createDigitValidator,
  evaluateGuess,
  generateSecret,
  isValidGuess,
} from "./game-logic.js";
import { DOMManager } from "./index.js";
import { Config } from "./config.js";

let storage = window.localStorage;

export class App {
  private dom: DOMManager;
  private config: Config;
  private secret: string;
  private isGameActive: boolean;
  private validator: (char: string) => boolean;

  constructor() {
    this.config = new Config();
    this.dom = new DOMManager(this.config);
    this.secret = "";
    this.assign();
    this.validator = () => false;
    this.isGameActive = false
  }

  startGame() {
    if (this.dom.gameStart()) {
        this.isGameActive = true
      const base = this.config.getBase();
      this.secret = generateSecret(this.config.getLength(), base);
      this.validator = createDigitValidator(base);
    }
  }

  guess() {
    if (!this.config.getStatus()) return
    const guess = (this.dom.getGuess() || "").toUpperCase();
    const length = this.config.getLength();
    console.log("G", guess);
    if (guess.length) {
      if (!this.validator(guess.at(-1) || "")) {
        this.dom.removeLast();
        return;
      }
    }
    if (guess.length == length) {
      if (!isValidGuess(guess, guess.length, this.config.getBase())) {
        this.dom.invalidGuess();
        return;
      }
      if (this.config.getHistory().filter((item) => item[0] == guess).length) {
        this.dom.invalidGuess();
        return;
      }
      this.config.increaseTurns();
      const result = evaluateGuess(this.secret, guess);
      this.config.addHistory([
        guess,
        String(result.bulls),
        String(result.cows),
      ]);
      this.dom.show(result);

      if (result.bulls == length) this.endgame();
    }
  }

  endgame() {
    this.addLeader()
    this.dom.showWin()
    this.config.setStatus(false);
    this.secret = "";
  }

  resign() {
    this.config.setStatus(false);
    this.config.clear();
    this.dom.reset();
    this.secret = "";
    this.isGameActive = false;
  }

  getLeaders(){
    return JSON.parse(storage.getItem("leaders") || '{"bin": {"2":[]},"oct": {"2":[], "3": [], "4":[], "5":[], "6": []},"dec": {"2":[], "3": [], "4":[], "5":[], "6": []},"hex": {"2":[], "3": [], "4":[], "5":[], "6": []}}')
  }

  addLeader(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    let currentDate = `${dd}.${mm}.${yyyy}`
    let leaders = this.getLeaders()
    let leader = leaders[this.config.getBase()][String(this.config.getLength())]
    let i=0;
    for(; i<leader.length; i++){
        if(this.config.getTurns() < Number(leader[i][0])){
            console.log("<")
            break
        }
        if(this.config.getTurns() == Number(leader[i][0]) && this.config.getTime() < Number(leader[i][1])){
            console.log("=")
            break
        }
    }
    
    leader.splice(i, 0, [`${this.config.getTurns()}`,`${this.config.getTime()}`, currentDate])
    while (leader.length > 10) leader.pop();
    storage.setItem("leaders",  JSON.stringify(leaders))
  }

  showLeaders() {
    const leaders = this.getLeaders()
    this.dom.showLeaders(leaders)
  }

  assign() {
    const activeElements = this.dom.getActiveElements();
    activeElements.start?.addEventListener("click", () => {
      if (this.isGameActive) this.resign();
      else this.startGame();
    });
    activeElements.input?.addEventListener("input", () => {
      this.guess();
    });

    activeElements.leaders?.addEventListener("click", () => {
      this.showLeaders();
    });
  }
}
