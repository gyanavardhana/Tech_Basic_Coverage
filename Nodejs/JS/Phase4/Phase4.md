
# **Phase 4: Advanced Topics**

## **Key Differences in Advanced JavaScript Concepts**

### **1. ES6+ Features**
| Concept | Key Difference |
|---------|--------------|
| **`async/await` vs. Promises** | `async/await` simplifies promise-based code and makes it more readable, while Promises require `.then()` and `.catch()`. |
| **Optional Chaining (`?.`) vs. Logical AND (`&&`)** | Optional chaining safely accesses nested properties, whereas logical `&&` short-circuits and stops execution if a property is `null` or `undefined`. |
| **Nullish Coalescing (`??`) vs. Logical OR (`||`)** | `??` returns the right operand only if the left operand is `null` or `undefined`, while `||` also treats falsy values (`0`, `""`, `false`) as `false`. |

---

### **2. Modules**
| Concept | Key Difference |
|---------|--------------|
| **`import/export` vs. `require/module.exports`** | `import/export` (ES Modules) is used in modern JavaScript, while `require/module.exports` (CommonJS) is used in Node.js. |
| **Named Export vs. Default Export** | Named exports allow multiple exports, while default export allows only one export per file. |

---

### **3. Event Loop & Asynchronous JavaScript**
| Concept | Key Difference |
|---------|--------------|
| **Call Stack vs. Event Loop** | The call stack executes functions synchronously, while the event loop handles asynchronous callbacks. |
| **Microtask Queue vs. Callback Queue** | Microtasks (`Promises`, `MutationObserver`) run before the callback queue (`setTimeout`, `setInterval`). |
| **`setTimeout` vs. `setImmediate`** | `setTimeout` runs after a minimum delay, while `setImmediate` executes after I/O operations (Node.js only). |

---

### **4. Prototypes & Inheritance**
| Concept | Key Difference |
|---------|--------------|
| **Prototypal Inheritance vs. Classical Inheritance** | JavaScript uses prototypal inheritance (objects inherit from objects), whereas classical inheritance (used in Java, C++) involves class-based hierarchies. |
| **Prototype Chain vs. `__proto__`** | The prototype chain is the lookup mechanism for properties, while `__proto__` is an object reference to its prototype. |
| **`Object.create()` vs. `class` Syntax** | `Object.create()` allows manual prototype chain manipulation, while `class` syntax provides a cleaner way to create constructor-based objects. |

---

### **5. Web APIs**
| Concept | Key Difference |
|---------|--------------|
| **`fetch` vs. `XMLHttpRequest`** | `fetch` is modern, promise-based, and cleaner, while `XMLHttpRequest` is older and requires callbacks. |
| **`localStorage` vs. `sessionStorage`** | `localStorage` persists even after the browser is closed, while `sessionStorage` is cleared when the session ends. |
| **`localStorage` vs. `cookies`** | `localStorage` stores larger data client-side, while `cookies` are sent with HTTP requests and have size limits. |



---

### **References**
- [MDN JavaScript Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript)  
- [JavaScript.info](https://javascript.info/)  
- [Eloquent JavaScript](https://eloquentjavascript.net/)  

