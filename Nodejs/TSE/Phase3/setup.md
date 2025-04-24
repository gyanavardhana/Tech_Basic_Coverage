
### ✅ 1. Initialize the project
```bash
mkdir my-ts-backend
cd my-ts-backend
npm init -y
```

---

### ✅ 2. Install development dependencies
```bash
npm install --save-dev typescript ts-node nodemon @types/node
```

---

### ✅ 3. Create `tsconfig.json`
```bash
npx tsc --init
```


Then edit your `tsconfig.json` with these recommended settings:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "rootDir": "src",
    "outDir": "dist",
    "esModuleInterop": true,
    "strict": true,
    "noImplicitAny": true,
    "moduleResolution": "node",
    "skipLibCheck": true
  }
}
```

---

### ✅ 4. Create folder structure
```bash
mkdir src
touch src/index.ts
```

---

### ✅ 5. Sample `src/index.ts` using built-in HTTP module

```ts
import http from "http";
import fs from "fs";
import path from "path";

const PORT = 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello from TypeScript backend!");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

---

### ✅ 6. Setup scripts in `package.json`
Add the following under `"scripts"`:

```json
"scripts": {
  "start": "node dist/index.js",
  "build": "tsc",
  "dev": "nodemon src/index.ts"
}
```

---

### ✅ 7. Optional: Create a `nodemon.json` (optional but useful)

Create `nodemon.json` for easier config:

```json
{
  "watch": ["src"],
  "ext": "ts",
  "exec": "ts-node src/index.ts"
}
```

Now you can simply run:
```bash
npm run dev
```


### 1. Install Jest and related dependencies:
```bash
npm install --save-dev jest ts-jest @types/jest 
```

### 2. Initialize Jest config with TypeScript:
```bash
npx ts-jest config:init
```

This will create a `jest.config.js` file pre-configured to use `ts-jest`.

### 3. (Optional) Add a basic `tsconfig.json` if you don’t already have one:
```bash
npx tsc --init
```

### 4. (Optional) Add a test script to your `package.json`:
```json
"scripts": {
  "test": "jest",
  "ci-test": "jest --watch"
}
```

You're ready to write and run tests with:
```bash
npm test //
npm ci-test
```

---


