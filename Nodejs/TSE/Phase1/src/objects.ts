// Object basics (`type` and `interface`)

// Object types are a way to define the shape of an object.
// They can be defined using either `type` or `interface`.
// The main difference is that `type` can be used to define primitive types, union types, and intersection types,
// while `interface` can only be used to define object types.


// 1. Object type using `type`
type Person = {
    name: string;
    age: number;
    isStudent: boolean;
    greet: () => void;
};
// 2. Object type using `interface`
interface Animal {
    species: string;
    age: number; 
    isWild: boolean;
    makeSound: () => void;
}

// 3. Object type using `type` with optional properties
type Car = {
    make: string;
    model: string;
    year: number;
    color?: string; // optional property
    start: () => void;
    stop: () => void;
}

// 4. Object type using `interface` with optional properties
interface Book {
    title: string;
    date: string;
}

// 5. Object type using `type` with readonly properties
type ReadOnlyPoint = {
    readonly x: number;
    readonly y: number;
    move: (dx: number, dy: number) => void;
}


// 6. Object type using `interface` with readonly properties
interface ReadOnlyCircle {
    readonly radius: number;
    readonly center: ReadOnlyPoint;
    getArea: () => number;
}

// 7. Object type using `type` with index signatures
type StringDictionary = {
    [key: string]: string;
};

// 8. Object type using `interface` with index signatures
interface NumberDictionary {
    [key: number]: number;
}    


