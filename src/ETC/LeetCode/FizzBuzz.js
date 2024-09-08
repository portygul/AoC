function fizzbuzz( nums )
{
    for(let i = 0; i < nums; i ++)
    {
        let retty = "";
        if(i % 3 === 0)
        {
           retty = "fizz";
        }
        if(i % 5 === 0)
        {
            retty += "buzz";
        }
        if(retty === "")
        { 
            retty = i;
        }
        console.log(retty);
    }
}

console.log(duplicate([1, 2, 3, 4, 5])); // [1,2,3,4,5,1,2,3,4,5])

function duplicate(arr)
{
    return [...arr, ...arr];
}

foo(); // Uncaught TypeError: foo is not a function
function foo () {
  console.log('FOOOOO');
};