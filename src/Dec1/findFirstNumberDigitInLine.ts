//runFirstPuzzleAlgo();
//runSample();

import { DigitWithIndex, digitRegex } from "../Reuseable/types.ts";

//runRealInput();
function findFirstNumberDigitInLine(line: string): DigitWithIndex {
for (let i = 0; i < line.length; i++) {
if (digitRegex.test(line[i])) {
{
return { index: i, digit: parseInt(line[i]) };
}
}
return { index: line.length, digit: 0 };
}

function findFirstWordDigitInLine(line: string): DigitWithIndex {
let smallestIndex: number = line.length;
let firstDigit: number = 0;
for (let i = 1; i < digitWordArray.length; i++) {
const currIndex: number = line.indexOf(digitWordArray[i]);
if (currIndex != -1 && currIndex < smallestIndex) {
smallestIndex = currIndex;
firstDigit = i;
}
}
// console.log( smallestIndex );
return { index: smallestIndex, digit: firstDigit };
}

function getFirstRelevantDigit(line: string): number {
const firstDigitNumberData: DigitWithIndex = findFirstNumberDigitInLine(line);
const firstDigitWordData: DigitWithIndex = findFirstWordDigitInLine(line);

return firstDigitNumberData.index < firstDigitWordData.index ? firstDigitNumberData.digit : firstDigitWordData.digit;
}

function findLastNumberDigitInLine(line: string): DigitWithIndex {
for (let i = line.length - 1; i >= 0; i--) {
if (digitRegex.test(line[i])) {
//console.log( line[ i ] );
//console.log( i );
return { index: i, digit: parseInt(line[i]) };
}
}
return { index: -1, digit: 0 };
}

function findLastWordDigitInLine(line: string): DigitWithIndex {
let biggestIndex: number = -1;
let lastDigit: number = 0;
for (let i = 1; i < digitWordArray.length; i++) {
const currIndex: number = line.lastIndexOf(digitWordArray[i]);
if (currIndex != -1 && currIndex > biggestIndex) {
biggestIndex = currIndex;
lastDigit = i;
}
}
return { index: biggestIndex, digit: lastDigit };
}

function getLastRelevantDigit(line: string): number {
const lastDigitNumberData: DigitWithIndex = findLastNumberDigitInLine(line);
const lastDigitWordData: DigitWithIndex = findLastWordDigitInLine(line);

return lastDigitNumberData.index > lastDigitWordData.index ? lastDigitNumberData.digit : lastDigitWordData.digit;
}

function combineFirstAndLastDigits(firstDigits: number[], lastDigits: number[]): number[] {
const comboNumbers: number[] = [];
for (let i = 0; i < firstDigits.length; i++) {
comboNumbers[i] = firstDigits[i] * 10 + lastDigits[i];
console.log(comboNumbers[i]);
}
return comboNumbers;
}

function runSample() {
sampleLineReader.on('line', (line: string) => {
lines.push(line);
firstDigits.push(getFirstRelevantDigit(line));
lastDigits.push(getLastRelevantDigit(line));
});

sampleLineReader.on('close', () => {
const combinedDigits: number[] = combineFirstAndLastDigits(firstDigits, lastDigits);

const initialValue = 0;
const sum: number = combinedDigits.reduce(
(accumulator, currentValue) => accumulator + currentValue,
initialValue
);
console.log(combinedDigits.length);
console.log(sum);
});
}

function runFirstPuzzleAlgo() {
bigBoyLineReader.on('line', (line: string) => {
lines.push(line);
firstDigits.push(findFirstNumberDigitInLine(line).digit);
lastDigits.push(findLastNumberDigitInLine(line).digit);
});

bigBoyLineReader.on('close', () => {
const combinedDigits: number[] = combineFirstAndLastDigits(firstDigits, lastDigits);

const initialValue = 0;
const sum: number = combinedDigits.reduce(
(accumulator, currentValue) => accumulator + currentValue,
initialValue
);
console.log(combinedDigits.length);
console.log(sum);
});
}

function runRealInput() {
bigBoyLineReader.on('line', (line: string) => {
lines.push(line);
firstDigits.push(getFirstRelevantDigit(line));
lastDigits.push(getLastRelevantDigit(line));
});

bigBoyLineReader.on('close', () => {
console.log('all done, son');
const combinedDigits: number[] = combineFirstAndLastDigits(firstDigits, lastDigits);
console.log(combinedDigits.length);

const initialValue = 0;
const sum: number = combinedDigits.reduce(
(accumulator, currentValue) => accumulator + currentValue,
initialValue
);

console.log(sum);
});

}
}
