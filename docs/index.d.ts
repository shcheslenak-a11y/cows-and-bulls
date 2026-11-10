import { QuessReslut } from "./interfaces.js";
import { Config } from "./config.js";
export declare class DOMManager {
    private config;
    constructor(config: Config);
    timer(): void;
    gameStart(): boolean;
    getGuess(): string;
    removeLast(): void;
    show(result: QuessReslut): void;
    fillTable(): void;
    fillHeader(): void;
    createOptions(opt: string): HTMLElement;
    getActiveElements(): {
        start: HTMLElement | null;
        input: HTMLElement | null;
        leaders: HTMLElement | null;
    };
    invalidGuess(guess: string, err?: boolean): void;
    reset(): void;
    open(data: {
        header: string;
        content: Array<HTMLElement>;
    }): void;
    close(): void;
    showWin(): void;
    showLeaders(leaders: {
        [key: string]: {
            [key: string]: Array<Array<string>>;
        };
    }): void;
    fillLeaders(leaders: {
        [key: string]: {
            [key: string]: Array<Array<string>>;
        };
    }): void;
}
//# sourceMappingURL=index.d.ts.map