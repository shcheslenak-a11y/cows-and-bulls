import { evaluateGuess, generateSecret, isValidGuess } from "./game-logic.js";
import { DOMManager } from "./index.js";


export class App{
    private dom:DOMManager;
    private config: {base: string, length:number, isGameOn: boolean, turns:number, timer:number};
    private secret: string;

    constructor() {
        this.config = {
            base: '0',
            length: 0,
            isGameOn: false,
            turns: 0,
            timer: 0
        };
        this.dom = new DOMManager(this.config);
        this.secret = '';
    }
}