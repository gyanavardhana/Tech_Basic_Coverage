
// Loops in js
// 1. for loop

for (let i = 0; i < 5; i++) {
    console.log('Index: ' + i);
}

// 2. while loop
let j = 0;
while (j < 5) {
    console.log('Index: ' + j);
    j++;
}


// 3. do-while loop
let k = 0;
do {
    console.log('Index: ' + k);
    k++;
}
while (k < 5);

// 4. for-in loop
const fruits = ['Apple', 'Mango', 'Banana', 'Orange'];
for (let index in fruits) {
    console.log('Index: ' + index + ', Fruit: ' + fruits[index]);
}

// 5. for-of loop
for (let fruit of fruits) {
    console.log('Fruit: ' + fruit);
}

// 6. forEach loop
fruits.forEach(function (fruit, index) {
    console.log('Index: ' + index + ', Fruit: ' + fruit);
});

