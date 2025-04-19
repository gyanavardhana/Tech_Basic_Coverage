// - `never` and `unknown` types

// - `never` is a subtype of every type
// - `unknown` is a supertype of every type

type choice = "low" | "medium" | "high";

function getChoice(mychoice: choice): string {
  switch (mychoice) {
    case "low":
      return "Low choice";
    case "medium":
      return "Medium choice";
    case "high":
      return "High choice";
    default:
      // This block will never be reached if all cases are handled
      const exhaustiveCheck: never = mychoice; //  Error if new case is added but not handled
      return exhaustiveCheck;
  }
}

console.log(getChoice("low"));// Low choice

// unknown

let value: unknown;
value = "Hello";

value = 42;

value = true;
console.log(value);// true
