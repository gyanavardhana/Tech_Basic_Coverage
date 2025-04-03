
let a: number = 10;
let str: string = "hello"
let flag: boolean = true

console.log(a)
console.log(str)
console.log(flag)
/*
a = "hello"; // Error: Type 'string' is not assignable to type 'number'
a = true; // Error: Type 'boolean' is not assignable to type 'number'
a = null; // Error: Type 'null' is not assignable to type 'number'
a = undefined; // Error: Type 'undefined' is not assignable to type 'number'
*/

a = 20; // OK

// auto assign
let b = 10; // Type 'number' is inferred
console.log(b)
// b = "hello"; // Error: Type 'string' is not assignable to type 'number'

// here we dont know what will be the value, so we assign string type, and it can be only a string
let st: string
st = "hello"
console.log(st)
// diff between let and const in typescript
// let is mutable, const is immutable
let c = 10; // Type 'number' is inferred
c = 20; // OK
const d = 10; // Type 'number' is inferred
console.log(d); // OK
console.log(c)


// undefined and null
let e: undefined = undefined; // OK
let f: null = null; // OK
//let g: null = undefined; // Error: Type 'undefined' is not assignable to type 'null'
//let h: undefined = null; // Error: Type 'null' is not assignable to type 'undefined'
let i: null | undefined = null; // OK
let j: null | undefined = undefined; // OK

console.log(e)
console.log(f)
console.log(i)
console.log(j)
