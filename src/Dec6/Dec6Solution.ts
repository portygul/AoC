import { Tuple } from "../Reuseable/types.ts";
import { fishOutNumbers, multUp, readLines, sumUp } from "../Reuseable/utils.ts";

const lines: string[] = await readLines( 'SampleInput.txt' );

console.log( "multiple races : " + aggregateResults( getDataForMultipleRaces ) );
console.log( "just one race  : " + aggregateResults( getDataForOneRace ) );

function aggregateResults( funcToUse: Function )
{
    let result : number[] = [];
    let gamesData: number[][] = funcToUse( lines );
    for( let i = 0; i < gamesData[ 0 ].length; i++ )
    {
        result.push( calculateHowManyWaysToWin( gamesData[ 0 ][ i ], gamesData[ 1 ][ i ] ));
    }
   return funcToUse.name === "getDataForMultipleRaces" ? multUp( result ) : sumUp( result );
}

function calculateHowManyWaysToWin( duration: number, record: number ): number 
{
    let waysToWin = 0;
    for( let i = 1; i < duration; i++ )
    {
       if(( duration - i ) * i > record )
       {
            waysToWin++;
       }
       else if ( waysToWin > 0 )
       {
            return waysToWin;
       } 
    }
   return waysToWin;
}

function getDataForMultipleRaces( input : string[] ) : number[][]
{
    let racesData: number[][] = [];
    racesData[ 0 ] = fishOutNumbers( lines[ 0 ] );
    racesData[ 1 ] = fishOutNumbers( lines[ 1 ] );
    return racesData;
}

function getDataForOneRace( input : string[] ): number[][]
{
    let raceData: number[][] = getDataForMultipleRaces( input );
    raceData[ 0 ] = [ parseInt( raceData[ 0 ].join( "" ) ) ];
    raceData[ 1 ] = [ parseInt( raceData[ 1 ].join( "" ) ) ];

    return raceData;
}