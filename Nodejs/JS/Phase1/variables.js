// var, let, const are the keywords used for declaring variables in JavaScript.

// var: The var keyword is used to declare variables in JavaScript. 
// The scope of a variable declared using var is its current execution context, 
// which is either the function that the variable is declared in or, for variables declared outside any function, global. I
// f you re-declare a JavaScript variable, it will not lose its value.

var name = "John";
console.log(name); // John
var name = "Gyana"
console.log(name)
name = "Vardhan"
console.log(name)

// let: The let keyword is used to declare variables in JavaScript.
// The scope of a variable declared using let is its current code block,
// which is any block of code within curly braces {}.
// If you re-declare a variable using let, it will not lose its value.
// If you re-declare a variable using let in the same scope, it will result in an error.

let name1 = "John";
console.log(name1); // John
//let name = "Gyana" // SyntaxError: Identifier 'name' has already been declared
console.log(name1)
name1 = "Vardhan"
console.log(name1)

// const: The const keyword is used to declare variables in JavaScript.
// The scope of a variable declared using const is its current code block,
// which is any block of code within curly braces {}.
// If you re-declare a variable using const, it will result in an error.
// A variable declared using const must be assigned a value when it is declared.

const name2 = "John";
console.log(name2); // John
//const name = "Gyana" // SyntaxError: Identifier 'name' has already been declared
console.log(name2)
//name = "Vardhan" // TypeError: Assignment to constant variable.
console.log(name2)