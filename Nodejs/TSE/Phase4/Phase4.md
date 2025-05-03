### **1. Express Server with TypeScript**
| Concept | Key Point |
|--------|-----------|
| TypeScript + Express | Enables type safety for API development. |
| `tsconfig.json` | Configure compiler settings like `strict`, `esModuleInterop`. |
| Use case | Scalable and predictable Express app setup. |

---

### **2. RESTful API Routes**
| Concept | Key Point |
|--------|-----------|
| Route Structure | Follows standard HTTP methods: GET, POST, PUT, DELETE. |
| Router Modules | Use `express.Router()` for modular route definitions. |
| Use case | Clean separation of concerns across API endpoints. |

---

### **3. Middleware in Express.js**
| Concept | Key Point |
|--------|-----------|
| Middleware | Functions that run before route handlers. |
| Types | Application-level, Router-level, Error-handling middleware. |
| Use case | Logging, parsing body, validating requests, authentication. |

---

### **4. Request and Response Types**
| Concept | Key Point |
|--------|-----------|
| `Request`, `Response`, `NextFunction` | Type-safe handling of req/res in TypeScript. |
| Custom Types | Extend `Request` interface for user/session context. |
| Use case | Prevent runtime bugs via compile-time type checks. |

---

### **5. Authentication (JWT, Sessions)**
| Concept | Key Point |
|--------|-----------|
| JWT | Token-based stateless authentication. |
| Sessions | Server-side or cookie-based session persistence. |
| Use case | Use JWT for APIs, Sessions for server-rendered apps. |

---

### **6. Runtime Validation with Zod**
| Concept | Key Point |
|--------|-----------|
| `zod` | TypeScript-first schema validation. |
| Integration | Validate request bodies, query params before processing. |
| Use case | Prevent invalid input from reaching business logic. |

---

### **7. Environment Variables with dotenv**
| Concept | Key Point |
|--------|-----------|
| `dotenv` | Loads environment variables from `.env` into `process.env`. |
| Safe Usage | Always validate required env vars during app startup. |
| Use case | Manage secrets, configs, and app behavior per environment. |

---

### **8. Error Handling Middleware**
| Concept | Key Point |
|--------|-----------|
| Custom Middleware | Catch all errors via `(err, req, res, next)` signature. |
| Typed Errors | Use custom error classes for consistency. |
| Use case | Centralized error formatting and response. |

---

### **9. Logging with Pino**
| Concept | Key Point |
|--------|-----------|
| `pino` | Fast, structured logger for Node.js. |
| Middleware | Add logging for every request and error. |
| Use case | Log in JSON format for observability and debugging. |

---

### **10. Modular Express App Structure**
| Concept | Key Point |
|--------|-----------|
| Structure | Organize code into modules: routes, controllers, services, utils. |
| Scalability | Easier to maintain and test. |
| Use case | Ideal for growing applications with many endpoints. |

---

### **References**
- [Express Docs](https://expressjs.com/)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Zod Docs](https://zod.dev/)
- [Pino Logging](https://getpino.io/)
- [JWT Intro](https://jwt.io/introduction)
- [dotenv](https://www.npmjs.com/package/dotenv)

---
