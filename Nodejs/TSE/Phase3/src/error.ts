const fs = require("fs")
// try catch block
function divide(a: number, b: number): number | void {
  try {
    if (b === 0) {
      throw new Error("Division by zero");
    }
    return a / b;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("An unexpected error occurred:", error);
    }
  }
}

divide(10, 0);

// using call back
fs.readFile("nonexistent.txt", "utf8", (err: Error, data: string) => {
  if (err) {
    console.error("File read error:", err.message);
    return;
  }
  console.log(data);
});


// using promises
function fetchData() {
  return new Promise((resolve, reject) => {
    const error = true;
    if (error) {
      reject("Something went wrong");
    } else {
      resolve("Data received");
    }
  });
}

fetchData()
  .then((data) => console.log(data))
  .catch((err) => console.error("Promise error:", err));

// in async / await
async function fetchData1() {
  try {
    // Simulate async operation
    const result = await Promise.reject("Fetch failed");
    console.log(result);
  } catch (error) {
    console.error("Async/await error:", error);
  }
}

fetchData1();
