// `as const` and enums


// `as const` is used to create a readonly array or object
const nums = ["1", "2", '3'] as const

// here nums is a readonly array of strings


// here skilllevels is a readonly array of strings
// and the values are "beginner", "intermediate", "advanced", "master"
const skilllevels = ["beginner", "intermediate", "advanced", "master"] as const


// here person is a type with name and skilllevel properties
// name is a string and skilllevel is a union of the values of the skilllevels array
// and the values are "beginner", "intermediate", "advanced", "master"
type Person ={
    name: string;
    skilllevel: typeof skilllevels[number];
}


skilllevels.forEach((level) => {
    console.log(level)
})

// alternate of readonly
const person = {
    name: "Gyana",
    age: 28,
    address: {
        city: "Hyderabad",
        state: "Telangana"
    }
} as const

// enums are a way to define a set of named constants
// not recommended to use enums in typescript
enum SkillLevel {
    BEGINNER = "beginner",
    INTERMEDIATE = "intermediate",
    ADVANCED = "advanced",  
    MASTER = "master"
}  

let person2: Person = {
    name: "Gyana",
    skilllevel: SkillLevel.BEGINNER
}