// - Type assertions (`as`, `satisfies`)


const value: unknown = "Hello";

// assert it's a string (you take responsibility!)
const strLength = (value as string).length;

console.log(strLength); // 5


// Define a type for config
type Config = {
    mode: "dev" | "prod";
    debug: boolean;
  };
  
  // This object satisfies Config, and types are preserved
  const myConfig = {
    mode: "dev",
    debug: true,
  } satisfies Config;
  
  console.log(myConfig.mode);  // "dev"
  