import { numberRegex } from "../Reuseable/types.ts";
import { readLines } from "../Reuseable/utils.ts";

const sampleLines: string[] = await readLines( 'SampleInput.txt' );
const charTrackerMatrix: number[][] = [];

let partNumbersSum: number = 0;
let gearRatioSum: number = 0;
const notNumberNotDotRegEx: RegExp = /[^0-9.]/;

fillSpecialCharMatrix( sampleLines );
calculateForElves( sampleLines );

function calculateForElves( lines: string[] ): void
{
    for( let i = 0; i < lines.length; i++ )
    {  
        for( let match of lines[ i ].matchAll( numberRegex ) ) 
        {
            goFish( match, i );
        }
    }
    console.log( "1) part numbers: " + partNumbersSum + " // 2) gear ratios: " + gearRatioSum );
}

function goFish( match: RegExpMatchArray, row: number ): void
{
    const currNumber = parseInt( match [ 0 ] );

    let amITouchingASymbol : boolean = false;

    const startIndex = match.index !== undefined && ( match.index > 0 ) ? match.index - 1 : 0; 
    const endIndex = match.index !== undefined && ( match.index < charTrackerMatrix[ row ].length ) ? match.index + match[ 0 ].length : 0;

    if( charTrackerMatrix[ row ][ startIndex ] || charTrackerMatrix[ row ][ endIndex ] )
    {
        gearCheck( row, startIndex, currNumber );
        gearCheck( row, endIndex, currNumber );
        
        amITouchingASymbol = true;
    }
    for( let i = startIndex; i <= endIndex; i++ )
    {
        const prevRow = row > 0 ? row - 1 : row;
        const nextRow = row + 1 < charTrackerMatrix.length ? row + 1 : row;

        if( charTrackerMatrix[ prevRow ][ i ] || charTrackerMatrix[ nextRow ][ i ] )
        { 
            gearCheck( prevRow, i , currNumber );
            gearCheck( nextRow, i , currNumber );

            amITouchingASymbol = true;
        }
    }
    partNumbersSum += amITouchingASymbol ? currNumber : 0;
}

function gearCheck( row : number, index: number, currNumber: number ): void
{
    const currValue = charTrackerMatrix[ row ][ index ];

    if( currValue> 0 )
    {
        if( currValue > 1 ) 
        {
            gearRatioSum += currValue * currNumber;
        }
        charTrackerMatrix[ row ][ index ] = currNumber;
    }
}

function fillSpecialCharMatrix(lines: string[]): void 
{
    for( let i = 0; i < lines.length; i++ )
    {  
        charTrackerMatrix[ i ] = [ ...lines[ i ] ].map(( char ) => {
            if( notNumberNotDotRegEx.test( char ) )
            {
                return char === '*' ? 1 : -1;
            }
            return 0;
        });
    }
}