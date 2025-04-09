
// `readonly` properties

// `readonly` properties are used to make a property readonly
// `readonly` properties can only be assigned a value once
type Person = {
    name: string;
    age: number;
    readonly gender: string;
};

let person1: Person = {
    name: "Gyana",
    age: 25,
    gender: "Male"
}

person1.name = "Gyanavardhan"


type NumberArray = readonly number[];
let numbers: NumberArray = [1, 2, 3, 4, 5];
// numbers[0] = 10