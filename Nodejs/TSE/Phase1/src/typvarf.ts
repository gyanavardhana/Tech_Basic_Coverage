// typing variable as functions

// - typing variable as functions
// difference between this and normal function is that this is a variable that holds a function
// and not a function declaration
const add: (a: number, b: number) => number = (a, b) => {
    return a + b;
}
console.log(add(2, 3)); // Output: 5

// - typing variable as functions with optional parameters
const greet: (name: string, age?: number) => string = (name, age) => {
    if (age) {
        return `Hello, my name is ${name} and I am ${age} years old.`;
    } else {
        return `Hello, my name is ${name}.`;
    }
}
console.log(greet("Alice")); // Output: Hello, my name is Alice.
console.log(greet("Bob", 25)); // Output: Hello, my name is Bob and I am 25 years old.


// - typing variable as functions with default parameters
const multiply: (a: number, b?: number) => number = (a, b = 1) => {
    return a * b;
}
console.log(multiply(5)); // Output: 5
// - typing variable as functions with rest parameters
const sum: (...numbers: number[]) => number = (...numbers) => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4, 5)); // Output: 15

