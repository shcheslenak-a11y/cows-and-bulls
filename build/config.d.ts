export declare class Config {
    private base;
    private length;
    private isGameOn;
    private turns;
    private time;
    private history;
    constructor();
    clear(): void;
    getBase(): string;
    setBase(base: string): void;
    getLength(): number;
    setLength(length: number): void;
    getTurns(): number;
    increaseTurns(): void;
    getTime(): number;
    increaseTime(): void;
    getStatus(): boolean;
    setStatus(status: boolean): void;
    getHistory(): string[][];
    addHistory(row: Array<string>): void;
}
//# sourceMappingURL=config.d.ts.map