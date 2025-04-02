// Pure Functions
// A pure function is a function that, given the same input, will always return the same output and does not have any observable side effect.

// Example 1
function sum(a, b) {
  return a + b;
}

console.log(sum(1, 2)); // 3

// Example 2
function greet(name) {
  return `Hello, ${name}`;
}


console.log(greet('John')); // Hello, John

// Example 3
function isEven(num) {
  return num % 2 === 0;
}

console.log(isEven(2)); // true

