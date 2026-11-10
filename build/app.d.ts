export declare class App {
    private dom;
    private config;
    private secret;
    private isGameActive;
    private validator;
    constructor();
    startGame(): void;
    guess(): void;
    endgame(): void;
    resign(): void;
    getLeaders(): {
        [key: string]: {
            [key: string]: Array<Array<string>>;
        };
    };
    addLeader(): void;
    showLeaders(): void;
    assign(): void;
}
//# sourceMappingURL=app.d.ts.map