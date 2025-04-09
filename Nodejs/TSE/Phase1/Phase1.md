
# **Phase 1: TypeScript Basics**

## **1. Why TypeScript?**
| Concept | Key Point |
|--------|-----------|
| **TypeScript vs. JavaScript** | TypeScript adds **static typing** to JavaScript, helping catch errors during development. |
| **Why Use It?** | Improves code **readability**, **refactoring**, and **tooling** support (e.g., IntelliSense). |
| 🔥 **Common Miss** | TypeScript doesn't enforce types at runtime — it's only for development. |

---

## **2. Initializing a Project**
| Concept | Key Point |
|--------|-----------|
| **`tsc --init`** | Creates a `tsconfig.json` to configure TypeScript behavior. |
| **File Output** | Compile using `tsc` to generate `.js` files from `.ts` files. |
| ⚠️ **Tip** | Ensure the `rootDir` and `outDir` are properly set for clean build folders. |

---

## **3. `tsconfig.json` Essentials**
| Setting | Explanation |
|---------|-------------|
| **`strict`** | Enables all strict type-checking options. **Highly recommended.** |
| **`target`** | Specifies output JS version (`es6`, `esnext`, etc.). |
| **`module`** | Defines module system (`commonjs`, `esnext`, etc.). |
| 💡 **Note** | Useful flags: `noImplicitAny`, `esModuleInterop`, `skipLibCheck`. |

---

## **4. Type Assignment**
| Concept | Key Point |
|--------|-----------|
| **Explicit Typing** | You can define a variable’s type using `:` syntax: `let age: number`. |
| **Type Inference** | TypeScript can infer types from initial values. |
| 🚫 **Anti-pattern** | Avoid overusing `any`, as it disables type checking. |

---

## **5. Basic Types**
| Type | Example |
|------|---------|
| **`number`** | `let age: number = 25;` |
| **`string`** | `let name: string = "Alex";` |
| **`boolean`** | `let isActive: boolean = true;` |
| ✅ **Best Practice** | Use explicit typing unless inference is clear and safe. |

---

## **6. Arrays**
| Concept | Syntax |
|--------|--------|
| **Number Array** | `let nums: number[] = [1, 2, 3];` |
| **Generic Form** | `let strs: Array<string> = ["a", "b"];` |
| 🔍 **Missable** | Both `number[]` and `Array<number>` are valid and equivalent. |

---

## **7. `any` Type**
| Concept | Key Point |
|--------|-----------|
| **Definition** | `any` disables all type checking for a variable. |
| ⚠️ **Why Avoid It?** | It defeats TypeScript’s purpose. Use `unknown` if unsure. |
| ✅ **Fix** | Narrow down `any` using type guards or assertions. |

---

## **8. Objects**
| Concept | Syntax |
|--------|--------|
| **Using `type`** | `type User = { name: string; age: number; };` |
| **Using `interface`** | `interface User { name: string; age: number; }` |
| 🔄 **Interchangeable?** | Mostly, but `interface` supports extension more naturally. |

---

## **9. Functions**
| Concept | Example |
|--------|---------|
| **Parameter & Return Types** | `function greet(name: string): string { return "Hi " + name; }` |
| **Void Return** | `function log(msg: string): void { console.log(msg); }` |
| ✨ **Optional Params** | `function greet(name?: string) {}` — use `?` for optional params. |

---

## **10. Destructured & Rest Params**
| Concept | Example |
|--------|---------|
| **Destructuring Params** | `function show({ name }: { name: string }) {}` |
| **Rest Params** | `function sum(...nums: number[]) {}` |
| ⚠️ **Missable** | Destructured parameters need full object typing. |

---

## **11. Typing Variables as Functions**
| Concept | Example |
|--------|---------|
| **Function Type Alias** | `type Greet = (name: string) => string;` |
| **Usage** | `const greet: Greet = name => "Hello " + name;` |
| 📌 **Missable** | Always define types for callbacks and utility functions. |
