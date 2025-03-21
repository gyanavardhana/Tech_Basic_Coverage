
// Datatypes in js are of two types:
// 1. Primitive Datatypes
// 2. Reference Datatypes

// Primitive Datatypes:
// 1. String
// 2. Number
// 3. Boolean
// 4. Null
// 5. Undefined
// 6. Symbol
// 7. BigInt

// Reference Datatypes:
// 1. Arrays
// 2. Object Literals
// 3. Functions
// 4. Dates


// Primitive Datatypes:
// 1. String
let name = 'John Doe';
console.log('My name is ' + name);
console.log('Datatype of name is ' + typeof name);


// 2. Number
let age = 30;
console.log('My age is ' + age);
console.log('Datatype of age is ' + typeof age);

// 3. Boolean
let isMarried = false;
console.log('Am I married? ' + isMarried);
console.log('Datatype of isMarried is ' + typeof isMarried);    

// 4. Null
let nullVar = null;
console.log('Value of nullVar is ' + nullVar);
console.log('Datatype of nullVar is ' + typeof nullVar);

// 5. Undefined
let undef = undefined;
console.log('Value of undef is ' + undef);
console.log('Datatype of undef is ' + typeof undef);

// 6. Symbol
const sym = Symbol();
console.log('Value of sym is ' + String(sym));
console.log('Datatype of sym is ' + typeof sym);

// 7. BigInt
const bigInt = 1234567890123456789012345678901234567890n;
console.log('Value of bigInt is ' + bigInt);
console.log('Datatype of bigInt is ' + typeof bigInt);


// Reference Datatypes:
// 1. Arrays
let hobbies = ['coding', 'reading', 'travelling'];
console.log('My hobbies are ' + hobbies);
console.log('Datatype of hobbies is ' + typeof hobbies);


// 2. Object Literals
let address = {
    city: 'Bangalore',
    state: 'Karnataka'
};

console.log('My address is ' + address.city + ', ' + address.state);
console.log('Datatype of address is ' + typeof address);

// 3. Functions
let greet = function() {
    return 'Hello';
};

console.log(greet());
console.log('Datatype of greet is ' + typeof greet);

// 4. Dates
let today = new Date();
console.log('Today is ' + today);
console.log('Datatype of today is ' + typeof today);


