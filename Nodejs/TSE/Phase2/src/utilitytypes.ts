// - Utility types: `Pick`, `Omit`, `Partial`, `Required`

// pick
// `Pick` creates a new type by selecting a subset of properties from an existing type.
type Person = {
  name: string;
  age: number;
  address: string;
};

type PersonName = Pick<Person, "name">;

const personName: PersonName = {
  name: "John Doe",
};

console.log(personName);

// omit
// `Omit` creates a new type by excluding a subset of properties from an existing type.
type PersonWithoutAddress = Omit<Person, "address">;
const personWithoutAddress: PersonWithoutAddress = {
  name: "John Doe",
  age: 30,
};


console.log(personWithoutAddress);

// partial
// `Partial` makes all properties of a type optional.
type SamplePerson = {
    name: string;
    age: number;
    address: string;
    };
type PartialSamplePerson = Partial<SamplePerson>;

const partialPerson: PartialSamplePerson = {
  age: 3,
  address: "123 Main St",
};

console.log(partialPerson);

// required
// `Required` makes all properties of a type required.

type OptionalPerson = {
  name?: string;
  age?: number;
  address?: string;
};

type RequiredPerson = Required<OptionalPerson>;

const requiredPerson: RequiredPerson = {
  name: "John Doe",
  age: 30,
  address: "123 Main St",
};

console.log(requiredPerson);