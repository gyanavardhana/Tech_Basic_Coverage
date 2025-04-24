
### **1. Event Loop and Non-Blocking I/O**
| Concept | Key Difference |
|--------|----------------|
| Event Loop | Core mechanism enabling async I/O by queuing callbacks. |
| Non-Blocking I/O | Allows other operations to continue while waiting for I/O. |
| Use case | Efficiently handle many connections (e.g., web servers). |

- refer to eventloop.md for more clarity
---

### **2. Callbacks vs Promises vs Async/Await**
| Concept | Key Difference |
|--------|----------------|
| Callbacks | Functions passed as arguments, invoked after async work. |
| Promises | Represent eventual completion/failure of async operations. |
| Async/Await | Syntactic sugar over Promises for cleaner async flow. |
| Use case | Prefer `async/await` for readability, Promises for chaining. |

---

### **3. Node.js Built-in Modules**
| Module | Use Case |
|--------|----------|
| `fs` | Read/write files using sync or async methods. |
| `path` | Work with file and directory paths across OS. |
| `http` | Create basic HTTP servers without external libraries. |

---

### **4. Bare-Metal Web Server**
| Concept | Key Difference |
|--------|----------------|
| `http.createServer()` | Handles raw HTTP requests/responses. |
| `req` and `res` | Streams for handling incoming data and sending output. |
| Use case | Learn HTTP basics or build custom lightweight servers. |

---

### **5. Debugging Node.js Applications**
| Concept | Key Difference |
|--------|----------------|
| `console.log` | Basic debugging output. |
| Debugger | Attach to VSCode or use `node inspect` for breakpoints. |
| `node --inspect` | Launch with devtools inspector support. |

---

### **6. Unit and Integration Tests (Jest)**
| Concept | Key Difference |
|--------|----------------|
| Unit Test | Isolated testing of functions/components. |
| Integration Test | Tests multiple components working together. |
| Use case | Use Jest for both types with mocks for isolation. |

---

### **7. Middleware Concepts (Pre-Express)**
| Concept | Key Difference |
|--------|----------------|
| Middleware | Functions run between request and response. |
| Custom Middleware | Create chaining logic with `req`, `res`, `next`. |
| Use case | Logging, auth checks, body parsing, etc. |

---

### **8. Handling Errors in Node.js**
| Concept | Key Difference |
|--------|----------------|
| Sync Errors | Caught with try-catch. |
| Async Errors | Caught with callbacks, `.catch`, or try-catch in async. |
| Global Handlers | `process.on('uncaughtException')`, `unhandledRejection`. |

---

### **9. `process.env` and Environment Variables**
| Concept | Key Difference |
|--------|----------------|
| `process.env` | Stores environment variables from OS or `.env` files. |
| dotenv | Load `.env` file into `process.env`. |
| Use case | Configuration, secrets, environment-specific behavior. |

---

### **References**
- [Node.js Docs](https://nodejs.org/en/docs)
- [TypeScript Node Starter](https://github.com/microsoft/TypeScript-Node-Starter)
- [Jest Testing Docs](https://jestjs.io/docs/getting-started)
- [Node.js Debugging Guide](https://nodejs.org/en/docs/guides/debugging-getting-started/)

