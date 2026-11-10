import { describe, expect, test } from "@jest/globals";
import { countPossibleSecrets } from "../src/game-logic";

describe("countPossibleSecrets function", () => {
  test("should calculate numer of unique quesses", () => {
    expect(countPossibleSecrets(2, "bin")).toBe(2);

    expect(countPossibleSecrets(2, "oct")).toBe(56);
    expect(countPossibleSecrets(3, "oct")).toBe(336);
    expect(countPossibleSecrets(4, "oct")).toBe(1680);
    expect(countPossibleSecrets(5, "oct")).toBe(6720);
    expect(countPossibleSecrets(6, "oct")).toBe(20160);

    expect(countPossibleSecrets(2, "dec")).toBe(90);
    expect(countPossibleSecrets(3, "dec")).toBe(720);
    expect(countPossibleSecrets(4, "dec")).toBe(5040);
    expect(countPossibleSecrets(5, "dec")).toBe(30240);
    expect(countPossibleSecrets(6, "dec")).toBe(151200);

    expect(countPossibleSecrets(2, "hex")).toBe(240);
    expect(countPossibleSecrets(3, "hex")).toBe(3360);
    expect(countPossibleSecrets(4, "hex")).toBe(43680);
    expect(countPossibleSecrets(5, "hex")).toBe(524160);
    expect(countPossibleSecrets(6, "hex")).toBe(5765760);
  });

  test("fail on invalid length", () => {
    expect(() => countPossibleSecrets(1, "oct")).toThrow(
      "Length must be a number between 2 and 6",
    );
    expect(() => countPossibleSecrets(7, "oct")).toThrow(
      "Length must be a number between 2 and 6",
    );
    expect(() => countPossibleSecrets("dada", "oct")).toThrow(
      "Length must be a number between 2 and 6",
    );
  });

  test("fail on invalid base", () => {
    expect(() => countPossibleSecrets(2, "qua")).toThrow(
      "Base must be 'bin', 'oct', 'dec' or 'hex'",
    );
    expect(() => countPossibleSecrets(3, 2)).toThrow(
      "Base must be 'bin', 'oct', 'dec' or 'hex'",
    );
    expect(() => countPossibleSecrets(4, 8)).toThrow(
      "Base must be 'bin', 'oct', 'dec' or 'hex'",
    );
  });
});
