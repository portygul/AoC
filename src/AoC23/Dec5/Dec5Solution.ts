import { fishOutNumbers, readLines, sumUp } from "../Reuseable/utils.ts";

const lines: string[] = await readLines( 'SampleInput.txt' );

interface AlmanacEntry {
    destinationType : string,
    table: Map <number, number[]>
}

let almanac: Map<string, AlmanacEntry> = new Map();

fillAlmanac();
//console.log( "result " + convertWithAlmanac( "seed", "location", 14) );

const seedsToPlant: number[] = fishOutNumbers( lines[ 0 ] );

let location = Number.MAX_SAFE_INTEGER;

// seedsToPlant.forEach( seedNr => locations.push(convertWithAlmanac( "seed", "location", seedNr ) ));

for( let i = 0; i < seedsToPlant.length; i = i + 2 )
{
    for( let j = seedsToPlant[ i ]; j < seedsToPlant[ i + 1 ] + seedsToPlant[ i ]; j++)
    {
        const temp = convertWithAlmanac( "seed", "location", j );

       if( temp < location )
       {
            location = temp;
       }
    }
}
console.log( location );

function fillAlmanac()
{
    let startType = "";

    let newAlmanacEntry: AlmanacEntry = 
    {
            destinationType: "",
            table: new Map <number, number[]> ()
    };

    for( let i = 2; i < lines.length; i++ )
    {
        if( lines[ i ].includes( "-to-" ) )
        {
            //seed-to-soil map:
            //get start and destination types from table headline
            const splitTableHeader: string[] = lines[ i ].split( " " )[ 0 ].split( "-to-" );
            startType = splitTableHeader[ 0 ];
            newAlmanacEntry.destinationType = splitTableHeader[ 1 ];
        }
        else if( lines[ i ].length === 0 || i === lines.length-1 )
        {
            //empty line means table is over and new one starts. time to set the page into our almanac and start the next entry.
            almanac.set( startType, structuredClone( newAlmanacEntry ));
            newAlmanacEntry.destinationType = "";
            newAlmanacEntry.table.clear();
        }
        //"default case" AKA a bunch of numbers.
        // destination source range
        else
        {
            const numbersInLine = lines[ i ].split(" ").map( ( elem ) => parseInt( elem ) );
            const key = numbersInLine[ 1 ];
            newAlmanacEntry.table.set( numbersInLine[ 1 ], numbersInLine);
        }
    }
}

function convertWithAlmanac( startType: string, destinationType: string, startNumber: number )
{
    //console.log( startType + " " + startNumber)
    if( startType === destinationType )
    {
        return startNumber;
    }
    const relevantEntry = almanac.get( startType );
    let convertToType = relevantEntry!.destinationType;

    let smallestDiff = Number.MAX_SAFE_INTEGER;
    let relevantKey = Number.MAX_SAFE_INTEGER;

    for ( let key of relevantEntry!.table.keys() )
    { 
        let currDiff = startNumber - key;
        
        if ( currDiff >= 0 && smallestDiff > currDiff )
        {
            smallestDiff = currDiff;
            relevantKey = key;
        } 
    }
    if( relevantKey === Number.MAX_SAFE_INTEGER )
    {
        return convertWithAlmanac( convertToType, destinationType, startNumber );
    }
    // console.log("key " + relevantKey)
    //now we found the relevant line in the table in the almanac entry. so. time to check if we are in the range!
    const relevantEntryLine = relevantEntry!.table.get( relevantKey );

    if( relevantEntryLine![ 2 ] >= smallestDiff )
    {
        return convertWithAlmanac( convertToType, destinationType, startNumber + ( relevantEntryLine![ 0 ] - relevantEntryLine![ 1 ] ) );
    }
    return convertWithAlmanac( convertToType, destinationType, startNumber );
}