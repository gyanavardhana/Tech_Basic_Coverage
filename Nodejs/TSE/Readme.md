# **Phase 1: TypeScript Basics & Setup**
### **Concepts to Cover**
- What is TypeScript? Why use it? - Done
- Initializing a TypeScript project (`tsc --init`) - Done
- Understanding the `tsconfig.json` file - Done 
- Assigning types and type inference - Done 
- Basic types: `number`, `string`, `boolean` - Done
- Arrays (`number[]`, `string[]`, `Array<T>`) - Done
- `any` type and why to avoid it - Done
- Object basics (`type` and `interface`) - Done
- Defining functions (parameter and return types) - Done
- `void` type and optional parameters - Done
- Destructured and rest parameters - Done
- Typing variables as functions - Done

### **Practice Tasks**
✅ Set up a simple TypeScript project.  - Done
✅ Create functions with explicitly defined types. - Done
✅ Define an object type using both `type` and `interface`.  - Done
✅ Write a function that calculates the area of a rectangle using TypeScript.  - Done
✅ Create an array of user objects with specific types and iterate over them.  - Done

---

# **Phase 2: TypeScript Advanced Features**
### **Concepts to Cover**
- `Types` vs `Interfaces` - Done
- Union and Intersection types - Done
- `readonly` properties - Done
- `keyof` and `typeof` - Done
- Index types (`[key: string]: type`) - Done
- `as const` and enums - Done
- Tuples (`[number, string]`) - Done
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
