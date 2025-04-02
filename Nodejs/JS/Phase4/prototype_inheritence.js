// - Prototypes & Inheritance

// 1. Prototypes
// - Each object in JavaScript has a prototype

const per = {
    name: 'John'
};

console.log(per.__proto__); // Object {}

// - The prototype of an object is another object
// - The prototype object has its own properties and methods
// - The prototype chain is a series of objects linked together
// - The last object in the chain is `Object.prototype`

console.log(per.__proto__.__proto__); // null


// 2. Inheritance
// - Inheritance is a way to create a new object based on an existing object
// - The new object inherits properties and methods from the existing object

const person = {
    name: 'John',
    greet() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

const john = Object.create(person);
john.name = 'John';
john.greet(); // Hello, my name is John

const jane = Object.create(person);
jane.name = 'Jane';
jane.greet(); // Hello, my name is Jane
