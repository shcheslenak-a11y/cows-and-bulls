import { createDigitValidator, evaluateGuess, generateSecret, isValidGuess } from "./game-logic.js";
import { DOMManager } from "./index.js";


export class App{
    private dom:DOMManager;
    private config: {base: string, length:number, isGameOn: boolean, turns:number, timer:number, history: Array<Array<string>>};
    private secret: string;
    private validator: (char:string) => boolean;

    constructor() {
        this.config = {
            base: '0',
            length: 0,
            isGameOn: false,
            turns: 0,
            timer: 0,
            history: []
        };
        this.dom = new DOMManager(this.config);
        this.secret = '';
        this.assign();
        this.validator = () => false;
    }

    startGame() {
        if(this.dom.gameStart()){
            this.secret = generateSecret(this.config.length, this.config.base);
            this.validator = createDigitValidator(this.config.base);
        }
    }

    guess() {
        const guess = (this.dom.getGuess() || '').toUpperCase();
        console.log("G", guess);
        if (guess.length){
            if(!this.validator(guess.at(-1) || '')){
                this.dom.removeLast()
                return;
            }
        }
        if (guess.length == this.config.length){
            if(!isValidGuess(guess, guess.length, this.config.base)){
                this.dom.invalidGuess()
                return;
            }
            if(this.config.history.filter((item)=>item[0]==guess).length){
                this.dom.invalidGuess()
                return;
            }
            this.config.turns += 1;
            const result = evaluateGuess(this.secret, guess);
            this.config.history = [...this.config.history, [guess, String(result.bulls), String(result.cows)]]
            this.dom.show(result);
           
            if (result.bulls == this.config.length)
                this.endgame()
        }
    }

    endgame() {
        this.dom.stopGame();
        this.secret = '';
    }

    assign() {
        const activeElements = this.dom.getActiveElements();
        activeElements.start?.addEventListener('click', () => {this.startGame()})
        activeElements.input?.addEventListener('input', () => {console.log("GG");this.guess()})
    }
}