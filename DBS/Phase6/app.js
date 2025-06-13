const express = require('express');
const app = express();
const { db, connectMongoDB, postgresConnect } = require('./db/config/database');
const { swaggerUi, specs } = require('./swagger');
const librouter = require("./routers/librouter")

app.use(express.json())
connectMongoDB();
postgresConnect();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: "Library Management API Documentation"
}));

// API routes
app.use('/api', librouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });  
});

app.listen(3000, () => {
  console.log("App is listening on port: 3000");
});
