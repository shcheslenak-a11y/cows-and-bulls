import { QuessReslut, BaseData } from "./interfaces.js";

function getBase(base: string): BaseData {
  switch (base) {
    case "bin":
      return { numeric: 2, chars: ["0", "1"] };
    case "oct":
      return { numeric: 8, chars: ["0", "1", "2", "3", "4", "5", "6", "7"] };
    case "dec":
      return {
        numeric: 10,
        chars: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      };
    case "hex":
      return {
        numeric: 16,
        chars: [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
        ],
      };
    default:
      throw new Error("Base must be 'bin', 'oct', 'dec' or 'hex'");
  }
}

function validateLength(length: number): void {
  if (typeof length != "number" || length > 6 || length < 2)
    throw new Error("Length must be a number between 2 and 6");
}

export function generateSecret(
  length: number,
  base: string,
  random: () => number = Math.random,
): string {
  const selected = new Set();
  let secret = "";
  const baseData = getBase(base);
  validateLength(length);
  if (base == "bin" && length != 2)
    throw new Error("Base 'bin' support only length 2");
  while (secret.length < length) {
    const index = Math.floor(random() * baseData.numeric);
    if (!selected.has(index)) {
      selected.add(index);
      secret += baseData.chars[index];
    }
  }
  return secret;
}

export function evaluateGuess(secret: string, guess: string): QuessReslut {
  throw new Error("NotImplemented");
}

export function createDigitValidator(base: string): (char: string) => boolean {
  const baseData = getBase(base);
  return function (char: string) {
    return baseData.chars.includes(char.toUpperCase());
  };
}

export function isValidGuess(
  guess: string,
  length: number,
  base: string,
): boolean {
  throw new Error("NotImplemented");
}

const guessNumber = new Map();

export function countPossibleSecrets(length: number, base: string): number {
  const charNumber = getBase(base).numeric;
  validateLength(length);
  if (!guessNumber.has(charNumber)) guessNumber.set(charNumber, new Map());
  const numbers = guessNumber.get(charNumber);
  numbers.set(2, charNumber * (charNumber - 1));
  function count(length: number, base: number): number {
    if (!numbers.has(length)) {
      numbers.set(length, (base - length + 1) * count(length - 1, base));
    }
    return numbers.get(length);
  }
  return count(length, charNumber);
}
