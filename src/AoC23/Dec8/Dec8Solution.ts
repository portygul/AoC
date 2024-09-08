import { Tuple } from "../Reuseable/types.ts";
import { readLines } from "../Reuseable/utils.ts";

const lines: string[] = await readLines( 'SampleInput.txt' );
const nodeMap: Map <string, Tuple <string, string>> = new Map();
const threeLettersRegex: RegExp = /[A-Za-z]+/g; 
let counter : number = 0;
const instructino : string = lines[ 0 ];

for( let i = 2; i < lines.length; i++ )
{
    fillMap( lines[ i ] );
}

console.log(countStepsToZZZ());

function fillMap( inputLine: string )
{
   const chunks = [ ...inputLine.matchAll( threeLettersRegex ) ];
   nodeMap.set( chunks[ 0 ][ 0 ], { L: chunks[ 1 ][ 0 ] , R: chunks[ 2 ][ 0 ]})
//    console.log( nodeMap )
}

function countStepsToZZZ(): number
{
    let currPos : string = lines[ 2 ].substring(0,3);


    for( let i = 0; i < instructino.length * 10000000; i++ )+
    {
        currPos = ""+resolveNext( currPos );
        counter++;

        if( currPos === "ZZZ" ) break;
    }   
    return counter;
}
