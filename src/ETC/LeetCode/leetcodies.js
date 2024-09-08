/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {

    const mappy = new Map();
    let arr = [];
        nums.forEach((elem, index) => 
        { 
            if(mappy.get(elem) !== undefined)
            {
                arr = [ mappy.get(elem), index ];
            }
            else
            {
                mappy.set( target - elem , index);
            }
        });
        return arr;
    };

//console.log(twoSum([1,2,3], 4));

/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
function mergeAlternately (word1, word2) {

    if( word1.length === 0 )
    {
        return word2;
    }
    if( word2.length === 0 )
    {
        return word1;
    }
    return word1[0] + word2[0] + mergeAlternately( word1.slice(1), word2.slice(1) );
};

/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
var gcdOfStrings = function(str1, str2) {
    //falls anfangsbuchstaben anders sind

    let tempDivvy = "";
    let bestDivvy = "";

    if( str2[0] !== str1[0] )
    {
        return "";
    }

    let stink1 = str1;
    let stink2 = str2;

    while(stink1.length !== 0 || stink2.length !== 0)
    {
        if(stink1[0] === stink2[0])
        {
            tempDivvy += stink1[0];
        }
        const divides1 = str1.split(tempDivvy).join("").length === 0;
        const divides2 = str2.split(tempDivvy).join("").length === 0;

        if(divides1 && divides2)
        {
            bestDivvy = tempDivvy;
        }
        
        stink1 = stink1.slice(1);
        stink2 = stink2.slice(1);
    }
    return bestDivvy;
};

//console.log( gcdOfStrings("ABCABC", "ABCABCABCABC") );

/**
 * @param {number[]} candies
 * @param {number} extraCandies
 * @return {boolean[]}
 */
var kidsWithCandies = function(candies, extraCandies) {
    
    const minForMax = Math.max(...candies) - extraCandies;
    return candies.map((kid) => kid > minForMax);;
};

//console.log(kidsWithCandies([4,2,1,1,2], 1))

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    
    for(let i = 0; i < nums.length; i++)
    {
        while(nums[i] === 0)
        {
            nums = bubbleToEnd(nums, i);
        }
    }
    return nums;

    function bubbleToEnd(nums, index)
    {
        let temp = 0;
        let totrade = index+1;
        while(totrade < nums.length)
        {
            console.log("i: " + totrade);
            while(nums[totrade] === 0)
            {
                totrade++;
            }
            temp = nums[totrade];
            nums[totrade] = 0;
        }
        return nums;
    }
};

console.log(moveZeroes([0,0,0,0,0,0,0,1]));


function ListNode(val, next) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }


    
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
    
    const arr = [];
    let listy = new ListNode();
    let temp = 0;
    let carry = 0;
    let i1 = l1;
    let i2 = l2;

    while( i1.next !== null && i2.next !== null )
    {
        temp = i1.val + i2.val + carry;
        carry = 0;

        if(temp >= 10)
        {
            carry = 1;
            temp = temp % 10;
        }
        arr.push(temp);

        i1 = i1.next;
        i2 = i2.next;
        temp = 0;
    } 

    if( i1.next === null )
    {
        while(i2.next !== null)
        { 
            arr.push(i2.next.val);
            i2 = i2.next;
        }
    }
    else
    {
        while (i1.next !== null)
        {
            arr.push(i1.next.val);
            i1 = i1.next;
        }
    }

    arr.forEach(  )

    return listy;

};