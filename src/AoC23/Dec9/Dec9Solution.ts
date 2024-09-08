import { readLines } from "../Reuseable/utils.ts";

const lines: string[] = await readLines( 'SampleInput.txt' );

let result: number = 0;
lines.forEach(line =>
    {
        let arr: number[][] = new Array();
        for ( let i = 0; i < line.split(' ').length; i++ ) 
        {
            arr[ i ] = []; 
        }
        arr[ 0 ] = ( line.split(' ').map( elem => parseInt( elem ) ) ).reverse();
        resolveArr( arr, 0 );
        arr = arr.filter( elem => elem.length > 0 );

        result += getNextNumberForCrazyArr( arr );

        console.log( result );
    });

function resolveArr(toResolve: number[][], startLine: number): void
{
    console.log( toResolve )
    for( let i = 0; i < toResolve[ startLine ].length - 1; i++ )
    {
        toResolve[ startLine + 1 ][ i ] = toResolve[ startLine ][ i + 1 ] - toResolve[ startLine ][ i ];
    }
    if( toResolve[ startLine + 1 ].every( elem => elem === 0 ))
    {
        return;
    }
    else 
    {
        return resolveArr( toResolve, startLine + 1 );
    }
}

function getNextNumberForCrazyArr(arr: number[][]): number
{ 
    let sum = 0;
    for( let i = 0; i < arr.length; i++ )
    {   
        sum += arr[i][arr[i].length-1];
    }
    return sum;
}