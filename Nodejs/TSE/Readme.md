# **Phase 1: TypeScript Basics & Setup**
### **Concepts to Cover**
- What is TypeScript? Why use it?
- Initializing a TypeScript project (`tsc --init`)
- Understanding the `tsconfig.json` file
- Assigning types and type inference
- Basic types: `number`, `string`, `boolean`
- Arrays (`number[]`, `string[]`, `Array<T>`)
- `any` type and why to avoid it
- Object basics (`type` and `interface`)
- Defining functions (parameter and return types)
- `void` type and optional parameters
- Destructured and rest parameters
- Typing variables as functions

### **Practice Tasks**
✅ Set up a simple TypeScript project.  
✅ Create functions with explicitly defined types.  
✅ Define an object type using both `type` and `interface`.  
✅ Write a function that calculates the area of a rectangle using TypeScript.  
✅ Create an array of user objects with specific types and iterate over them.  

---

# **Phase 2: TypeScript Advanced Features**
### **Concepts to Cover**
- `Types` vs `Interfaces`
- Union and Intersection types
- `readonly` properties
- `keyof` and `typeof`
- Index types (`[key: string]: type`)
- `as const` and enums
- Tuples (`[number, string]`)
- Generics (`T`, `<T extends object>`)
- Utility types: `Pick`, `Omit`, `Partial`, `Required`
- `ReturnType` and `Parameters`
- `Record<K, T>`
- Type guards (`typeof`, `instanceof`, `in`)
- `never` and `unknown` types
- Type assertions (`as`, `satisfies`)
- Discriminated unions
- Function overloads
- Type predicate functions

### **Practice Tasks**
✅ Implement a generic function for an API response type.  
✅ Create a function that only accepts specific object keys using `keyof`.  
✅ Define a union type for a `User | Admin` and differentiate them using a discriminated union.  
✅ Build a generic `Stack<T>` class that supports push/pop operations.  

---

# **Phase 3: Node.js Core with TypeScript**
### **Concepts to Cover**
- Event Loop and Non-Blocking I/O
- Callbacks vs Promises vs Async/Await
- Node.js built-in modules (`fs`, `path`, `http`)
- Building a bare-metal web server in Node.js
- Debugging Node.js applications
- Writing Unit and Integration tests (Jest)
- Middleware concepts (before Express.js)
- Handling Errors in Node.js
- `process.env` and Environment Variables

### **Practice Tasks**
✅ Create a simple HTTP server using the Node.js `http` module.  
✅ Implement a function to read/write JSON files asynchronously.  
✅ Write a function that fetches data from an API using `async/await`.  
✅ Debug a Node.js script using `node --inspect`.  

---

# **Phase 4: Express.js with TypeScript**
### **Concepts to Cover**
- Setting up an Express.js server with TypeScript
- Creating RESTful API routes
- Middleware in Express.js
- Request and Response types (`Request`, `Response`, `NextFunction`)
- Handling authentication (JWT, Sessions)
- Using `Zod` for runtime validation
- Working with `dotenv` for environment variables
- Error handling middleware
- Logging with `Pino`
- Connecting to a database (PostgreSQL with Prisma)
- Building a modular Express.js application

### **Practice Tasks**
✅ Build an Express.js API with a `GET /users` route.  
✅ Add a middleware that logs request details.  
✅ Implement a JWT authentication system.  
✅ Use Prisma ORM to interact with PostgreSQL.  

---

# **Phase 5: Full-Stack TypeScript Project**
### **Project: Task Management System**
**Features:**  
✅ Users can register and log in (JWT authentication).  
✅ Create, update, and delete tasks.  
✅ Tasks are stored in PostgreSQL.  
✅ Users can only see their own tasks.  
✅ Implement validation using `Zod`.  
✅ Use `Pino` for logging and `dotenv` for environment variables.  

---

# **Phase 6: TypeScript with React (Bonus)**
### **Concepts to Cover**
- PropTypes vs TypeScript types
- Typing `useState`, `useRef`, `useReducer`, `useContext`
- Generic components in React

### **Practice Tasks**
✅ Convert a JavaScript React component to TypeScript.  
✅ Implement a `useReducer` state management system with TypeScript.  
