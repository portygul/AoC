import { numberRegex, wordRegex } from "../../Reuseable/types.ts";
import { readLines } from "../../Reuseable/utils.ts";

const inputLines: string[] = await readLines( 'InputPath.txt' );
export interface BallGameMinSpecs {
    id: number,
    red: number,
    blue: number,
    green: number
};

answerTheElf( inputLines, 12, 13, 14 );

function answerTheElf( lines: string[], red: number, green: number, blue: number ): void
{
    let validGameIdsSum: number = 0;
    let gameSetsPowerSum: number = 0;

    lines.forEach( line => {

        const minRoundSpecs : BallGameMinSpecs = { id: 0, red: 0, blue: 0, green: 0 };
        minRoundSpecs.id = parseInt( ""+line.match( /[0-9]+/ ) );
        
        const ballCountRegex = /[0-9]+ [a-z]+/g;
        const ballCounts: string[] = line.match( ballCountRegex ) as string[];

        ballCounts.forEach( ( ballCount: any ) => {

            const count : number = parseInt( ballCount.match( numberRegex ));
            const color : keyof typeof minRoundSpecs = ballCount.match( wordRegex );

            if( minRoundSpecs[ color ] < count ) 
            { 
                minRoundSpecs[ color ] = count; 
            }
        });
        
        if( !( minRoundSpecs.red > red  || minRoundSpecs.green > green || minRoundSpecs.blue > blue ))
        {
            validGameIdsSum += minRoundSpecs.id;
        }
        gameSetsPowerSum += minRoundSpecs.red * minRoundSpecs.green * minRoundSpecs.blue;
    });
    
    console.log( "first Q answer: " + validGameIdsSum + "; second Q answer: " + gameSetsPowerSum );
}
