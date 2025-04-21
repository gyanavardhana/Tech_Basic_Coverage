// Index types (`[key: string]: type`)

// Index types are used to define the type of an object with dynamic keys
type Person = {
    nme: string;
    skilllevel: "beginner" | "intermediate" | "advanced" | "master";
}

const person : Person = {
    nme: "Gyana",
    skilllevel: "beginner"
}
printSkillLevel(person.skilllevel);

// here the type of skilllevel is a union of the values of the skilllevels array
function printSkillLevel(skilllevel: Person["skilllevel"]) {
    console.log("Skill Level:", skilllevel);
}


// here the type of index is a string
type PeopleGroupbynamel = {
    [index: Person["nme"]]: Person[];
}

// here the type of index is a union of the values of the skilllevels array
type PeopleGroupbySkillLevel = {
    [index in Person["skilllevel"]]: Person[];
}

const arr = [ "string", 1, true]
// to get the type of the array
type Ar = (typeof arr)
// to get the type of the array elements
type A = (typeof arr)[number] 


const p = {
    name: "Gyana",
    age: 25,
    skilllevel: "beginner"
}


// to get the type of the elements of the object
type p = (typeof p)[keyof typeof p]