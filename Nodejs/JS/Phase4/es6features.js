// - ES6+ Features (`async/await`, optional chaining, nullish coalescing)

// 1. `async/await`
// - `async` functions return a promise
// - `await` keyword waits for the promise to resolve
// - `try/catch` block can be used to handle errors

const fetchData = async () => {
    try {
        console.log("Fetching data...");
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/5');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched Data:", data);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

fetchData();


// 2. Optional Chaining
// - Allows to safely access nested properties of an object
// - Returns `undefined` if a property is `null` or `undefined`

const user = {
    name: 'John',
    address: {
        street: '123 Main St',
        city: 'New York'
    }
};

console.log(user.address?.street); // 123 Main St
console.log(user.address?.zipCode); // undefined


// 3. Nullish Coalescing
// - Returns the right-hand operand if the left-hand operand is `null` or `undefined`

const name = null;
const username = name ?? 'Guest';
console.log(username); // Guest
