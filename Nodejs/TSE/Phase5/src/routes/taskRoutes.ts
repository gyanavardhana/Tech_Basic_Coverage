import { Router } from "express";
import { createTask, getTasks, updateTask, deleteTask } from "../controllers/taskController";
import { authenticate } from "../middlewares/authMiddleware"; // Assuming you have the auth middleware

export const taskRouter = Router();

// Routes for Task operations
taskRouter.post("/", authenticate, createTask);  // Create task
taskRouter.get("/", authenticate, getTasks);    // Get tasks
taskRouter.put("/", authenticate, updateTask);  // Update task
taskRouter.delete("/:taskId", authenticate, deleteTask); // Delete task


