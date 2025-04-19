// - Type guards (`typeof`, `instanceof`, `in`)

type Person = {
  name: string;
  age: number;
};

type Employee = {
  name: string;
  age: number;
  position: string;
};

// typeof

function isPerson(obj: any): obj is Person {
  return typeof obj.name === "string" && typeof obj.age === "number";
}

// instanceof
// this doesn't work with interfaces, only with classes
/*
function isEmployee(obj: any): obj is Employee {
    return obj instanceof Employee;
}
    */

// in
function isEmployeeProperty(obj: any): obj is Employee {
  return "position" in obj;
}

// Example usage
const person: Person = { name: "Alice", age: 30 };
const employee: Employee = { name: "Bob", age: 25, position: "Developer" };
console.log(isPerson(person)); // true

console.log(isEmployeeProperty(employee)); // true
console.log(isEmployeeProperty(person)); // false
