export class Config {
    base;
    length;
    isGameOn;
    turns;
    time;
    history;
    constructor() {
        this.base = "";
        this.length = 0;
        this.isGameOn = false;
        this.turns = 0;
        this.time = 0;
        this.history = [];
    }
    clear() {
        this.base = "";
        this.length = 0;
        this.isGameOn = false;
        this.turns = 0;
        this.time = 0;
        this.history = [];
    }
    getBase() {
        return this.base;
    }
    setBase(base) {
        this.base = base;
    }
    getLength() {
        return this.length;
    }
    setLength(length) {
        this.length = length;
    }
    getTurns() {
        return this.turns;
    }
    increaseTurns() {
        this.turns += 1;
    }
    getTime() {
        return this.time;
    }
    increaseTime() {
        this.time += 1;
    }
    getStatus() {
        return this.isGameOn;
    }
    setStatus(status) {
        this.isGameOn = status;
    }
    getHistory() {
        return this.history;
    }
    addHistory(row) {
        this.history = [...this.history, row];
    }
}
//# sourceMappingURL=config.js.map