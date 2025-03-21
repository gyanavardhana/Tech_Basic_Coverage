

Phase 1: Variables

|               | **var**              | **let**                 | **const**               |
|--------------|---------------------|------------------------|------------------------|
| **SCOPE**    | Global / Function   | Block                  | Block                  |
| **HOISTING** | undefined           | ReferenceError         | ReferenceError         |
| **REDECLARE**| OK                  | Only in other scopes   | Only in other scopes   |
| **REASSIGN** | OK                  | OK                     | TypeError              |

-sources:
https://www.freecodecamp.org/news/var-let-and-const-whats-the-difference/

https://medium.com/@pr__veen/javascript-variables-9df27480e11d



Phase 1: Datatypes

# **1. Primitive Data Types**
Primitive data types are immutable and stored directly in memory.

| Data Type  | Example                  | `typeof` Output |
|------------|--------------------------|-----------------|
| **String**  | `let name = "John";`      | `"string"`      |
| **Number**  | `let age = 25;`           | `"number"`      |
| **Boolean** | `let isMarried = false;`  | `"boolean"`     |
| **Null**    | `let value = null;`       | `"object"` *(JavaScript quirk)* |
| **Undefined** | `let x;`                | `"undefined"`   |
| **Symbol**  | `let sym = Symbol();`     | `"symbol"`      |
| **BigInt**  | `let big = 123n;`         | `"bigint"`      |

---

## **2. Reference Data Types**
Reference types are objects stored in heap memory and accessed by reference.

| Data Type       | Example                                      | `typeof` Output |
|----------------|--------------------------------|---------------|
| **Array**      | `let arr = [1, 2, 3];`         | `"object"`    |
| **Object**     | `let obj = { key: "value" };`  | `"object"`    |
| **Function**   | `let fn = function() {};`      | `"function"`  |
| **Date**       | `let today = new Date();`      | `"object"`    |

- sources:
https://www.freecodecamp.org/news/primitive-vs-reference-data-types-in-javascript/ (imp to remember)


Phase 1: loops

## **Loop Types and Differences**

| Loop Type      | Syntax Example | Use Case | Stops When |
|---------------|---------------|----------|------------|
| **for**       | `for (let i = 0; i < 5; i++) {}` | Used when the number of iterations is known | The condition becomes `false` |
| **while**     | `while (condition) {}` | Used when the number of iterations is unknown and based on a condition | The condition becomes `false` |
| **do-while**  | `do { } while (condition);` | Runs at least once before checking the condition | The condition becomes `false` after first execution |
| **for-in**    | `for (let key in obj) {}` | Used for iterating over object keys or array indices | Iterates over enumerable properties |
| **for-of**    | `for (let value of array) {}` | Used for iterating over iterable objects (arrays, strings, maps) | Iterates over values directly |
| **forEach**   | `array.forEach((item, index) => {})` | Used for iterating over arrays with a callback | Iterates until all elements are processed |

-sources:
https://www.freecodecamp.org/news/javascript-loops-explained-for-loop-for/


Phase1 functions:

| Function Type | Syntax Example | Key Features |
|--------------|---------------|--------------|
| **Function Declaration** | `function greet(name) {}` | Hoisted, can be used before declaration |
| **Function Expression** | `let greet = function(name) {};` | Not hoisted, defined as a variable |
| **Arrow Function** | `let greet = (name) => {};` | Shorter syntax, no `this` binding |
| **Single Parameter Arrow Function** | `let greet = name => {};` | Parentheses can be omitted if one parameter |
| **No Parameter Arrow Function** | `let greet = () => {};` | Empty parentheses needed when no parameters |
| **Arrow Function with Return** | `let greet = name => 'Hello ' + name;` | Implicit return if single expression |
| **Function with Rest Operator** | `function sum(...args) {}` | Collects multiple arguments as an array |
| **Function with Spread Operator** | `sum(...arr);` | Expands an array into separate arguments |

-sources:
https://www.freecodecamp.org/news/what-are-functions-in-javascript-a-beginners-guide/