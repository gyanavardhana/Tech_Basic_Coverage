## **Key Differences and Usage Notes**

### **1. Types vs Interfaces**
| Concept | Key Difference |
|--------|----------------|
| `type` vs `interface` | `type` can represent primitives, unions, and intersections. `interface` is best for object shapes and supports declaration merging. |
| Extendability | `interface` supports extension via `extends` and merging. `type` uses intersection (`&`). |
| Use case | Use `interface` for public APIs and classes. Use `type` for advanced type composition. |

---

### **2. Union vs Intersection Types**
| Concept | Key Difference |
|--------|----------------|
| Union (`A | B`) | Accepts values that match **either** A or B. |
| Intersection (`A & B`) | Accepts values that match **both** A and B. |

---

### **3. `readonly` Properties**
| Concept | Key Difference |
|--------|----------------|
| `readonly` | Prevents reassignment after initialization. |
| Use case | Protect data from unintended mutation. |

---

### **4. `keyof` and `typeof`**
| Concept | Key Difference |
|--------|----------------|
| `keyof` | Gets all property names of a type as union. |
| `typeof` | Gets the type of a value in TS context (not JS). |

---

### **5. Index Signatures**
| Concept | Key Difference |
|--------|----------------|
| `[key: string]: type` | Allows dynamic property names with a fixed type. |
| Use case | Objects with flexible keys (e.g., config, maps). |

---

### **6. `as const` and Enums**
| Concept | Key Difference |
|--------|----------------|
| `as const` | Makes object/array values immutable and literal. |
| Enums | Useful for named constants. Can be numeric or string enums. |

---

### **7. Tuples**
| Concept | Key Difference |
|--------|----------------|
| Tuples | Fixed-length, ordered array with specific types. |
| Use case | Return multiple values of different types. |

---

### **8. Generics**
| Concept | Key Difference |
|--------|----------------|
| `T` | Placeholder for a type. Reused across structures. |
| `<T extends object>` | Constrains `T` to objects only. |

---

### **9. Utility Types**
| Concept | Key Difference |
|--------|----------------|
| `Pick<T, K>` | Select specific keys from type `T`. |
| `Omit<T, K>` | Remove specific keys from type `T`. |
| `Partial<T>` | Makes all properties in `T` optional. |
| `Required<T>` | Makes all properties in `T` required. |

---

### **10. `ReturnType` and `Parameters`**
| Concept | Key Difference |
|--------|----------------|
| `ReturnType<T>` | Gets the return type of function type `T`. |
| `Parameters<T>` | Gets the tuple of parameters from function `T`. |

---

### **11. `Record<K, T>`**
| Concept | Key Difference |
|--------|----------------|
| `Record<string, number>` | Creates an object type with keys of `K` and values of `T`. |
| Use case | Mapping keys to a uniform value type. |

---

### **12. Type Guards**
| Concept | Key Difference |
|--------|----------------|
| `typeof` | Checks primitive types like string, number, boolean. |
| `instanceof` | Checks instance of class-based objects. |
| `in` | Checks if a property exists in an object. |

---

### **13. `never` and `unknown` Types**
| Concept | Key Difference |
|--------|----------------|
| `never` | Indicates values that never occur (e.g., exhaustive switch). |
| `unknown` | Safer than `any`, forces narrowing before use. |

---

### **14. Type Assertions**
| Concept | Key Difference |
|--------|----------------|
| `as` | Manually tell TypeScript the type of a value. |
| `satisfies` | Ensures value matches a type without losing literals. |

---

### **15. Discriminated Unions**
| Concept | Key Difference |
|--------|----------------|
| Tagged union types | Union types that include a literal property for safe narrowing. |
| Use case | `switch`-based narrowing for complex variants. |

---

### **16. Function Overloads**
| Concept | Key Difference |
|--------|----------------|
| Function overloads | Define multiple type signatures for one function. |
| Use case | Handle multiple input types safely. |

---

### **17. Type Predicate Functions**
| Concept | Key Difference |
|--------|----------------|
| `arg is Type` | Custom type guard function that narrows types. |
| Use case | Used in `if`, `filter`, and other control structures. |

---

### **References**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Type Challenges](https://github.com/type-challenges/type-challenges)
- [Effective TypeScript](https://effectivetypescript.com/)