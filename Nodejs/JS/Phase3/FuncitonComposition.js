// - Function Composition
// - Function Composition is the process of combining two or more functions to produce a new function.
// - Function Composition is a mathematical concept that is used in computer science
// - Function Composition is a way to combine functions to create a new function
function compose(...funcs) {
    return function (arg) {
      return funcs.reduceRight((acc, fn) => fn(acc), arg);
    };
  }
  
// Example 1
function greet(name) {
  return `Hello, ${name}`;
}

function uppercase(str) {
  return str.toUpperCase();
}

const greetUppercase = compose(greet, uppercase);
console.log(greetUppercase('John')); // HELLO, JOHN
