
function doubleNumbers(arr) {
  return arr.map(num => num * 2);
}

console.log(doubleNumbers([1, 2, 3]));


function applyFunction(arr, fn) {
  return arr.map(fn);
}

function double(num) {
  return num * 2;
}

console.log(applyFunction([1, 2, 3], double)); 

function counter() {
  let count = 0;
  return function() {
    count++;
    return count;
  }
}

const increment = counter();
console.log(increment()); 


function factorial(num) {
  if (num === 1) return 1;
  return num * factorial(num - 1);
}

console.log(factorial(5));



