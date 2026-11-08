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
