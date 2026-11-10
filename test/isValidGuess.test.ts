import { describe, expect, test } from "@jest/globals";
import { isValidGuess } from "../src/game-logic";

describe("isValidGuess function", () => {
  test("should validate quess", () => {
    expect(isValidGuess("10", 2, "bin")).toBe(true);
    expect(isValidGuess("11", 2, "bin")).toBe(false);
    expect(isValidGuess("102", 3, "oct")).toBe(true);
    expect(isValidGuess("1021", 4, "oct")).toBe(false);
    expect(isValidGuess("10ABC", 5, "hex")).toBe(true);
    expect(isValidGuess("10ABCG", 5, "hex")).toBe(false);
  });
});
