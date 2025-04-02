// Arrays (map, filter, reduce, find, some, every)

// map
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
console.log(doubled);


// filter
const even = numbers.filter(num => num % 2 === 0);
console.log(even);


// reduce
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log(sum);


// find
const found = numbers.find(num => num > 3);
console.log(found);

// some
const some = numbers.some(num => num > 3);
console.log(some);

// every
const every = numbers.every(num => num > 3);
console.log(every);

