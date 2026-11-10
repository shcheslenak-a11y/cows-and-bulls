import { describe, expect, test } from "@jest/globals";
import { generateSecret } from "../src/game-logic";
import seedrandom from "seedrandom";

describe("generateSecret function", () => {
  test("should generate secret", () => {
    let rng = seedrandom("110");
    //base bin(2)
    expect(generateSecret(2, "bin", rng)).toBe("10");
    //base oct(8)
    for (let i = 2; i < 7; i += 1) {
      rng = seedrandom("110");
      const quess = "730614";
      expect(generateSecret(i, "oct", rng)).toBe(quess.slice(0, i));
    }
    //base dec(10)
    for (let i = 2; i < 7; i += 1) {
      rng = seedrandom("110");
      const quess = "941872";
      expect(generateSecret(i, "dec", rng)).toBe(quess.slice(0, i));
    }
    //base hex(16)
    for (let i = 2; i < 7; i += 1) {
      rng = seedrandom("110");
      const quess = "F71DC3";
      expect(generateSecret(i, "hex", rng)).toBe(quess.slice(0, i));
    }
  });
  test("fail on invalid length", () => {
    expect(() => generateSecret(1, "oct")).toThrow(
      "Length must be a number between 2 and 6",
    );
    expect(() => generateSecret(7, "oct")).toThrow(
      "Length must be a number between 2 and 6",
    );
    expect(() => generateSecret("dada", "oct")).toThrow(
      "Length must be a number between 2 and 6",
    );
  });

  test("fail on invalid base", () => {
    expect(() => generateSecret(2, "qua")).toThrow(
      "Base must be 'bin', 'oct', 'dec' or 'hex'",
    );
    expect(() => generateSecret(3, 2)).toThrow(
      "Base must be 'bin', 'oct', 'dec' or 'hex'",
    );
    expect(() => generateSecret(4, 8)).toThrow(
      "Base must be 'bin', 'oct', 'dec' or 'hex'",
    );
  });
  test("fail on lenght differnt from 2 with base 'bin", () => {
    expect(() => generateSecret(4, "bin")).toThrow(
      "Base 'bin' support only length 2",
    );
    expect(() => generateSecret(3, "bin")).toThrow(
      "Base 'bin' support only length 2",
    );
  });
});
