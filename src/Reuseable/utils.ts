import { createReadStream } from "fs";
import { createInterface } from "readline";

/**
 * Reads input from file line by line into a string[] and returns it.
 * @param pathToFile 
 */
export async function readLines( pathToFile: string ) : Promise<string[]>
{
    const lines: string[] = [];
    const lineReader = createInterface( {
        input: createReadStream( pathToFile )
    } );

    for await ( const line of lineReader ) {
        lines.push( line );
      }
        
    lineReader.on( 'close', () => {
        console.log( lines.length );
    });
    return lines;
}

/**
 * Wrapper for Array.reduce(). Takes number[], sums elements, and returns sum.
 * 
 * @param toSumUp number[] to get summed up
 */
export function sumUp( toSumUp: number[] ): number
{
    return toSumUp.reduce( ( accumulator, value ) => accumulator + value, 0 );
}

/**
 * Wrapper for Array.reduce(). Takes number[], multiplies elements, and returns product.
 * 
 * @param toSumUp number[] to get summed up
 */
export function multUp( toMultUp: number[] ): number
{
    return toMultUp.reduce( ( accumulator, value ) => accumulator * value, 1 );
}

/**
 * Expects a line of input, splits it at ':', takes the right side of it, and turns that into a number[];
 * @param inputLine 
 */
export function fishOutNumbers( inputLine: string ): number[]
{
    return inputLine.split( ":" )[ 1 ].split( ' ' ).filter( elem => elem != '' ).map( ( elem ) => parseInt( elem ) );
}