//strict mode is a way to opt in to a restricted variant of JavaScript, which can help catch common coding mistakes and "unsafe" actions. It can be enabled by adding the following line at the beginning of a script or a function:

"use strict";

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive");


//functions is a block of code designed to perform a particular task. It is executed when "something" invokes it (calls it).

function logger() {
    console.log("My name is Tony");
}

//calling / running / invoking function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
}


//function declaration
const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

function calcAge1(birthYear) {
    return 2037 - birthYear;
}

const age1 = calcAge1(1991);
console.log(age1);

//function expression
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}

const age2 = calcAge2(1991);
console.log(age1, age2);

//arrow function
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement} years.`;
}

console.log(yearsUntilRetirement(1991, "Tony"));
console.log(yearsUntilRetirement(1980, "Bob"));

//Arrays are a special type of objects used to store collections of data. They are ordered, meaning that the items in an array have a specific order and can be accessed by their index.

const friends = ["Michael", "Steven", "Peter"];
console.log(friends);

const years = new Array(1991, 1984, 2008, 2020);
console.log(years);

console.log(friends[0]);
console.log(friends[2]);

console.log(friends.length);
console.log(friends[friends.length - 1]);

friends[2] = "Jay";
console.log(friends);

const firstName = "Tony";

const tonyArray = [firstName, "Stark", 2037 - 1991, "engineer", friends];
console.log(tonyArray);
console.log(tonyArray.length);

//Add elements
friends.push("Jay");
console.log(friends);
friends.unshift("John");
console.log(friends);

//Remove elements
friends.pop();
console.log(friends);
friends.shift();
console.log(friends);

console.log(friends.indexOf("Steven"));
console.log(friends.indexOf("Bob"));

console.log(friends.includes("Steven"));
console.log(friends.includes("Bob"));


//objects are a data structure that allows you to store collections of data in key-value pairs. They are used to represent real-world entities and their properties.

/*const tony = {
    firstName: "Tony",
    lastName: "Stark",
    age: 2037 - 1991,
    job: "engineer",
    friends: ["Michael", "Steven", "Peter"]
};

console.log(tony);

console.log(tony.firstName);
console.log(tony["lastName"]);

const nameKey = "Name";
console.log(tony["first" + nameKey]);
console.log(tony["last" + nameKey]);

const interestedIn = prompt("What do you want to know about Tony? Choose between firstName, lastName, age, job, and friends");
console.log(tony[interestedIn]);

if (tony[interestedIn]) {
    console.log(tony[interestedIn]);
} else {
    console.log("Wrong request! choose between firstName, lastName, age, job, and friends");
}

tony.location = "North Charleston";
tony["twitter"] = "@tonysteppex";
console.log(tony);*/

//Object methods are functions that are stored as properties of an object. They allow you to perform actions on the object and its properties.

/*const tony = {
    firstName: "Tony",
    lastName: "Stark",
    birthYear: 1991,
    job: "engineer",
    friends: ["Michael", "Steven", "Peter"],
    hasDriversLicense: true,

    calcAge: function () {
        console.log(this);
        return 2037 - this.birthYear;
    }
};

console.log(tony.calcAge());*/

//loop is a programming construct that allows you to repeat a block of code multiple times. It is used to perform repetitive tasks and iterate over collections of data.
//for loop keeps running while a certain condition is TRUE.
for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

//looping arrays, breaking and continuing is a common task in programming. It allows you to iterate over the elements of an array and perform certain actions based on specific conditions. The "break" statement is used to exit a loop prematurely, while the "continue" statement is used to skip the current iteration and move on to the next one.

const tony = [
    "Tony",
    "Stark",
    2037 - 1991,
    "engineer",
    ["Michael", "Steven", "Peter"]
];
const types = [];

for (let i = 0; i < tony.length; i++) {
    //Reading from tony array
    console.log(tony[i], typeof tony[i]);

    //filling types array
    types.push(typeof tony[i]);
}

console.log(types);

const yearss = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < yearss.length; i++) {
    ages.push(2037 - yearss[i]);
}
console.log(ages);

//continue and break is used to control the flow of a loop. The "continue" statement is used to skip the current iteration and move on to the next one, while the "break" statement is used to exit a loop prematurely.

console.log("--- ONLY STRINGS ---");
for (let i = 0; i < tony.length; i++) {
    if (typeof tony[i] !== "string") continue;
    console.log(tony[i], typeof tony[i]);
}

//looping backwards and loops in loops is a common task in programming. It allows you to iterate over the elements of an array in reverse order and perform certain actions based on specific conditions. The "break" statement is used to exit a loop prematurely, while the "continue" statement is used to skip the current iteration and move on to the next one.

//looping backwards
for (let i = tony.length - 1; i >= 0; i--) {
    console.log(i, tony[i]);
}

//loops in loops
for (let exercise = 1; exercise <= 3; exercise++) {
    console.log(`--- Starting exercise ${exercise} ---`);
    for (let rep = 1; rep <= 5; rep++) {
        console.log(`Exercise ${exercise}: Lifting weights repetition ${rep} 🏋️‍♀️`);
    }
}

//while loop is a programming construct that allows you to repeat a block of code while a certain condition is true. It is used to perform repetitive tasks and iterate over collections of data.

let rep = 1;
while (rep <= 10) {
    console.log(`WHILE: Lifting weights repetition ${rep} 🏋️‍♀️`);
    rep++;
}
