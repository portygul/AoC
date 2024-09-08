
import { readLines } from "../Reuseable/utils.ts";

const lines : string[] = await readLines( "./SampleInput.txt" );

let pathSum = 0;

interface Point
{
    x: number,
    y: number
}

let galaxies : Point[] = [];

expandGalaxies();
findGalaxyCoordinates();

// console.log(galaxies)

calculateShortestDistancesBetweenGalaxies();
console.log(pathSum)


function expandGalaxies()
{
    
    //expand rows
    for( let i = 0; i < lines.length; i++ )
    {
        //no galaxies so dupe line
        if( !lines[ i ].includes( '#' ) )
        {
            lines.splice( i, 0, lines[ i ] );
            i++;
        }
    }

    for( let x = 0; x < lines[ 0 ].length; x++ )
    { 
        let galaxyFound = false;
        //check columns
        for( let y = 0; y < lines.length; y++  )
        {
            // console.log( "x: " + x + " y: " + y );
            if( lines[ y ].charAt( x ) === '#' )
            {
                galaxyFound = true;
            }
        }

        if( !galaxyFound )
        {
            doubleDotColumn( x );
            x++;
        }
    }
}

function doubleDotColumn(x : number )
{
    for( let y = 0; y < lines.length; y++  )
    {
       // lines[ y ] += x;
        let temp = lines[y].split('');
        temp.splice(x, 0, '.');
        const strong = temp.join('');
        // console.log(strong);
        lines[ y ] = lines[ y ].substring( 0, x ) + "." + lines[ y ].substring( x );
        //lines[ y ] = lines[ y ].split('').splice( x, 0, '.' ).join();
    }
}

function findGalaxyCoordinates()
{
    for( let i = 0; i < lines.length; i++ )
    {
        //no galaxies so were outta here
        if( !lines[ i ].includes( '#' ) )
        {
          continue;
        }
        const matches = [ ...lines[i].matchAll( /#/g ) ];
        // console.log(matches)
        matches.forEach( match => {
            if(match.index !== undefined)
            { 
                galaxies.push( { "x": match.index, "y": i } );
            }
        });
    }
}

function calculateShortestDistancesBetweenGalaxies()
{
    while( galaxies.length !== 0 )
    {
        // console.log("PING")
        const currGalaxy = galaxies.pop();
        galaxies.forEach( galaxy => {
            pathSum += Math.abs( currGalaxy!.x - galaxy.x ) + Math.abs( currGalaxy!.y - galaxy.y )
        });
    }
}