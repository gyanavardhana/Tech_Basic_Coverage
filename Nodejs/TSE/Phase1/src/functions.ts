// - Defining functions (parameter and return types)
// - `void` type and optional parameters


// - defining function with typescript

const add = (a: number, b: number): number => {    return a + b; }
console.log(add(2, 3)); // Output: 5

// - defining function with optional parameters
const greet = (name: string, age?: number): string => {
    if (age) {
        return `Hello, my name is ${name} and I am ${age} years old.`;
    } else {
        return `Hello, my name is ${name}.`;
    }
}
console.log(greet("Alice")); // Output: Hello, my name is Alice.
console.log(greet("Bob", 25));

// - defining function with default parameters
const multiply = (a: number, b: number = 1): number => {
    return a * b;
}
console.log(multiply(5)); // Output: 5

// - defining function with rest parameters
const sum = (...numbers: number[]): number => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // Output: 15


// - defining function with `void` return type
const logMessage = (message: string): void => {
    console.log(message);
}
logMessage("This is a log message."); // Output: This is a log message.

// - defining function with never return type
// The `never` type is used to indicate that a function will never return a value.  
const throwError = (message: string): never => {
    throw new Error(message);
}
try {
    throwError("This is an error message.");
}
catch (error) {
    console.error(error); // Output: Error: This is an error message.
}