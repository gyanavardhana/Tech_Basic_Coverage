// keyof and typeof

type  Person = {
    name: string;
    age: number;
}

// keyof is used to get the keys of an object as a union type
function getValue(key: keyof Person, person: Person){
    return person[key];
}


console.log(getValue("name", {name: "Gyana", age: 25})) // Gyana
console.log(getValue("age", {name: "Gyana", age: 25})) // 25

// typeof
// typeof is used to get the type of a variable
// here person is a type with name and age properties
let person = {
    name: "Gyana",
    age: 25
}

// here person is a type with name and age properties
let people: (typeof person)[] = [
    {
        name: "Gyana",
        age: 25
    },
    {
        name: "Gyanavardhan",
        age: 25
    }
]
console.log(people)