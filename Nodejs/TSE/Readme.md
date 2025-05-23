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
- Generics (`T`, `<T extends object>`) - Done 
- Utility types: `Pick`, `Omit`, `Partial`, `Required` - Done
- `ReturnType` and `Parameters` - Done
- `Record<K, T>` - Done
- Type guards (`typeof`, `instanceof`, `in`) - Done
- `never` and `unknown` types - Done
- Type assertions (`as`, `satisfies`) - Done
- Discriminated unions - Done
- Function overloads - Done
- Type predicate functions - Done

### **Practice Tasks**
✅ Implement a generic function for an API response type. - Done
✅ Create a function that only accepts specific object keys using `keyof`.  - Done
✅ Define a union type for a `User | Admin` and differentiate them using a discriminated union. - Done  
✅ Build a generic `Stack<T>` class that supports push/pop operations.  - Done

---

# **Phase 3: Node.js Core with TypeScript**
### **Concepts to Cover**
- Event Loop and Non-Blocking I/O - Done
- Callbacks vs Promises vs Async/Await - Done
- Node.js built-in modules (`fs`, `path`, `http`) - Done
- Building a bare-metal web server in Node.js - Done
- Debugging Node.js applications - Done
- Writing Unit and Integration tests (Jest) - Done
- Middleware concepts (before Express.js) - Done
- Handling Errors in Node.js - Done
- `process.env` and Environment Variables - Done

### **Practice Tasks**
✅ Create a simple HTTP server using the Node.js `http` module.  - Done
✅ Implement a function to read/write JSON files asynchronously. - Done
✅ Write a function that fetches data from an API using `async/await`.  
✅ Debug a Node.js script using `node --inspect`.  - Done

---

# **Phase 4: Express.js with TypeScript**
### **Concepts to Cover**
- Setting up an Express.js server with TypeScript - Done
- Creating RESTful API routes - Done
- Middleware in Express.js - Done
- Request and Response types (`Request`, `Response`, `NextFunction`) - Done
- Handling authentication (JWT, Sessions) - Done
- Using `Zod` for runtime validation - Done
- Working with `dotenv` for environment variables - Done
- Error handling middleware - Done
- Logging with `Pino` - Done
- Connecting to a database (PostgreSQL with Drizzle) - To be done in Phase5
- Building a modular Express.js application - To be done

### **Practice Tasks**
✅ Build an Express.js API with a `GET /users` route. - Done
✅ Add a middleware that logs request details. - Done
✅ Implement a JWT authentication system.  - Done
✅ Use Drizzle ORM to interact with PostgreSQL.  -  - To be done in Phase5

---

# **Phase 5: Full-Stack TypeScript Project**
### **Project: Task Management System**
**Features:**  
✅ Users can register and log in (JWT authentication). - Done
✅ Create, update, and delete tasks. - Done
✅ Tasks are stored in PostgreSQL.  - Done
✅ Users can only see their own tasks. - Done
✅ Implement validation using `Zod`.  - Done
✅ Use `Pino` for logging and `dotenv` for environment variables. - Done 


