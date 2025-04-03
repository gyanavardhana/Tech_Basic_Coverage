
// - Arrays (`number[]`, `string[]`, `Array<T>`)

let numbers: number[] = [1, 2, 3, 4, 5]; // Array of numbers

numbers.push(6); // Adding a number to the array
// numbers.push("string"); // Error: Argument of type 'string' is not assignable to parameter of type 'number'.

let strings: string[] = ['a', 'b', 'c', 'd', 'e']; // Array of strings

strings.push('f'); // Adding a string to the array
// strings.push(1); // Error: Argument of type 'number' is not assignable to parameter of type 'string'.


let booleans: boolean[] = [true, false, true, false]; // Array of booleans

booleans.push(true); // Adding a boolean to the array
// booleans.push('string'); // Error: Argument of type 'string' is not assignable to parameter of type 'boolean'.


let mixed: (number | string)[] = [1, 'a', 2, 'b', 3, 'c']; // Array of mixed types (number and string)
mixed.push(4); // Adding a number to the array
mixed.push('d'); // Adding a string to the array
// mixed.push(true); // Error: Argument of type 'boolean' is not assignable to parameter of type 'string | number'.


let arrayOfArrays: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]; // Array of arrays (2D array)
let arrayOfObjects: { name: string; age: number }[] = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
]; // Array of objects with properties
let arrayOfTuples: [string, number][] = [
  ['Alice', 25],
  ['Bob', 30],
  ['Charlie', 35],
]; // Array of tuples (string and number)

let arrayOfAny: any[] = [1, 'a', true, { name: 'Alice' }, [1, 2, 3]]; // Array of any type

// Array<T> is a generic type that can be used to create arrays of any type
let arrayOfGeneric: Array<number> = [1, 2, 3, 4, 5]; // Array of numbers using generic type
let arrayOfGenericString: Array<string> = ['a', 'b', 'c', 'd', 'e']; // Array of strings using generic type
let arrayOfGenericBoolean: Array<boolean> = [true, false, true, false]; // Array of booleans using generic type
let arrayOfGenericMixed: Array<number | string> = [1, 'a', 2, 'b', 3, 'c']; // Array of mixed types (number and string) using generic type
let arrayOfGenericAny: Array<any> = [1, 'a', true, { name: 'Alice' }, [1, 2, 3]]; // Array of any type using generic type

type Person = {
  name: string;
  age: number;
};
let arrayOfGenericObjects: Array<Person> = [
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 30 },
  { name: 'Charlie', age: 35 },
]; // Array of objects with properties using generic type 

arrayOfGenericObjects.push({ name: 'David', age: 40 }); // Adding an object to the array
// arrayOfGenericObjects.push({ name: 'Eve', age: '30' }); // Error: Argument of type '{ name: string; age: string; }' is not assignable to parameter of type 'Person'.