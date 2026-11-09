export class Config {
  private base: string;
  private length: number;
  private isGameOn: boolean;
  private turns: number;
  private time: number;
  private history: Array<Array<string>>;

  constructor() {
    this.base = '';
    this.length = 0;
    this.isGameOn = false;
    this.turns = 0;
    this.time = 0;
    this.history = [];
  }

  clear() {
    this.base = '';
    this.length = 0;
    this.isGameOn = false;
    this.turns = 0;
    this.time = 0;
    this.history = [];
  }

  getBase() {
    return this.base;
  }
  setBase(base: string) {
    this.base = base;
  }

  getLength() {
    return this.length;
  }
  setLength(length: number) {
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
  setStatus(status: boolean) {
    this.isGameOn = status;
  }
  getHistory() {
    return this.history;
  }
  addHistory(row: Array<string>) {
    this.history = [...this.history, row];
  }
}
