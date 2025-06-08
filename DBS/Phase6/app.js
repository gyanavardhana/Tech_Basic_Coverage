const express = require('express');
const app = express();
const { connectMongoDB } = require('./db/config/database');
const librouter = require("./routers/librouter")

app.use(express.json())
connectMongoDB();
app.use("/lib", librouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });  
});

app.listen(3000, () => {
  console.log("App is listening on port: 3000");
});
