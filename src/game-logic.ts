import { QuessReslut } from "./interfaces.js";

export function generateSecret(
  length: number,
  base: string,
  random: () => number = Math.random,
): string {
  throw new Error("NotImplemented");
}

export function evaluateGuess(secret: string, guess: string): QuessReslut {
  throw new Error("NotImplemented");
}

export function createDigitValidator(base: string): (char: string) => boolean {
  throw new Error("NotImplemented");
}

export function isValidGuess(
  guess: string,
  length: number,
  base: string,
): boolean {
  throw new Error("NotImplemented");
}

export function countPossibleSecrets(length: number, base: string): number {
  throw new Error("NotImplemented");
}