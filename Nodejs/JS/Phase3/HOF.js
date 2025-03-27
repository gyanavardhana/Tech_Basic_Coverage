// - Higher-Order Functions
// - A higher-order function is a function that takes another function as an argument or returns a function as a result.

// Example 1
function greet(name) {
  return `Hello, ${name}`;
}

function welcome(name) {
  return `Welcome, ${name}`;
}

function greetUser(greet, name) {
  return greet(name);
}

console.log(greetUser(greet, "John")); // Hello, John
console.log(greetUser(welcome, "John")); // Welcome, John


// Example 2
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function calculate(operation, a, b) {
  return operation(a, b);
}

console.log(calculate(add, 1, 2)); // 3
console.log(calculate(subtract, 5, 2)); // 3
