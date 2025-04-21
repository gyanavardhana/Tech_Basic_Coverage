// - `Record<K, T>`
// Record is a utility type in TypeScript that represents an object type with specific keys and values.

type Person = Record<string, string | number>;
type Employee = Record<"name" | "age", string | number>;

const person: Person = {
  name: "John Doe",
  age: 30,
  occupation: "Developer"
};

const employee: Employee = {
  name: "Alice",
  age: 25
};

console.log(person); // { name: 'John Doe', age: 30, occupation: 'Developer' }
console.log(employee); // { name: 'Alice', age: 25 }