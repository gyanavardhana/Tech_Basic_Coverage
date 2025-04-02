// - Closures
// - Currying



// Closures
// CLOSURE is a function that has access to the outer function's variables
// A closure is created when an inner function is returned from an outer function
// The inner function has access to the outer function's variables even after the outer function has returned


// Example 1
function outer() {
  const name = 'John';

  function inner() {
    console.log(name);
  }

  return inner;
}   

const innerFn = outer();
innerFn(); // John

// Currying
// Currying is a technique of evaluating a function with multiple arguments into a sequence of functions with a single argument
// Currying is a way of constructing functions that allows partial application of a function's arguments
// Currying is a way to create a higher-order function

// Example 2
function add(a) {
  return function(b) {
    return a + b;
  }
}

const add5 = add(5);
console.log(add5(2)); // 7
console.log(add(5)(2)); // 7


