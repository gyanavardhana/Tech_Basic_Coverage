// Objects (`this`, methods, prototypes)

// Objects are a collection of key-value pairs. 
// The keys are strings and the values can be any data type. 
// Objects are used to store data in a structured way. In JavaScript, objects

const person = {
    name: 'John',
    age: 30,
    hobbies: ['reading', 'swimming'],
    greet: function() {
        console.log('Hello, my name is ' + this.name);
    }
};


// The `this` keyword is used to refer to the current object.
// In the example above, `this` refers to the `person` object.
// The `greet` method is a function that belongs to the `person` object.
// The `this` keyword is used to access the properties of the `person` object.
// The `this` keyword is used to refer to the current object in a method


// Methods are functions that belong to an object.
// In the example above, `greet` is a method that belongs to the `person` object.
// Methods are defined as functions inside an object.
// Methods can access the properties of the object using the `this` keyword.


person.greet(); // Hello, my name is John

// Prototypes are used to add new properties and methods to an object.
// In JavaScript, objects are created using constructors.
// Constructors are functions that are used to create objects.
// Constructors can be used to create multiple objects with the same properties and methods.
// Prototypes are used to add new properties and methods to the objects created using constructors.

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.greet = function() {
    console.log('Hello, my name is ' + this.name);
}

const person1 = new Person('John', 30);
const person2 = new Person('Jane', 25); 

person1.greet(); // Hello, my name is John
person2.greet(); // Hello, my name is Jane  


