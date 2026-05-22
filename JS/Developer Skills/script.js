'use strict'
// 1. the data: a list of user records in a dashboard
/*const userDatabase = [
    { name: 'Tony Stephen', taxStatus: 'Compliant'},
    { name: 'Sarah Connor', taxStatus: 'Pending'},
    { name: 'John Doe', taxStatus: 'Compliant'},
]

// 2. the logic: a function to filter users by their tax status
function filterUsers(statusType) {
    //the .filter() method creates a new array with only the matching items
    const filteredResults = userDatabase.filter(function(user) {
        return user.taxStatus === statusType;
    });
    
    console.log(`Search Results for "${statusType}:`);
    console.log(filteredResults);
}

// 3. Execution: Run the search to use the filtered list
filterUsers('Pending'); // This will log users with 'Pending' tax status*/


// Broken Code
/*const scores = [10, 20, 30];
let totalScore = 0;

// the bug is here: i <= scores.length
for (let i = 0; i <= scores.length; i++) {
    totalScore = totalScore + scores[i];        
}

//this prints NAN instead of 60 because the loop is trying to access an index that doesn't exist (scores[3])
console.log(totalScore);*/

//Fixed Code
const scores = [10, 20, 30];
let totalScore = 0;

// the fix: we change <= to < so it stops exactly at the last item
for (let i = 0; i < scores.length; i++) {
    console.log(`Current item is ${scores[i]}`);
    totalScore = totalScore + scores[i];        
}

console.log(`Final Score: ${totalScore}`);