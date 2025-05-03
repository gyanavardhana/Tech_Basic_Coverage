import express from "express";
import "dotenv/config";
import { logger } from "./src/logger/logger";
import { connectDB } from "./src/db/db";
import { userRouter } from "./src/routes/userRoutes";
import { taskRouter } from "./src/routes/taskRoutes";
import { errorMiddleware } from "./src/middlewares/errorMiddleware";
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter); // Use the task router for task-related routes



app.get("/", (req, res) => {
  res.send("Hello World!");
});


app.use(errorMiddleware); 
const startServer = async () => {
  try {
    await connectDB(); 
    app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    logger.error("Failed to connect to database:", error);
    process.exit(1);
  }
};

startServer();
