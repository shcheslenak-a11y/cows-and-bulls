import { describe, expect, test } from "@jest/globals";
import { generateSecret } from "../src/game-logic";
import seedrandom from "seedrandom";

describe("generateSecret function", () => {
  test("should generate secret", () => {
    const rng = seedrandom("110");
    //base bin(2)
    expect(generateSecret(2, "bin", rng)).toBe("10");
    //base oct(8)
    expect(generateSecret(2, "oct", rng)).toBe("73");
    expect(generateSecret(3, "oct", rng)).toBe("736");
    expect(generateSecret(4, "oct", rng)).toBe("7360");
    expect(generateSecret(5, "oct", rng)).toBe("73601");
    expect(generateSecret(6, "oct", rng)).toBe("736014");
    //base dec(10)
    expect(generateSecret(2, "dec", rng)).toBe("94");
    expect(generateSecret(3, "dec", rng)).toBe("941");
    expect(generateSecret(4, "dec", rng)).toBe("9418");
    expect(generateSecret(5, "dec", rng)).toBe("94187");
    expect(generateSecret(6, "dec", rng)).toBe("941872");
    //base hex(16)
    expect(generateSecret(2, "hex", rng)).toBe("F7");
    expect(generateSecret(3, "hex", rng)).toBe("F71");
    expect(generateSecret(4, "hex", rng)).toBe("F71D");
    expect(generateSecret(5, "hex", rng)).toBe("F71DC");
    expect(generateSecret(6, "hex", rng)).toBe("F71DC3");
  });
  test("fail on invalid length", () => {
    expect(() => generateSecret(1, "oct")).toThrow(
      "Length must be betweem 2 and 6",
    );
    expect(() => generateSecret(7, "oct")).toThrow(
      "Length must be betweem 2 and 6",
    );
    expect(() => generateSecret("dada", "oct")).toThrow(
      "Length must be betweem 2 and 6",
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
});
