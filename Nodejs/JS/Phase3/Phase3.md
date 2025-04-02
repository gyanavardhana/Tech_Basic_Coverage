### **Phase 3: Functional Programming**

#### **Key Differences in Functional Programming Concepts**

### **Immutability**
| Concept               | Key Difference |
|----------------------|---------------|
| **Object.freeze vs. const** | `Object.freeze()` makes an object immutable, while `const` prevents reassignment but doesn’t make objects immutable. |
| **Mutability vs. Immutability** | Mutable objects can be changed after creation, immutable objects cannot. |

### **Pure Functions**
| Concept               | Key Difference |
|----------------------|---------------|
| **Pure vs. Impure Functions** | Pure functions always return the same output for the same input and have no side effects, whereas impure functions depend on external state or cause side effects. |
| **Deterministic vs. Non-Deterministic Functions** | Deterministic functions return the same result for the same input, while non-deterministic functions may return different results. |

### **Higher-Order Functions**
| Concept               | Key Difference |
|----------------------|---------------|
| **Function vs. Higher-Order Function** | A function is a reusable block of code, while a higher-order function takes another function as an argument or returns a function. |
| **map vs. forEach** | `map` returns a new array with transformed elements, while `forEach` executes a function on each element but does not return a new array. |
| **filter vs. reduce** | `filter` returns an array of elements that match a condition, while `reduce` accumulates a single value from an array. |

### **Closures**
| Concept               | Key Difference |
|----------------------|---------------|
| **Closure vs. Scope** | Closures allow inner functions to retain access to outer function variables, whereas scope defines variable accessibility. |
| **Lexical Scope vs. Dynamic Scope** | Lexical scope is determined by the physical location of functions in code, while dynamic scope depends on the call stack. |

### **Recursion**
| Concept               | Key Difference |
|----------------------|---------------|
| **Recursion vs. Loop** | Recursion calls itself until a base condition is met, while loops iterate with a defined condition. |
| **Tail Recursion vs. Regular Recursion** | Tail recursion optimizes stack usage by placing the recursive call at the end of the function, while regular recursion retains previous function calls. |

### **Function Composition**
| Concept               | Key Difference |
|----------------------|---------------|
| **Function Composition vs. Chaining** | Function composition combines multiple functions into a single function, while chaining executes methods sequentially on an object. |
| **Compose vs. Pipe** | `compose` applies functions from right to left, while `pipe` applies them from left to right. |

- **Sources:**  
  - [MDN JavaScript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  
  - [Eloquent JavaScript](https://eloquentjavascript.net/)

