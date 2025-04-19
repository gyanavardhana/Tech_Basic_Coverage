// - Type predicate functions
// indicate whether a value is of a specific type

type Dog = {
  kind: "dog";
  bark: () => void;
};

type Cat = {
  kind: "cat";
  meow: () => void;
};

type Animal = Dog | Cat;

// Type predicate function
function isDog(animal: Animal): animal is Dog {
  return animal.kind === "dog";
}

// Usage
function speak(animal: Animal) {
  if (isDog(animal)) {
    animal.bark();
  } else {
    animal.meow();
  }
}

const dog: Dog = {
  kind: "dog",
  bark: () => console.log("Woof!"),
};

const cat: Cat = {
  kind: "cat",
  meow: () => console.log("Meow!"),
};

speak(dog); // Woof!
speak(cat); // Meow!
