// Tuples (`[number, string]`) 
const person = {
    name: "Gyana",
    age: 25,
    skilllevel: "beginner"
}

Object.entries(person).forEach(([key, value]) => {
    console.log(key, value)
}
)

// Tuples are used to define an array with a fixed number of elements
type Tuple = [string, boolean]

// here the type of a is a tuple with two elements
const a: Tuple = ["Gyana", true]

