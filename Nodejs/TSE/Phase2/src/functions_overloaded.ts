// - Function overloads in ts

// - Function overloads allow you to define multiple signatures for a function.

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number | string, b: number | string): number | string {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    } else if (typeof a === 'string' && typeof b === 'string') {
        return a + b;
    }
    throw new Error('Invalid arguments');
}

// Usage
const sum1 = add(1, 2); // 3
console.log(sum1)
const sum2 = add('Hello, ', 'World!'); // "Hello, World!"
console.log(sum2)
//const sum3 = add(1, '2'); // Error: Invalid arguments
// const sum4 = add('1', 2); // Error: Invalid arguments