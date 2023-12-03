export interface DigitWithIndex {
    index: number,
    digit: number
}

export const digitRegex: RegExp = /\d/;
export const wordRegex: RegExp = /[a-z]+/;
export const numberRegex: RegExp = /[0-9]+/g;
export const numberRegexGlobal: RegExp = /[0-9]+/;

export const digitWordArray : string[] = [ "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine" ];
export interface BallGameMinSpecs {
    id: number,
    red: number,
    blue: number,
    green: number
}
