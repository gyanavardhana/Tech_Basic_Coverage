
// - Immutability (`Object.freeze`, `const`, spread)

// Object.freeze
const obj = { name: 'John' };
Object.freeze(obj);
obj.name = 'Jane'; // Error: Cannot assign to read only property 'name' of object


// deep freeze
const obj1 = { name: 'John', address: { city: 'NY' } };
Object.freeze(obj1);
obj1.address.city = 'LA';
console.log(obj1); // { name: 'John', address: { city: 'LA' } }

Object.freeze(obj1.address);
obj1.address.city = 'NY';
console.log(obj1); // { name: 'John', address: { city: 'LA' } }

// deep freeze function
function deepFreeze(obj) {
  Object.freeze(obj);
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      deepFreeze(obj[key]);
    }
  }
}

// const
const arr = [1, 2, 3];
arr = [4, 5, 6]; // Error: Assignment to constant variable.

// spread
const arr1 = [1, 2, 3];
const newArr = [...arr1, 4, 5, 6]; // creates a new objecct as arr1 is not mutated
console.log(newArr); // [1, 2, 3, 4, 5, 6]




