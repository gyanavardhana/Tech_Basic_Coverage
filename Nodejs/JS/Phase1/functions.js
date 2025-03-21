// Functions in JS:


// using function keyword
function greet(name){
    console.log('Hello ' + name);
}

greet('John');

// using function expression
let greet2 = function(name){
    console.log('Hello ' + name);
}

greet2('Jane');

// using arrow function

let greet3 = (name) => {
    console.log('Hello ' + name);
}

greet3('Doe');

// using arrow function with single parameter
let greet4 = name => {
    console.log('Hello ' + name);
}

greet4('Smith');

// using arrow function with no parameter
let greet5 = () => {
    console.log('Hello');
}


greet5();

// using arrow function with multiple parameters
let greet6 = (name, age) => {
    console.log('Hello ' + name + ', You are ' + age + ' years old');
}

greet6('John', 30);

// using arrow function with return statement
let greet7 = (name) => {
    return 'Hello ' + name;
}   

console.log(greet7('Doe'));

// using arrow function with return statement and single line
let greet8 = (name) => 'Hello ' + name;

console.log(greet8('Smith'));

// using arrow function with return statement and single line and single parameter
let greet9 = name => 'Hello ' + name;

console.log(greet9('Jane'));

// rest and spread operators in functions
// difference between rest and spread operators is that rest operator is used in function definition and spread operator is used in function call
// rest operator

function sum(...args){
    let total = 0;
    for(let num of args){
        total += num;
    }
    return total;
}

console.log(sum(1, 2, 3, 4, 5));

// spread operator
let arr = [1, 2, 3, 4, 5];
console.log(sum(...arr));
