
fetch('https://jsonplaceholder.typicode.com/todos/5')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => console.log("Fetched Data:", data))
    .catch(error => console.error("Error fetching data:", error));



const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const log = () => {
    console.log("Logging...");
}

const debouncedLog = debounce(log, 5000);

debouncedLog();


localStorage.setItem('name', 'John');
const name = localStorage.getItem('name');
console.log(name); // John
localStorage.removeItem('name');
localStorage.clear();