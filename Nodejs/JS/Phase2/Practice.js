
const Book = {
    name: 'JavaScript',
    price: 20,
    date: '2021-09-01'
};

console.log(Book.name);
console.log(Book.price);
console.log(Book.date);

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log(evenNumbers);

function capitalize(sentence) {
    return sentence.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

console.log(capitalize('hello world'));

fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));

