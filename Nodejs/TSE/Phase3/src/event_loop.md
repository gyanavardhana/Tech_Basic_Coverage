
# 🌀 Event Loop and Non-Blocking I/O in JavaScript

JavaScript is **single-threaded**, but thanks to the **event loop**, it can handle **asynchronous operations** like I/O, timers, and HTTP requests efficiently.

---
![image](https://github.com/user-attachments/assets/6865ca65-1d9e-4d1f-af0d-4d10571b55f1)

## 🔁 What is the Event Loop?

The **Event Loop** is the mechanism that coordinates:
- The **Call Stack**
- The **Web APIs**
- The **Callback/Task Queue**
- The **Microtask Queue (Job Queue)**

It allows JavaScript to perform **non-blocking I/O** operations despite being single-threaded.

---

## 🧱 Core Components

### 1. 🧠 Call Stack

- Executes function calls **synchronously**
- Operates on **LIFO** (Last In First Out)
- If the stack is **blocked**, nothing else runs

### 2. 🌐 Web APIs (provided by browser or Node.js)

- Handles async tasks like:
  - `setTimeout`
  - `fetch()`
  - `DOM events`
  - `fs.readFile()` in Node.js
- Delegates long-running tasks **outside the stack**

### 3. 📩 Callback (Task) Queue

- Queues **callbacks** from Web APIs (e.g., `setTimeout`)
- Operates on **FIFO** (First In First Out)

### 4. ⚡ Microtask Queue (Job Queue)

- Queues **Promises**, `queueMicrotask()`, `MutationObserver`
- **Always executed before** the callback queue in the same tick

---

## 🔄 How the Event Loop Works

1. Execute everything in the **call stack**
2. If stack is empty:
   - Run **all microtasks**
3. Then:
   - Take one callback from the **callback queue**
4. Repeat (forever...)

---

## 📊 Scenario Examples

### ✅ Synchronous Blocking

```js
console.log("A");
while (true) {}  // Blocks everything!
console.log("B"); // Never runs
```

---

### ✅ Asynchronous Timer

```js
console.log("Start");

setTimeout(() => {
  console.log("Timeout Callback");
}, 1000);

console.log("End");
```

**Output**:
```
Start
End
Timeout Callback
```

---

### ✅ Promise vs setTimeout

```js
setTimeout(() => console.log("Timeout"), 0);
Promise.resolve().then(() => console.log("Promise"));
```

**Output**:
```
Promise
Timeout
```

> ✅ **Microtasks (Promises)** are always executed **before** macrotasks (setTimeout) in the same event loop tick.

---

## 🔌 Non-Blocking I/O in Node.js

Node.js uses the **event loop** and **libuv** to perform non-blocking I/O.

```js
const fs = require("fs");

fs.readFile("file.txt", "utf8", (err, data) => {
  console.log("File read complete!");
});

console.log("Reading file...");
```

**Output**:
```
Reading file...
File read complete!
```

> `fs.readFile()` doesn't block the thread — it delegates to the OS via libuv and resumes when done.

---

## 🧪 Real-World Use Cases

| Scenario | Blocking | Non-Blocking |
|----------|----------|--------------|
| Reading a file | `fs.readFileSync` | `fs.readFile` |
| HTTP request | sync XHR (bad) | `fetch()` |
| Loops | `while(true)` | `setInterval`, recursion + `setTimeout` |

---

## 🧠 Summary

| Term | Description |
|------|-------------|
| Call Stack | Synchronous function execution |
| Web APIs | Handles async work outside JS |
| Callback Queue | Async callbacks queue (timers, I/O) |
| Microtask Queue | Promises and microtasks queue |
| Event Loop | Coordinator between all of these |
| Non-Blocking I/O | Delegates I/O to OS, doesn't block the main thread |

---

## 📚 Pro Tips

- Use **Promises** or **async/await** for clean async code
- Avoid blocking the stack (`while(true)`, sync I/O)
- Use **worker threads** or child processes for heavy CPU tasks in Node.js

