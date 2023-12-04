import { readLines, sumUp } from "../Reuseable/utils.ts";

const lines: string[] = await readLines( 'SampleInput.txt' );

const winNrs: string[][] = [];
const haveNrs: string[][] = [];

const cardTotalPerLine: number [] = Array.from( {length: lines.length}, () => 1 );
let pointTotal: number = 0;

calculateTotals();
console.log( "point total: " + pointTotal );
console.log( "card total: " + sumUp( cardTotalPerLine ) );

function calculateTotals(): void 
{
    for( let lineNr: number = 0; lineNr < lines.length; lineNr++ )
    {
        lines[ lineNr ] = lines[ lineNr ].split( ":" )[ 1 ];
        
        winNrs.push( getHalfOfScratchCard( lineNr, 0 ) );
        haveNrs.push( getHalfOfScratchCard( lineNr, 1 ) );

        let cardMatchCount: number = 0;

        for( let i = 0; i < winNrs[ lineNr ].length; i++ )
        {
            if( haveNrs[ lineNr ].includes( winNrs[ lineNr ][ i ]))
            {
                cardMatchCount++;
            }
        }

        distributeCardCopies( cardMatchCount, lineNr );
        pointTotal += calcCardValueFromMatches( cardMatchCount );
   }
}

function distributeCardCopies( cardMatchCount: number, lineNr: number )
{
    for( let i = 1; i <= cardMatchCount; i++ )
    {
        if( lineNr + i  < lines.length )
        { 
            cardTotalPerLine[ lineNr + i ] += cardTotalPerLine[ lineNr ];
        }
        else
        {
            break;
        }
    }
}

function calcCardValueFromMatches( numberOfMatches: number ): number
{
    return numberOfMatches === 0 ? 0 : Math.pow( 2, numberOfMatches - 1 );
}

function getHalfOfScratchCard( lineNr: number, whichHalf: number ): string[]
{
    return lines[ lineNr ].split( "|" )[ whichHalf ].split(' ').filter( elem => elem !== '' );
}
