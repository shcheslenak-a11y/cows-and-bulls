import { describe, expect, test } from "@jest/globals";
import { evaluateGuess } from "../src/game-logic";

describe("evaluateGuess function", () => {
  test("should compare secret & guess", () => {
    expect(evaluateGuess("10", "01")).toEqual({ bulls: 0, cows: 2 });
    expect(evaluateGuess("102", "301")).toEqual({ bulls: 1, cows: 1 });
    expect(evaluateGuess("1045", "0145")).toEqual({ bulls: 2, cows: 2 });
    expect(evaluateGuess("1023", "4567")).toEqual({ bulls: 0, cows: 0 });
    expect(evaluateGuess("123456", "123456")).toEqual({ bulls: 6, cows: 0 });
  });
});
