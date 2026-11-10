import { describe, expect, test } from "@jest/globals";
import { createDigitValidator } from "../src/game-logic";

describe("createDigitValidator function", () => {
  test("should create validator", () => {
    const vlidator2 = createDigitValidator("bin");
    const vlidator8 = createDigitValidator("oct");
    const vlidator10 = createDigitValidator("dec");
    const vlidator16 = createDigitValidator("hex");
    expect(vlidator2("0")).toBe(true);
    expect(vlidator2("1")).toBe(true);
    expect(vlidator2("2")).toBe(false);
    expect(vlidator8("2")).toBe(true);
    expect(vlidator8("3")).toBe(true);
    expect(vlidator8("4")).toBe(true);
    expect(vlidator8("5")).toBe(true);
    expect(vlidator8("6")).toBe(true);
    expect(vlidator8("7")).toBe(true);
    expect(vlidator8("8")).toBe(false);
    expect(vlidator10("8")).toBe(true);
    expect(vlidator10("8")).toBe(true);
    expect(vlidator10("8")).toBe(true);
    expect(vlidator10("A")).toBe(false);
    expect(vlidator16("A")).toBe(true);
    expect(vlidator16("B")).toBe(true);
    expect(vlidator16("C")).toBe(true);
    expect(vlidator16("D")).toBe(true);
    expect(vlidator16("E")).toBe(true);
    expect(vlidator16("F")).toBe(true);
    expect(vlidator16("G")).toBe(false);
  });
  test("fail on invalid base", () => {
    expect(() => createDigitValidator("qua")).toThrow(
      "Base must be 'bin', 'oct', 'dec' or 'hex'",
    );
    expect(() => createDigitValidator("tri")).toThrow(
      "Base must be 'bin', 'oct', 'dec' or 'hex'",
    );
    expect(() => createDigitValidator(8)).toThrow(
      "Base must be 'bin', 'oct', 'dec' or 'hex'",
    );
  });
});
