
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

---

