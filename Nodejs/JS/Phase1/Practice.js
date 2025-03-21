
let message  = "hello world";
console.log(message);

let num = 10;
const checkeoro= (num) => {return num%2==0 ? "even" : "odd";}
console.log(checkeoro(num));


let nameone = 'John Doe';
const rev = (name) => {return name.split("").reverse().join("");}
console.log(rev(nameone))

//- Implement a loop that prints numbers 1-100 with "FizzBuzz" logic.

for(let i=1; i<=100; i++){
    if(i%3==0){
        console.log("Fizz" + i);
    }
}