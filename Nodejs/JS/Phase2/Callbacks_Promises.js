// - Callbacks and Promises (async programming)

// Callbacks
// - Callbacks are functions that are passed as arguments to other functions
// - Callbacks are used to handle asynchronous operations
// - Callbacks are used in functions like setTimeout, setInterval, addEventListener, etc.
// - Callbacks can be synchronous or asynchronous

// Example: Callbacks
function greet(name, callback) {
    console.log('Hello ' + name);
    callback();
}

function callMe() {
    console.log('I am callback function');
}

greet('John Doe', callMe);

// Promises
// - Promises are used to handle asynchronous operations
// - Promises are objects that represent the eventual completion or failure of an asynchronous operation
// - Promises are used in functions like fetch, readFile, writeFile, etc.
// - Promises have three states: pending, fulfilled, rejected
// - Promises have two methods: then, catch

// Example: Promises
let promise = new Promise((resolve, reject) => {
    let isSuccessful = false;

    if (isSuccessful) {
        resolve('Success');
    } else {
        reject('Failure');
    }
});

promise.then((message) => {
    console.log(message);
}
).catch((message) => {
    console.log(message);
});

// Example: Promises with setTimeout
let promise1 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Promise resolved');
    }, 2000);
});

promise1.then((message) => {
    console.log(message);
});

// Example: Promises with fetch
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));


// Async/Await
// - Async/Await is a modern way to handle asynchronous operations
// - Async/Await is built on top of Promises
// - Async/Await makes asynchronous code look synchronous
// - Async/Await is used with the async and await keywords

// Example: Async/Await
async function fetchData() {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json();
    console.log(data);
}
