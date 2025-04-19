// - Union and Intersection types


// union
type Person = {
    name: string;
    age: number;
};

type Employee = {
    id: number;
    position: string;
};

// here employee is a union type of Person and Employee
type EmployeeDetails = Person | Employee;

const employee: EmployeeDetails = {
    name: "John Doe",
    age: 30,
};

const employee2: EmployeeDetails = {
    id: 123,
    position: "Software Engineer",
};

const employee3: EmployeeDetails = {
    name: "Jane Doe",       
    age: 25,
    id: 456,
    position: "Project Manager",
};
type UnionType = string | number | boolean;
function processValue(value: UnionType) {
    if (typeof value === "string") {
        console.log("String value:", value);
    } else if (typeof value === "number") {
        console.log("Number value:", value);
    } else if (typeof value === "boolean") {
        console.log("Boolean value:", value);
    }
}
processValue("Hello");
processValue(42);   
processValue(true);



type Todo = {
    title: string;
    status: "completed" | "pending";
};

let todo: Todo = {
    title: "Learn TypeScript",
    status: "completed"
};

// intersection
// intersection types are used to combine multiple types into one
type intersectionType = Person & { "Gender": "Male" | "Female"}

// here person1 is of type intersectionType which combines both person and {"Gender": "Male" | "Female"}
let person1: intersectionType = {
    name: "John",
    age: 25,
    Gender: "Male"
}

// extending with interface syntax
// smae thing with interface
interface intersectionType1 extends Person { "Gender": "Male" | "Female"} 
