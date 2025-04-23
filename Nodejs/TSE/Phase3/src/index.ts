import http from "http";
import path from "path";
import fs from "fs";
const PORT = 3000;
import { getData, getDataPromise, fetchData } from "./cb_pm_asaw";
import { use, runMiddlewares } from "./middlewares/middlewares";

type note = {
  id: number;
  text: string;
};

let uifile = path.resolve("src", "ui", "notes.html");
let uifilecontent = fs.readFileSync(uifile, "utf-8");
let notes: note[] = [];
let nextId = 1;

function logger(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>,
  next: Function
) {
  console.log(`${req.method} ${req.url}`);
  next();
}

function duration(
  req: http.IncomingMessage,
  res: http.ServerResponse<http.IncomingMessage>,
  next: Function
){
  const start = Date.now();
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`Request took ${duration}ms`);
  });
  next();
}

use(logger);
use(duration);

const server = http.createServer((req, res) => {
  runMiddlewares(req, res, () => {
    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(uifilecontent);
    } else if (req.url === "/notes" && req.method === "GET") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(notes));
    } else if (req.url === "/notes" && req.method === "POST") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        const { text } = JSON.parse(body);
        const note = { id: nextId++, text };
        notes.push(note);
        debugger;
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(note));
      });
    } else if (req.url?.startsWith("/notes/") && req.method === "DELETE") {
      const id = parseInt(req.url.split("/")[2]);
      notes = notes.filter((note) => note.id !== id);
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
    }
  });
});

// callback
getData((data: string) => {
  console.log(data); // Data received
});

// promise
getDataPromise().then((data: string) => {
  console.log(data); // Data received Through Promise
});

// async/await
fetchData(); // Data received Through Async/Await

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
