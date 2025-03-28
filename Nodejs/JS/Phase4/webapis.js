// - Web APIs (`fetch`, `localStorage`, `sessionStorage`)


// 1. `fetch` API
// - Fetch API is used to make HTTP requests
// - It returns a promise that resolves to the `Response` object
// - The `Response` object represents the response to the request

fetch('https://jsonplaceholder.typicode.com/todos/5')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("Fetched Data:", data))
    .catch(error => console.error("Error fetching data:", error));


// 2. `localStorage` & `sessionStorage`

// - `localStorage` stores data with no expiration date
// - `sessionStorage` stores data for one session (data is lost when the browser tab is closed)


// Set data in `localStorage`
localStorage.setItem('name', 'John');

// Get data from `localStorage`
const name = localStorage.getItem('name');
console.log(name); // John

// Remove data from `localStorage`
localStorage.removeItem('name');

// Clear all data from `localStorage`
localStorage.clear();

// Set data in `sessionStorage`
sessionStorage.setItem('name1', 'Henry');

// Get data from `sessionStorage`
const name1 = sessionStorage.getItem('name1');
console.log(name1); // John

// Remove data from `sessionStorage`
sessionStorage.removeItem('name1');

// Clear all data from `sessionStorage`
sessionStorage.clear();

// - `localStorage` and `sessionStorage` have the same methods and properties
// - The only difference is the lifetime of the data stored
// - Data stored in `localStorage` persists even after the browser is closed
// - Data stored in `sessionStorage` is lost when the browser tab is closed
// - Both `localStorage` and `sessionStorage` store data as key-value pairs
// - The data stored in `localStorage` and `sessionStorage` is limited to strings
// - To store complex data types, you need to serialize them using `JSON.stringify` and `JSON.parse`
