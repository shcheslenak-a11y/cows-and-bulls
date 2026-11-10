import { QuessReslut } from "./interfaces.js";
export declare function generateSecret(length: number, base: string, random?: () => number): string;
export declare function evaluateGuess(secret: string, guess: string): QuessReslut;
export declare function createDigitValidator(base: string): (char: string) => boolean;
export declare function isValidGuess(guess: string, length: number, base: string): boolean;
export declare function countPossibleSecrets(length: number, base: string): number;
//# sourceMappingURL=game-logic.d.ts.map