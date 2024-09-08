import { readLines, sumUp } from "../Reuseable/utils.ts";

const cards: string[] = await readLines( 'SampleInput.txt' );

const winNrs: string[][] = [];
const haveNrs: string[][] = [];

const totalPerCard: number [] = Array.from( { length: cards.length }, () => 1 );
let pointTotal: number = 0;

calculateTotals();
console.log( "point total: " + pointTotal );
console.log( "card total: " + sumUp( totalPerCard ) );

function calculateTotals(): void 
{
    for( let cardNr: number = 0; cardNr < cards.length; cardNr++ )
    {
        cards[ cardNr ] = cards[ cardNr ].split( ":" )[ 1 ];
        
        winNrs.push( getHalfOfScratchCard( cardNr, 0 ) );
        haveNrs.push( getHalfOfScratchCard( cardNr, 1 ) );

        let cardMatchCount: number = 0;

        for( let i = 0; i < winNrs[ cardNr ].length; i++ )
        {
            if( haveNrs[ cardNr ].includes( winNrs[ cardNr ][ i ]))
            {
                cardMatchCount++;
            }
        }

        distributeCardCopies( cardMatchCount, cardNr );
        pointTotal += calcCardValueFromMatches( cardMatchCount );
   }
}

function distributeCardCopies( cardMatchCount: number, cardNr: number )
{
    for( let i = 1; i <= cardMatchCount; i++ )
    {
        if( cardNr + i  < cards.length )
        { 
            totalPerCard[ cardNr + i ] += totalPerCard[ cardNr ];
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

function getHalfOfScratchCard( cardNr: number, whichHalf: number ): string[]
{
    return cards[ cardNr ].split( "|" )[ whichHalf ].split(' ').filter( elem => elem !== '' );
}
