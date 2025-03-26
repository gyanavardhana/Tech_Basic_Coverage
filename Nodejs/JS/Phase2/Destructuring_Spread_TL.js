// - Destructuring (Array, Object)
// - Spread and Rest operators (`...`)
// - Template Literals


// Destructuring
// Array

let arr = [1, 2, 3, 4, 5];
let [a, b, c, d, e] = arr;
console.log(a, b, c, d, e);

// Object
let obj = {
    name: 'John Doe',
    age: 32,
    city: 'New York'
};

let {name, age, city} = obj;
console.log(name, age, city);

// Spread and Rest operators (`...`)

// Spread
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let arr3 = [...arr1, ...arr2];
console.log(arr3 );


let obj1 = {
    name: 'John Doe',
    age: 32
};

let obj2 = {
    city: 'New York'
};

let obj3 = {...obj1, ...obj2};
console.log(obj3);

// Rest
let [f, g, ...rest] = arr;
console.log(f, g, rest);

let {name1, ...rest1} = obj;
console.log(name1, rest1);

// diff between spread and rest
// spread is used to split up array elements or object properties
// rest is used to merge a list of function arguments into an array

// spread and rest in function arguments
function sum(...args) {
    return args.reduce((acc, num) => acc + num, 0);
}

console.log(sum(1, 2, 3, 4, 5));


// Template Literals
let message = 'hello world';
console.log(`the message is ${message}`);
