


// - Create functions with explicitly defined types
const addNumbers: (a: number, b: number) => number = (a, b) => {
    return a + b;
}

// - Define an object type using both `type` and `interface`
type User = {
    name: string;
    age: number;
    email: string;
    isActive: boolean;          
}
interface Product {
    id: number;
    name: string;
    price: number;
    inStock: boolean;
}
// - Write a function that calculates the area of a rectangle using TypeScript
const calculateArea: (length: number, width: number) => number = (length, width) => {
    return length * width;
}
// - Create an array of user objects with specific types and iterate over them
const users: User[] = [
    {
        name: "gyana",
        age: 25,
        email: "gyana@email.com",
        isActive: true
    },
    {
        name: "sita",
        age: 30,
        email: "sita@gmail.com",
        isActive: false
    }
]

users.forEach(user => {
    console.log(`Name: ${user.name}, Age: ${user.age}, Email: ${user.email}, Active: ${user.isActive}`);
});