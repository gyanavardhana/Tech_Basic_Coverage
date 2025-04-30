import { Request, Response, NextFunction } from "express";
import { db } from "../db/db";
import { tasks } from "../db/schema";
import { eq } from "drizzle-orm";
import { AppError } from "../middlewares/errorMiddleware";
import { logger } from "../logger/logger";
import { z } from "zod";

// Zod schemas
const createTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
});

const updateTaskSchema = z.object({
  taskId: z.string().uuid("Invalid task ID"),
  title: z.string().optional(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
});

const deleteTaskSchema = z.object({
  taskId: z.string().uuid("Invalid task ID"),
});

// Create Task
export const createTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = (req as any).userId as string;

    const parsed = createTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(new AppError(parsed.error.errors[0].message, 400));
    }

    const { title, description } = parsed.data;

    await db.insert(tasks).values({
      title,
      description,
      userId,
    });

    logger.info(`Task created successfully: ${title}`);
    return res.status(201).json({ message: "Task created successfully" });
  } catch (error) {
    logger.error("Error creating task", error);
    next(error);
  }
};

// Get Tasks
export const getTasks = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = (req as any).userId as string;

    if (!userId) {
      return next(new AppError("UserId is required", 400));
    }

    const tasksList = await db.select().from(tasks).where(eq(tasks.userId, userId));

    if (tasksList.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }

    logger.info(`Fetched tasks for user ${userId}`);
    return res.status(200).json(tasksList);
  } catch (error) {
    logger.error("Error fetching tasks", error);
    next(error);
  }
};

// Update Task
export const updateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = (req as any).userId as string;

    const parsed = updateTaskSchema.safeParse(req.body);
    if (!parsed.success) {
      return next(new AppError(parsed.error.errors[0].message, 400));
    }

    const { taskId, title, description, completed } = parsed.data;

    const task = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, taskId) && eq(tasks.userId, userId))
      .limit(1);

    if (task.length === 0) {
      return next(new AppError("Task not found or not owned by the user", 404));
    }

    await db
      .update(tasks)
      .set({ title, description, completed })
      .where(eq(tasks.id, taskId));

    logger.info(`Task updated successfully: ${taskId}`);
    return res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    logger.error("Error updating task", error);
    next(error);
  }
};

// Delete Task
export const deleteTask = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = (req as any).userId as string;

    const parsed = deleteTaskSchema.safeParse(req.params);
    if (!parsed.success) {
      return next(new AppError(parsed.error.errors[0].message, 400));
    }

    const { taskId } = parsed.data;

    const task = await db
      .select()
      .from(tasks)
      .where(eq(tasks.id, taskId) && eq(tasks.userId, userId))
      .limit(1);

    if (task.length === 0) {
      return next(new AppError("Task not found or not owned by the user", 404));
    }

    await db.delete(tasks).where(eq(tasks.id, taskId));

    logger.info(`Task deleted successfully: ${taskId}`);
    return res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    logger.error("Error deleting task", error);
    next(error);
  }
};
