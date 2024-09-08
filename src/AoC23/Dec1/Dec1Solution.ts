import { DigitWithIndex, digitRegex, digitWordArray } from "../../Reuseable/types.ts";
import { readLines, sumUp } from "../../Reuseable/utils.ts";

// action

const sampleInputLines: string[] = await readLines('SampleInput.txt');
const puzzleInputLines: string[] = await readLines('PuzzleInput.txt');

const sampleCalibrationValues: number[] = getCalibrationValues( sampleInputLines );
const puzzleCalibrationValues: number[] = getCalibrationValues( puzzleInputLines );

const sampleSum: number = sumUp( sampleCalibrationValues );
console.log( "sampleSum " + sampleSum );

const puzzleSum: number = sumUp( puzzleCalibrationValues );
console.log( "puzzleSum " + puzzleSum );

// helper

function getCalibrationValues( inputLines : string[] ): number[]
{
    const firstDigits = findFirstDigits( inputLines );
    const lastDigits = findLastDigits( inputLines );

    return combineFirstAndLastDigits( firstDigits, lastDigits );
}

function findFirstDigits( lines: string[] ) : number[]
{
    const firstDigits : number[] = [];

    lines.forEach( line => {

        const firstNumberWithIndex: DigitWithIndex = findFirstNumberInLine( line );
        const firstWordWithIndex: DigitWithIndex = findFirstWordInLine( line );

        const firstDigit: number = determineFirstDigit( firstWordWithIndex, firstNumberWithIndex );

        firstDigits.push( firstDigit );

    });
    return firstDigits;
}

function findFirstNumberInLine( line: string ): DigitWithIndex
{
    let firstNumberWithIndex : DigitWithIndex = { index: line.length, digit: 0 };
    for( let i = 0; i < line.length; i++ )
    {
        if( digitRegex.test( line[ i ] ) )
        {
            return { index: i, digit: parseInt( line[ i ] ) }
        }
    }
    return firstNumberWithIndex;
}

function findFirstWordInLine( line: string ): DigitWithIndex
{
    let firstWordWithIndex : DigitWithIndex = { index: line.length, digit: 0 };

    for( let i = 1; i < digitWordArray.length; i++ )
    {
        const indexOfCurrentWord: number = line.indexOf( digitWordArray[ i ] );

        if( indexOfCurrentWord != -1 && indexOfCurrentWord < firstWordWithIndex.index )
        {
            firstWordWithIndex.index = indexOfCurrentWord;
            firstWordWithIndex.digit = i;
        }
    }
    return firstWordWithIndex;
}

function determineFirstDigit( firstWordWithIndex: DigitWithIndex, firstNumberWithIndex: DigitWithIndex ) : number
{
    return firstWordWithIndex.index < firstNumberWithIndex.index ? firstWordWithIndex.digit : firstNumberWithIndex.digit;
}

function findLastDigits ( lines: string[] ) : number []
{
    const lastDigits : number[] = [];

    lines.forEach( line => {

            const lastNumberWithIndex : DigitWithIndex = findLastNumberInLine( line );
            const lastWordWithIndex : DigitWithIndex = findLastWordInLine ( line );

            const lastDigit : number = determineLastDigit( lastWordWithIndex, lastNumberWithIndex );

            lastDigits.push( lastDigit );

        });

    return lastDigits;
}

function findLastNumberInLine( line : string )
{
    let lastNumberWithIndex : DigitWithIndex = { index: -1, digit: 0 };
    for( let i = line.length - 1; i >= 0; i-- )
    {
        if( digitRegex.test( line[ i ] ) )
        {
            return { index: i, digit: parseInt( line[ i ] ) }
        }
    }
    return lastNumberWithIndex;
}

function findLastWordInLine( line : string ) : DigitWithIndex
{
    let lastWordWithIndex : DigitWithIndex = { index: -1, digit: 0 };

    for( let i = 1; i < digitWordArray.length; i++ )
    {
        const indexOfCurrentWord: number = line.lastIndexOf( digitWordArray[ i ] );

        if( indexOfCurrentWord != -1 && indexOfCurrentWord > lastWordWithIndex.index )
        {
            lastWordWithIndex.index = indexOfCurrentWord;
            lastWordWithIndex.digit = i;
        }
    }
    return lastWordWithIndex;
}

function determineLastDigit( lastWordWithIndex : DigitWithIndex, lastNumberWithIndex : DigitWithIndex )
{
    return lastWordWithIndex.index > lastNumberWithIndex.index ? lastWordWithIndex.digit : lastNumberWithIndex.digit;
}

function combineFirstAndLastDigits( firstDigits : number[], lastDigits: number[] ): number[]
{
    const combinedNumbers : number[] = [];
    for( let i = 0; i < firstDigits.length; i++ )
    {
        combinedNumbers[ i ] = 10 * firstDigits[ i ] + lastDigits[ i ];
    };
    return combinedNumbers;
}

